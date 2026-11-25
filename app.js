/* Alphabloom Main Application Controller — Hub, Learning Modules, 4 Mini-Games, Daily Gift & 1000 Stories */
(function () {
  const Audio = window.AlphabloomAudio;
  const Langs = window.AlphabloomLanguages;
  const Stories = window.AlphabloomStories;

  const STORAGE_KEYS = {
    lastLang: 'alphabloom_last_lang_v1',
    starsPrefix: 'alphabloom_stars_',
    favPrefix: 'alphabloom_favs_',
    dailyClaimDate: 'alphabloom_daily_claim_date',
    streakCount: 'alphabloom_streak_count'
  };

  function safeGet(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? v : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function safeSet(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {}
  }

  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  function getStreak() {
    const n = parseInt(safeGet(STORAGE_KEYS.streakCount, '1'), 10);
    return isNaN(n) || n < 1 ? 1 : n;
  }

  function isDailyClaimed() {
    return safeGet(STORAGE_KEYS.dailyClaimDate, '') === getTodayKey();
  }

  // App State
  const state = {
    view: 'splash',
    langId: safeGet(STORAGE_KEYS.lastLang, 'en') || 'en',
    stateQuery: '',
    paused: false,
    storyId: 1,
    storyFavOnly: false,
    isReadingStory: false,
    deferredInstallPrompt: null
  };

  let activeRaf = null;
  let activeIntervals = [];
  let activeKeyHandler = null;

  function clearLoops() {
    if (activeRaf) {
      cancelAnimationFrame(activeRaf);
      activeRaf = null;
    }
    activeIntervals.forEach((id) => clearInterval(id));
    activeIntervals = [];
    if (activeKeyHandler) {
      window.removeEventListener('keydown', activeKeyHandler);
      activeKeyHandler = null;
    }
  }

  function getLang() {
    return Langs.get(state.langId);
  }

  function getStars(langId) {
    const raw = parseInt(safeGet(STORAGE_KEYS.starsPrefix + langId, '0'), 10);
    return isNaN(raw) || raw < 0 ? 0 : raw;
  }

  function setStars(langId, value) {
    const clamped = Math.max(0, value);
    safeSet(STORAGE_KEYS.starsPrefix + langId, String(clamped));
    const el = document.getElementById('live-stars-count');
    if (el) {
      el.textContent = String(clamped);
      const pill = el.closest('.stars-pill');
      if (pill) {
        pill.classList.remove('animate-star-jump');
        void pill.offsetWidth;
        pill.classList.add('animate-star-jump');
      }
    }
    return clamped;
  }

  function adjustStars(delta) {
    const next = setStars(state.langId, getStars(state.langId) + delta);
    showFloatingPoints(delta);
    return next;
  }

  function getFavs(langId) {
    try {
      const parsed = JSON.parse(safeGet(STORAGE_KEYS.favPrefix + langId, '[]'));
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function toggleFav(langId, storyId) {
    const favs = getFavs(langId);
    const idx = favs.indexOf(storyId);
    if (idx >= 0) favs.splice(idx, 1);
    else favs.push(storyId);
    favs.sort((a, b) => a - b);
    safeSet(STORAGE_KEYS.favPrefix + langId, JSON.stringify(favs));
    return idx < 0;
  }

  function showFloatingPoints(delta) {
    const layer = document.getElementById('float-layer');
    if (!layer) return;
    const badge = document.createElement('div');
    badge.className = 'float-badge ' + (delta > 0 ? 'plus animate-points-up' : 'minus animate-points-down');
    badge.textContent = delta > 0 ? `+${delta} ⭐` : `${delta}`;
    layer.appendChild(badge);
    setTimeout(() => badge.remove(), 960);
  }

  function speakPraise(lang) {
    const list = lang.ui.correctList;
    const msg = list[Math.floor(Math.random() * list.length)];
    Audio.speak(msg, lang.locale, msg, lang.fallbackLocale);
  }

  function speakRetry(lang) {
    const list = lang.ui.retryList;
    const msg = list[Math.floor(Math.random() * list.length)];
    Audio.speak(msg, lang.locale, msg, lang.fallbackLocale);
  }

  function updateTopBarLabels() {
    const lang = state.view === 'hub' ? Langs.get('en') : getLang();
    const exitLbl = document.getElementById('exit-btn-label');
    const musicLbl = document.getElementById('music-btn-label');
    const musicBtn = document.getElementById('music-btn');
    if (exitLbl) exitLbl.textContent = lang.ui.exit;
    if (musicLbl) {
      musicLbl.textContent = Audio.isMusicEnabled() ? lang.ui.musicOn : lang.ui.musicOff;
    }
    if (musicBtn) {
      musicBtn.classList.toggle('off', !Audio.isMusicEnabled());
    }
  }

  /* =========================================================
     1. SB GAMING SPLASH SCREEN (5 SECONDS + 100% START BUTTON)
     ========================================================= */
  function initSplash() {
    const fill = document.getElementById('splash-progress-fill');
    const pct = document.getElementById('splash-percent');
    const startBtn = document.getElementById('splash-start-btn');
    const splashEl = document.getElementById('splash-screen');
    const appShell = document.getElementById('app-shell');

    const DURATION_MS = 5000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / DURATION_MS);
      const val = ratio >= 1 ? 100 : Math.max(1, Math.floor(ratio * 100));
      if (fill) fill.style.width = val + '%';
      if (pct) pct.textContent = val + '%';

      if (ratio < 1) {
        requestAnimationFrame(tick);
      } else {
        if (startBtn) startBtn.classList.remove('hidden');
      }
    }
    requestAnimationFrame(tick);

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        Audio.unlock();
        Audio.playIntroChime();
        Audio.speak('Welcome to Alphabloom!', 'en-IN', 'Welcome to Alphabloom!', 'en-IN');
        Audio.startMusic();

        if (splashEl) splashEl.classList.add('fade-out');
        setTimeout(() => {
          if (splashEl) splashEl.classList.add('hidden');
          if (appShell) appShell.classList.remove('hidden');
          navigate('hub');
        }, 520);
      });
    }
  }

  /* =========================================================
     NAVIGATION
     ========================================================= */
  function navigate(viewName) {
    const prevView = state.view;
    clearLoops();
    Audio.stopSpeech();
    state.isReadingStory = false;
    state.paused = false;
    state.view = viewName;
    updateTopBarLabels();
    if (window.AlphabloomAds) {
      window.AlphabloomAds.updateBannerForView(viewName);
      const miniGames = ['fruit', 'balloon', 'animal', 'memory'];
      if (viewName === 'home' && miniGames.includes(prevView)) {
        window.AlphabloomAds.maybeShowBreakAd();
      }
    }

    const main = document.getElementById('main-view');
    if (!main) return;
    main.innerHTML = '';

    if (viewName === 'hub') renderHub(main);
    else if (viewName === 'home') renderLanguageHome(main);
    else if (viewName === 'lettersA') renderLetters(main, 'A');
    else if (viewName === 'lettersB') renderLetters(main, 'B');
    else if (viewName === 'numbers') renderNumbers(main);
    else if (viewName === 'fruit') renderFruitCatcher(main);
    else if (viewName === 'balloon') renderBalloonPop(main);
    else if (viewName === 'animal') renderAnimalQuiz(main);
    else if (viewName === 'memory') renderMemoryGame(main);
    else if (viewName === 'stories') renderStories(main);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openLanguageSection(langId) {
    Audio.playTap();
    state.langId = langId;
    safeSet(STORAGE_KEYS.lastLang, langId);
    const lang = getLang();
    Audio.speak(lang.nativeName, lang.locale, lang.name, lang.fallbackLocale);
    navigate('home');
  }

  /* =========================================================
     2. LANGUAGE & STATE HUB (ALL 28 STATES + 17 LANGUAGES)
     ========================================================= */
  function renderHub(container) {
    const savedLast = safeGet(STORAGE_KEYS.lastLang, '');

    const heading = document.createElement('h3');
    heading.className = 'section-heading';
    heading.innerHTML = '🗣️ 17 Official Language Sections';
    container.appendChild(heading);

    const grid = document.createElement('div');
    grid.id = 'lang-grid';
    grid.className = 'lang-grid';
    container.appendChild(grid);

    Langs.ORDER.forEach((id) => {
      const l = Langs.get(id);
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'lang-card clay-btn';
      card.style.setProperty('--card-accent', l.color);
      card.innerHTML = `
        ${savedLast === id ? '<span class="last-badge">★ Last Played</span>' : ''}
        <div class="lang-emoji">${l.emoji}</div>
        <div class="lang-native">${l.nativeName}</div>
        <div class="lang-en">${l.name}</div>
        <div class="lang-states">${l.states.join(', ')}</div>
      `;
      card.addEventListener('click', () => openLanguageSection(id));
      grid.appendChild(card);
    });
  }

  /* =========================================================
     SHARED SUB-NAV INSIDE ACTIVE LANGUAGE SECTION
     ========================================================= */
  function createSubNav(showBackToHome, showStars = true) {
    const lang = getLang();
    const nav = document.createElement('div');
    nav.className = 'sub-nav clay-plaque';

    const left = document.createElement('div');
    left.className = 'sub-nav-left';

    if (showBackToHome) {
      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'clay-btn clay-marigold';
      backBtn.innerHTML = `⬅️ <span>${lang.ui.back}</span>`;
      backBtn.addEventListener('click', () => {
        Audio.playTap();
        navigate('home');
      });
      left.appendChild(backBtn);
    }

    const hubBtn = document.createElement('button');
    hubBtn.type = 'button';
    hubBtn.className = 'clay-btn clay-sky';
    hubBtn.innerHTML = `🌐 <span>${lang.ui.languages}</span>`;
    hubBtn.addEventListener('click', () => {
      Audio.playTap();
      navigate('hub');
    });
    left.appendChild(hubBtn);

    const right = document.createElement('div');
    right.className = 'sub-nav-right';

    const langPill = document.createElement('div');
    langPill.className = 'active-lang-pill';
    langPill.textContent = `${lang.emoji} ${lang.nativeName}`;
    right.appendChild(langPill);

    const streakPill = document.createElement('div');
    streakPill.className = 'streak-pill clay-peach';
    streakPill.innerHTML = `<span class="animate-streak-glow">🌟</span> <span>${getStreak()}</span>`;
    right.appendChild(streakPill);

    if (showStars) {
      const starsPill = document.createElement('div');
      starsPill.className = 'stars-pill clay-marigold';
      starsPill.innerHTML = `⭐ <span id="live-stars-count">${getStars(lang.id)}</span>`;
      right.appendChild(starsPill);
    }

    nav.appendChild(left);
    nav.appendChild(right);
    return nav;
  }

  /* =========================================================
     3D CLAY DAILY REWARD GIFT BOX MODAL
     ========================================================= */
  function openDailyGiftModal() {
    const modal = document.getElementById('gift-modal');
    const boxBtn = document.getElementById('gift-box-btn');
    const lid = document.getElementById('gift-lid');
    const glow = document.getElementById('gift-glow');
    const badge = document.getElementById('gift-reward-badge');
    const msg = document.getElementById('gift-modal-msg');
    const stars = ['gs1', 'gs2', 'gs3', 'gs4'].map((id) => document.getElementById(id));

    if (!modal || !boxBtn) return;

    const already = isDailyClaimed();
    boxBtn.className = 'gift-box-wrap ' + (already ? '' : 'animate-gift-wobble');
    if (lid) lid.className = 'gift-lid' + (already ? ' animate-gift-lid-pop' : '');
    if (glow) glow.className = 'gift-glow' + (already ? ' animate-gift-glow-burst' : '');
    stars.forEach((s) => {
      if (s) s.className = 'gift-star' + (already ? ' animate-gift-star-fly' : '');
    });
    if (badge) {
      badge.classList.toggle('hidden', !already);
      badge.className = 'gift-reward-badge clay-marigold' + (already ? ' animate-gift-reward-pop' : ' hidden');
    }
    if (msg) {
      msg.textContent = already ? '✨ +25 ⭐' : '🎁 +25 ⭐';
    }

    modal.classList.remove('hidden');

    boxBtn.onclick = () => {
      if (isDailyClaimed()) return;
      Audio.playCorrect();
      safeSet(STORAGE_KEYS.dailyClaimDate, getTodayKey());
      safeSet(STORAGE_KEYS.streakCount, String(getStreak() + 1));
      adjustStars(25);
      speakPraise(getLang());

      boxBtn.className = 'gift-box-wrap animate-gift-box-bounce';
      if (lid) lid.className = 'gift-lid animate-gift-lid-pop';
      if (glow) glow.className = 'gift-glow animate-gift-glow-burst';
      stars.forEach((s) => {
        if (s) s.className = 'gift-star animate-gift-star-fly';
      });
      if (badge) {
        badge.className = 'gift-reward-badge clay-marigold animate-gift-reward-pop';
      }
      if (msg) msg.textContent = '🎉 +25 ⭐';
    };
  }

  /* =========================================================
     3. ACTIVE LANGUAGE HOME SCREEN
     ========================================================= */
  function renderLanguageHome(container) {
    const lang = getLang();
    container.appendChild(createSubNav(false, true));

    const heroRow = document.createElement('div');
    heroRow.className = 'home-hero-row clay-surface';
    heroRow.innerHTML = `
      <div class="home-hero-text">
        <h2>${lang.emoji} ${lang.nativeName}</h2>
        <p>${lang.ui.homeSub}</p>
      </div>
      <div class="home-hero-actions">
        <button type="button" id="home-gift-btn" class="clay-btn clay-peach daily-gift-trigger ${isDailyClaimed() ? '' : 'animate-gift-wobble'}">
          🎁 <span>+25 ⭐</span>
        </button>
        <button type="button" id="home-reward-ad-btn" class="clay-btn clay-marigold daily-gift-trigger ${(window.AlphabloomAds && window.AlphabloomAds.canShowAds()) ? '' : 'hidden'}">
          🎁 <span>Bonus +50 Stars (Watch Ad)</span>
        </button>
      </div>
    `;
    heroRow.querySelector('#home-gift-btn').addEventListener('click', () => {
      Audio.playTap();
      openDailyGiftModal();
    });
    const rewardAdBtn = heroRow.querySelector('#home-reward-ad-btn');
    if (rewardAdBtn && window.AlphabloomAds) {
      rewardAdBtn.addEventListener('click', () => {
        Audio.playTap();
        window.AlphabloomAds.openParentalGate((bonus) => {
          Audio.playCorrect();
          adjustStars(bonus || 50);
          speakPraise(getLang());
        });
      });
    }
    container.appendChild(heroRow);

    const learnGrid = document.createElement('div');
    learnGrid.className = 'module-grid';
    const learnCards = [
      { view: 'lettersA', icon: lang.isLatin ? '🔠' : '🌸', title: lang.ui.cardA, sub: lang.ui.cardASub, cls: 'clay-coral' },
      { view: 'lettersB', icon: lang.isLatin ? '🔡' : '🌼', title: lang.ui.cardB, sub: lang.ui.cardBSub, cls: 'clay-sky' },
      { view: 'numbers', icon: '🔢', title: lang.ui.cardNumbers, sub: lang.ui.cardNumbersSub, cls: 'clay-marigold' },
      { view: 'stories', icon: '📖', title: lang.ui.cardStories, sub: lang.ui.cardStoriesSub, cls: 'clay-plum' }
    ];

    learnCards.forEach((c) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `clay-btn clay-card-btn ${c.cls}`;
      btn.innerHTML = `
        <div class="card-icon">${c.icon}</div>
        <div class="card-title">${c.title}</div>
        <div class="card-sub">${c.sub}</div>
      `;
      btn.addEventListener('click', () => {
        Audio.playTap();
        navigate(c.view);
      });
      learnGrid.appendChild(btn);
    });
    container.appendChild(learnGrid);

    const gHead = document.createElement('h3');
    gHead.className = 'section-heading';
    gHead.textContent = `🎮 ${lang.ui.gamesHeading}`;
    container.appendChild(gHead);

    const gameGrid = document.createElement('div');
    gameGrid.className = 'module-grid';
    const gameCards = [
      { view: 'fruit', icon: '🧺', title: lang.ui.gFruit, sub: lang.ui.gFruitSub, cls: 'clay-mint' },
      { view: 'balloon', icon: '🎈', title: lang.ui.gBalloon, sub: lang.ui.gBalloonSub, cls: 'clay-coral' },
      { view: 'animal', icon: '🦁', title: lang.ui.gAnimal, sub: lang.ui.gAnimalSub, cls: 'clay-peach' },
      { view: 'memory', icon: '🃏', title: lang.ui.gMemory, sub: lang.ui.gMemorySub, cls: 'clay-plum' }
    ];

    gameCards.forEach((g) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `clay-btn clay-card-btn ${g.cls}`;
      btn.innerHTML = `
        <div class="card-icon">${g.icon}</div>
        <div class="card-title">${g.title}</div>
        <div class="card-sub">${g.sub}</div>
      `;
      btn.addEventListener('click', () => {
        Audio.playTap();
        navigate(g.view);
      });
      gameGrid.appendChild(btn);
    });
    container.appendChild(gameGrid);
  }

  /* =========================================================
     A. ALPHABETS / LETTERS (SPLIT INTO 2 CARDS)
     ========================================================= */
  function renderLetters(container, which) {
    const lang = getLang();
    container.appendChild(createSubNav(true, true));

    const title = document.createElement('h3');
    title.className = 'section-heading';
    title.textContent = which === 'A' ? lang.ui.cardA : lang.ui.cardB;
    container.appendChild(title);

    const items = which === 'A' ? lang.lettersA : lang.lettersB;
    const lips = ['#FF766C', '#4DA8FA', '#3CC7A6', '#FFC436', '#9B74F7', '#FF9A52'];

    const grid = document.createElement('div');
    grid.className = 'letters-grid';

    items.forEach((item, idx) => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'letter-tile clay-btn';
      tile.style.setProperty('--tile-lip', lips[idx % lips.length]);
      tile.innerHTML = `
        <div class="letter-char">${item.ch}</div>
        <div class="letter-emoji">${item.emoji}</div>
        <div class="letter-word">${item.word}</div>
        <div class="letter-ph">${item.ph}</div>
      `;
      tile.addEventListener('click', () => {
        Audio.playTap();
        tile.classList.remove('animate-celebrate');
        void tile.offsetWidth;
        tile.classList.add('animate-celebrate');
        Audio.speak(item.tts, lang.locale, item.ttsPh, lang.fallbackLocale);
      });
      grid.appendChild(tile);
    });
    container.appendChild(grid);
  }

  /* =========================================================
     B. 1 TO 100 NUMBERS
     ========================================================= */
  function renderNumbers(container) {
    const lang = getLang();
    container.appendChild(createSubNav(true, true));

    const title = document.createElement('h3');
    title.className = 'section-heading';
    title.textContent = `🔢 ${lang.ui.cardNumbers}`;
    container.appendChild(title);

    const palette = [
      ['#FFE5EC', '#D94E45'],
      ['#E0F4FF', '#267FD4'],
      ['#E2FDF2', '#21997C'],
      ['#FFF6CC', '#D99608'],
      ['#F3E8FF', '#734CD4']
    ];

    const grid = document.createElement('div');
    grid.className = 'numbers-grid';

    for (let n = 1; n <= 100; n++) {
      const [bg, lip] = palette[(n - 1) % palette.length];
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'num-tile clay-btn';
      tile.style.setProperty('--num-bg', bg);
      tile.style.setProperty('--num-lip', lip);
      tile.textContent = String(n);
      tile.addEventListener('click', () => {
        Audio.playTap();
        tile.classList.remove('animate-celebrate');
        void tile.offsetWidth;
        tile.classList.add('animate-celebrate');
        const ttsObj = Langs.getNumberTTS(lang.id, n);
        Audio.speak(ttsObj.text, lang.locale, ttsObj.ph, lang.fallbackLocale);
      });
      grid.appendChild(tile);
    }
    container.appendChild(grid);
  }

  /* =========================================================
     C1. MINI-GAME 1: FRUIT CATCHER (+10 / -5)
     ========================================================= */
  function renderFruitCatcher(container) {
    const lang = getLang();
    container.appendChild(createSubNav(true, true));

    const panel = document.createElement('div');
    panel.className = 'game-panel clay-surface';
    panel.innerHTML = `
      <div class="game-prompt-bar">
        <div class="game-prompt-text" id="fc-prompt"></div>
        <button type="button" class="clay-btn clay-sky" id="fc-repeat">🔊 ${lang.ui.repeat}</button>
      </div>
      <div class="catcher-arena" id="fc-arena">
        <div class="basket-el" id="fc-basket">🧺</div>
      </div>
      <div class="catcher-controls">
        <button type="button" class="clay-btn clay-cream" id="fc-left">⬅️</button>
        <button type="button" class="clay-btn clay-cream" id="fc-right">➡️</button>
      </div>
    `;
    container.appendChild(panel);

    const arena = panel.querySelector('#fc-arena');
    const basket = panel.querySelector('#fc-basket');
    const promptEl = panel.querySelector('#fc-prompt');
    const repeatBtn = panel.querySelector('#fc-repeat');

    let targetFruit = lang.fruits[0];
    let basketPct = 50;
    let items = [];
    let lastTs = performance.now();

    function pickTarget() {
      targetFruit = lang.fruits[Math.floor(Math.random() * lang.fruits.length)];
      promptEl.textContent = lang.ui.catchPrompt.replace('{item}', `${targetFruit.emoji} ${targetFruit.name}`);
      const speakText = lang.ui.catchPrompt.replace('{item}', targetFruit.name);
      const speakPh = lang.ui.catchPrompt.replace('{item}', targetFruit.ph);
      Audio.speak(speakText, lang.locale, speakPh, lang.fallbackLocale);
    }

    function setBasket(pct) {
      basketPct = Math.max(10, Math.min(90, pct));
      basket.style.left = basketPct + '%';
    }

    function pointerMove(clientX) {
      const rect = arena.getBoundingClientRect();
      if (!rect.width) return;
      setBasket(((clientX - rect.left) / rect.width) * 100);
    }

    arena.addEventListener('pointerdown', (e) => pointerMove(e.clientX));
    arena.addEventListener('pointermove', (e) => {
      if (e.buttons > 0 || e.pointerType === 'touch') pointerMove(e.clientX);
    });

    panel.querySelector('#fc-left').addEventListener('click', () => setBasket(basketPct - 14));
    panel.querySelector('#fc-right').addEventListener('click', () => setBasket(basketPct + 14));
    repeatBtn.addEventListener('click', () => {
      const speakText = lang.ui.catchPrompt.replace('{item}', targetFruit.name);
      const speakPh = lang.ui.catchPrompt.replace('{item}', targetFruit.ph);
      Audio.speak(speakText, lang.locale, speakPh, lang.fallbackLocale);
    });

    activeKeyHandler = (e) => {
      if (state.paused) return;
      if (e.key === 'ArrowLeft') setBasket(basketPct - 10);
      else if (e.key === 'ArrowRight') setBasket(basketPct + 10);
    };
    window.addEventListener('keydown', activeKeyHandler);

    function spawnFruit() {
      if (state.paused) return;
      const isTarget = Math.random() < 0.45;
      let fruit = targetFruit;
      if (!isTarget) {
        const others = lang.fruits.filter((f) => f.id !== targetFruit.id);
        fruit = others[Math.floor(Math.random() * others.length)];
      }
      const el = document.createElement('div');
      el.className = 'falling-fruit';
      el.textContent = fruit.emoji;
      const xPct = 10 + Math.random() * 80;
      el.style.left = xPct + '%';
      el.style.top = '-20px';
      arena.appendChild(el);
      items.push({ el, fruit, xPct, yPx: -20, speed: 95 + Math.random() * 45 });
    }

    activeIntervals.push(setInterval(spawnFruit, 1150));

    function loop(now) {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;

      if (!state.paused) {
        const h = arena.clientHeight || 360;
        const w = arena.clientWidth || 360;
        const basketX = (basketPct / 100) * w;
        const basketY = h - 42;

        for (let i = items.length - 1; i >= 0; i--) {
          const it = items[i];
          it.yPx += it.speed * dt;
          it.el.style.top = it.yPx + 'px';

          const itemX = (it.xPct / 100) * w;
          const hit = Math.abs(itemX - basketX) < 52 && it.yPx >= basketY - 26 && it.yPx <= basketY + 26;

          if (hit) {
            it.el.remove();
            items.splice(i, 1);
            if (it.fruit.id === targetFruit.id) {
              Audio.playCorrect();
              adjustStars(10);
              speakPraise(lang);
              setTimeout(() => {
                if (state.view === 'fruit' && !state.paused) pickTarget();
              }, 850);
            } else {
              Audio.playWrong();
              adjustStars(-5);
              speakRetry(lang);
            }
          } else if (it.yPx > h + 30) {
            it.el.remove();
            items.splice(i, 1);
          }
        }
      }
      activeRaf = requestAnimationFrame(loop);
    }

    pickTarget();
    spawnFruit();
    activeRaf = requestAnimationFrame(loop);
  }

  /* =========================================================
     C2. MINI-GAME 2: BALLOON POP (+10 / -5)
     ========================================================= */
  function renderBalloonPop(container) {
    const lang = getLang();
    container.appendChild(createSubNav(true, true));

    const panel = document.createElement('div');
    panel.className = 'game-panel clay-surface';
    panel.innerHTML = `
      <div class="game-prompt-bar">
        <div class="game-prompt-text" id="bp-prompt"></div>
        <button type="button" class="clay-btn clay-sky" id="bp-repeat">🔊 ${lang.ui.repeat}</button>
      </div>
      <div class="balloon-arena" id="bp-arena"></div>
    `;
    container.appendChild(panel);

    const arena = panel.querySelector('#bp-arena');
    const promptEl = panel.querySelector('#bp-prompt');
    const repeatBtn = panel.querySelector('#bp-repeat');

    const pool = [
      ...lang.lettersA.slice(0, 12).map((x) => ({ label: x.ch, tts: x.ch, ph: x.ph })),
      ...Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const nt = Langs.getNumberTTS(lang.id, n);
        return { label: String(n), tts: nt.text, ph: nt.ph };
      })
    ];
    const colors = ['#FF766C', '#FFC436', '#3CC7A6', '#4DA8FA', '#9B74F7', '#FF9A52'];

    let target = pool[0];
    let balloons = [];
    let lastTs = performance.now();

    function pickTarget() {
      target = pool[Math.floor(Math.random() * pool.length)];
      promptEl.textContent = lang.ui.popPrompt.replace('{item}', target.label);
      const sp = lang.ui.popPrompt.replace('{item}', target.tts);
      const spPh = lang.ui.popPrompt.replace('{item}', target.ph);
      Audio.speak(sp, lang.locale, spPh, lang.fallbackLocale);
    }

    repeatBtn.addEventListener('click', () => {
      const sp = lang.ui.popPrompt.replace('{item}', target.tts);
      const spPh = lang.ui.popPrompt.replace('{item}', target.ph);
      Audio.speak(sp, lang.locale, spPh, lang.fallbackLocale);
    });

    function spawnBalloon() {
      if (state.paused || balloons.length >= 9) return;
      const isTarget = Math.random() < 0.42;
      let item = target;
      if (!isTarget) {
        const others = pool.filter((p) => p.label !== target.label);
        item = others[Math.floor(Math.random() * others.length)];
      }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'balloon-item';
      btn.style.background = colors[Math.floor(Math.random() * colors.length)];
      btn.textContent = item.label;

      const h = arena.clientHeight || 380;
      const xPct = 12 + Math.random() * 76;
      const bObj = { el: btn, item, xPct, yPx: h + 50, speed: 58 + Math.random() * 34 };
      btn.style.left = xPct + '%';
      btn.style.top = bObj.yPx + 'px';

      btn.addEventListener('click', () => {
        if (state.paused) return;
        const idx = balloons.indexOf(bObj);
        if (idx >= 0) balloons.splice(idx, 1);
        btn.remove();

        if (item.label === target.label) {
          Audio.playPop();
          setTimeout(() => Audio.playCorrect(), 70);
          adjustStars(10);
          speakPraise(lang);
          setTimeout(() => {
            if (state.view === 'balloon' && !state.paused) pickTarget();
          }, 800);
        } else {
          Audio.playWrong();
          adjustStars(-5);
          speakRetry(lang);
        }
      });

      arena.appendChild(btn);
      balloons.push(bObj);
    }

    activeIntervals.push(setInterval(spawnBalloon, 950));

    function loop(now) {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      if (!state.paused) {
        for (let i = balloons.length - 1; i >= 0; i--) {
          const b = balloons[i];
          b.yPx -= b.speed * dt;
          b.el.style.top = b.yPx + 'px';
          if (b.yPx < -70) {
            b.el.remove();
            balloons.splice(i, 1);
          }
        }
      }
      activeRaf = requestAnimationFrame(loop);
    }

    pickTarget();
    spawnBalloon();
    spawnBalloon();
    activeRaf = requestAnimationFrame(loop);
  }

  /* =========================================================
     C3. MINI-GAME 3: ANIMAL QUIZ (+10 / -5)
     ========================================================= */
  function renderAnimalQuiz(container) {
    const lang = getLang();
    container.appendChild(createSubNav(true, true));

    const panel = document.createElement('div');
    panel.className = 'game-panel clay-surface';
    panel.innerHTML = `
      <div class="game-prompt-bar">
        <div class="game-prompt-text" id="aq-prompt"></div>
        <button type="button" class="clay-btn clay-sky" id="aq-repeat">🔊 ${lang.ui.repeat}</button>
      </div>
      <div class="quiz-grid" id="aq-grid"></div>
    `;
    container.appendChild(panel);

    const promptEl = panel.querySelector('#aq-prompt');
    const grid = panel.querySelector('#aq-grid');
    const repeatBtn = panel.querySelector('#aq-repeat');

    let target = null;
    let locked = false;

    function speakTarget() {
      if (!target) return;
      const sp = lang.ui.animalPrompt.replace('{item}', target.name);
      const spPh = lang.ui.animalPrompt.replace('{item}', target.ph);
      Audio.speak(sp, lang.locale, spPh, lang.fallbackLocale);
    }

    repeatBtn.addEventListener('click', speakTarget);

    function nextRound() {
      locked = false;
      const shuffled = [...lang.animals].sort(() => Math.random() - 0.5).slice(0, 4);
      target = shuffled[Math.floor(Math.random() * shuffled.length)];
      promptEl.textContent = lang.ui.animalPrompt.replace('{item}', target.name);
      speakTarget();

      grid.innerHTML = '';
      shuffled.forEach((animal) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'quiz-card clay-btn clay-cream';
        card.innerHTML = `
          <div class="quiz-emoji">${animal.emoji}</div>
          <div class="quiz-name">${animal.name}</div>
        `;
        card.addEventListener('click', () => {
          if (locked || state.paused) return;
          if (animal.id === target.id) {
            locked = true;
            card.classList.add('correct-flash', 'animate-celebrate');
            Audio.playCorrect();
            adjustStars(10);
            speakPraise(lang);
            setTimeout(() => {
              if (state.view === 'animal') nextRound();
            }, 950);
          } else {
            card.classList.remove('animate-wiggle');
            void card.offsetWidth;
            card.classList.add('animate-wiggle');
            Audio.playWrong();
            adjustStars(-5);
            speakRetry(lang);
          }
        });
        grid.appendChild(card);
      });
    }

    nextRound();
  }

  /* =========================================================
     C4. MINI-GAME 4: MEMORY CARD FLIP (+10 / -5)
     ========================================================= */
  function renderMemoryGame(container) {
    const lang = getLang();
    container.appendChild(createSubNav(true, true));

    const panel = document.createElement('div');
    panel.className = 'game-panel clay-surface';
    panel.innerHTML = `
      <div class="game-prompt-bar">
        <div class="game-prompt-text" id="mem-status">🃏 ${lang.ui.gMemory}</div>
        <button type="button" class="clay-btn clay-marigold" id="mem-reset">🔄 ${lang.ui.newGame}</button>
      </div>
      <div class="memory-grid" id="mem-grid"></div>
    `;
    container.appendChild(panel);

    const grid = panel.querySelector('#mem-grid');
    const statusEl = panel.querySelector('#mem-status');
    const resetBtn = panel.querySelector('#mem-reset');

    let first = null;
    let second = null;
    let busy = false;
    let matchedCount = 0;

    function startBoard() {
      first = null;
      second = null;
      busy = false;
      matchedCount = 0;
      statusEl.textContent = `🃏 ${lang.ui.gMemory}`;

      const animalsPick = [...lang.animals].sort(() => Math.random() - 0.5).slice(0, 3);
      const fruitsPick = [...lang.fruits].sort(() => Math.random() - 0.5).slice(0, 3);
      const pairs = [...animalsPick, ...fruitsPick];
      const deck = [...pairs, ...pairs].sort(() => Math.random() - 0.5);

      grid.innerHTML = '';
      deck.forEach((item) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mem-card card-perspective';
        btn.innerHTML = `
          <div class="mem-inner card-inner">
            <div class="mem-face mem-front card-face clay-plum">🌸</div>
            <div class="mem-face mem-back card-face card-face-back clay-cream">
              <span>${item.emoji}</span>
              <span class="mem-label">${item.name}</span>
            </div>
          </div>
        `;
        const inner = btn.querySelector('.card-inner');

        btn.addEventListener('click', () => {
          if (busy || state.paused || inner.classList.contains('is-flipped') || btn.classList.contains('matched')) return;
          Audio.playFlip();
          inner.classList.add('is-flipped');

          if (!first) {
            first = { btn, inner, item };
            return;
          }
          second = { btn, inner, item };
          busy = true;

          if (first.item.id === second.item.id) {
            first.btn.classList.add('matched', 'animate-celebrate');
            second.btn.classList.add('matched', 'animate-celebrate');
            matchedCount++;
            Audio.playCorrect();
            adjustStars(10);
            Audio.speak(item.name, lang.locale, item.ph, lang.fallbackLocale);
            first = null;
            second = null;
            busy = false;

            if (matchedCount === pairs.length) {
              statusEl.textContent = `🎉 ${lang.ui.memoryWin}`;
              setTimeout(() => {
                Audio.speak(lang.ui.memoryWin, lang.locale, lang.ui.memoryWin, lang.fallbackLocale);
              }, 700);
            }
          } else {
            Audio.playWrong();
            adjustStars(-5);
            setTimeout(() => {
              if (first) first.inner.classList.remove('is-flipped');
              if (second) second.inner.classList.remove('is-flipped');
              first = null;
              second = null;
              busy = false;
            }, 720);
          }
        });
        grid.appendChild(btn);
      });
    }

    resetBtn.addEventListener('click', () => {
      Audio.playTap();
      startBoard();
    });
    startBoard();
  }

  /* =========================================================
     D. 1,000 OFFLINE KIDS' STORIES ENGINE
     ========================================================= */
  function renderStories(container) {
    const lang = getLang();
    container.appendChild(createSubNav(true, false));

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="story-cats" id="story-cats"></div>
      <div class="story-book clay-surface" id="story-book"></div>
    `;
    container.appendChild(wrap);

    const catsBar = wrap.querySelector('#story-cats');
    const bookEl = wrap.querySelector('#story-book');

    function drawStory() {
      Audio.stopSpeech();
      state.isReadingStory = false;

      const story = Stories.getStory(lang.id, state.storyId);
      const favs = getFavs(lang.id);
      const isFav = favs.includes(story.id);
      const islandCls = ['island-shape-1', 'island-shape-2', 'island-shape-3'][story.id % 3];

      catsBar.innerHTML = '';
      Stories.CATEGORIES.forEach((cat, idx) => {
        const isActive = !state.storyFavOnly && story.categoryIndex === idx;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cat-tab clay-btn ' + (isActive ? 'clay-coral' : 'clay-cream');
        btn.textContent = `${cat.emoji} ${lang.ui.cats[idx]}`;
        btn.addEventListener('click', () => {
          Audio.playTap();
          state.storyFavOnly = false;
          state.storyId = cat.start;
          drawStory();
        });
        catsBar.appendChild(btn);
      });

      const favTab = document.createElement('button');
      favTab.type = 'button';
      favTab.className = 'cat-tab clay-btn ' + (state.storyFavOnly ? 'clay-coral' : 'clay-cream');
      favTab.textContent = `❤️ ${lang.ui.favs} (${favs.length})`;
      favTab.addEventListener('click', () => {
        Audio.playTap();
        if (favs.length > 0) {
          state.storyFavOnly = true;
          if (!favs.includes(state.storyId)) state.storyId = favs[0];
          drawStory();
        }
      });
      catsBar.appendChild(favTab);

      bookEl.innerHTML = `
        <div class="story-header-row">
          <div class="story-badge">${story.categoryEmoji} ${lang.ui.storyNum} #${story.id} / 1000</div>
          <div class="story-nav-group">
            <select id="st-voice-select" class="voice-select clay-cream" aria-label="Choose Voice"></select>
            <button type="button" id="st-fav-btn" class="clay-btn ${isFav ? 'clay-coral' : 'clay-cream'}" aria-label="Toggle Favorite">
              ${isFav ? '❤️' : '🤍'}
            </button>
            <button type="button" id="st-madhur-btn" class="clay-btn ${Audio.isMadhurMode() ? 'clay-plum' : 'clay-cream'}" aria-label="Madhur Storytelling Mode">
              ${Audio.isMadhurMode() ? '🎶 Madhur' : '🎙️ Clear'}
            </button>
            <button type="button" id="st-speed-btn" class="clay-btn clay-marigold" aria-label="Voice Speed">
              ${Audio.getStoryRate() <= 0.72 ? '🐢 0.7x' : '🐇 0.8x'}
            </button>
            <button type="button" id="st-read-btn" class="clay-btn clay-sky">${lang.ui.readAloud}</button>
          </div>
        </div>

        <h2 class="story-title">${story.title}</h2>

        <div class="story-scene" style="background: linear-gradient(180deg, ${story.scene.sky} 0%, #ffffff 100%);">
          <div class="scene-cat">${story.categoryEmoji}</div>
          <div class="scene-place">${story.scene.placeEmoji}</div>
          <div class="scene-hill ${islandCls}" style="background: ${story.scene.hill};"></div>
          <div class="scene-actors">
            <span>${story.scene.heroEmoji}</span>
            <span class="scene-item animate-float-slow">${story.scene.itemEmoji}</span>
            <span>${story.scene.friendEmoji}</span>
          </div>
        </div>

        <div class="story-lines" id="st-lines">
          ${story.lines.map((ln, idx) => `<div class="story-line" data-idx="${idx}">${ln}</div>`).join('')}
        </div>

        <div class="moral-box">
          <div class="moral-label">✨ ${lang.ui.moral}</div>
          <div class="moral-text">${story.moral}</div>
        </div>

        <div class="story-controls">
          <div class="story-nav-group">
            <button type="button" id="st-prev" class="clay-btn clay-cream">⬅️ ${lang.ui.prev}</button>
            <button type="button" id="st-next" class="clay-btn clay-cream">${lang.ui.next} ➡️</button>
            <button type="button" id="st-rand" class="clay-btn clay-marigold">🎲 ${lang.ui.random}</button>
          </div>
          <div class="story-nav-group">
            <input type="number" id="st-jump-input" class="story-jump-input" min="1" max="1000" value="${story.id}" aria-label="Story Number" />
            <button type="button" id="st-jump-go" class="clay-btn clay-sky">${lang.ui.go}</button>
          </div>
        </div>
      `;

      const voiceSelect = bookEl.querySelector('#st-voice-select');
      if (voiceSelect) {
        const list = Audio.getAvailableVoices(lang.locale);
        const curUri = Audio.getPreferredVoiceURI();
        voiceSelect.innerHTML = '<option value="">🎙️ Auto Voice</option>';
        list.forEach((v) => {
          const opt = document.createElement('option');
          opt.value = v.voiceURI;
          opt.textContent = `${v.name} (${v.lang})`;
          if (curUri && (curUri === v.voiceURI || curUri === v.name)) opt.selected = true;
          voiceSelect.appendChild(opt);
        });
        voiceSelect.addEventListener('change', (e) => {
          Audio.setPreferredVoiceURI(e.target.value);
          Audio.speakStoryLine(story.title, lang.locale, lang.fallbackLocale);
        });
      }

      const favBtn = bookEl.querySelector('#st-fav-btn');
      const madhurBtn = bookEl.querySelector('#st-madhur-btn');
      const speedBtn = bookEl.querySelector('#st-speed-btn');

      if (madhurBtn) {
        madhurBtn.addEventListener('click', () => {
          Audio.playTap();
          const next = !Audio.isMadhurMode();
          Audio.setMadhurMode(next);
          madhurBtn.textContent = next ? '🎶 Madhur' : '🎙️ Clear';
          madhurBtn.className = 'clay-btn ' + (next ? 'clay-plum' : 'clay-cream');
        });
      }
      const readBtn = bookEl.querySelector('#st-read-btn');
      const lineEls = bookEl.querySelectorAll('.story-line');

      if (speedBtn) {
        speedBtn.addEventListener('click', () => {
          Audio.playTap();
          const nextRate = Audio.getStoryRate() <= 0.72 ? 0.82 : 0.68;
          Audio.setStoryRate(nextRate);
          speedBtn.textContent = nextRate <= 0.72 ? '🐢 0.7x' : '🐇 0.8x';
        });
      }

      // Tap any single story sentence to hear it slowly and clearly
      lineEls.forEach((el, idx) => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          Audio.stopSpeech();
          state.isReadingStory = false;
          if (readBtn) readBtn.textContent = lang.ui.readAloud;
          lineEls.forEach((l) => l.classList.remove('speaking'));
          el.classList.add('speaking');
          Audio.speakStoryLine(story.lines[idx], lang.locale, lang.fallbackLocale, () => {
            el.classList.remove('speaking');
          });
        });
      });

      favBtn.addEventListener('click', () => {
        Audio.playTap();
        toggleFav(lang.id, story.id);
        drawStory();
      });

      readBtn.addEventListener('click', () => {
        if (state.isReadingStory) {
          Audio.stopSpeech();
          state.isReadingStory = false;
          readBtn.textContent = lang.ui.readAloud;
          lineEls.forEach((el) => el.classList.remove('speaking'));
          return;
        }
        state.isReadingStory = true;
        readBtn.textContent = lang.ui.stopRead;
        const fullLines = [story.title, ...story.lines, `${lang.ui.moral}: ${story.moral}`];
        Audio.narrateLines(
          fullLines,
          lang.locale,
          null,
          lang.fallbackLocale,
          (lineIdx) => {
            lineEls.forEach((el, i) => {
              el.classList.toggle('speaking', lineIdx - 1 === i);
            });
          },
          () => {
            state.isReadingStory = false;
            if (readBtn) readBtn.textContent = lang.ui.readAloud;
            lineEls.forEach((el) => el.classList.remove('speaking'));
          }
        );
      });

      bookEl.querySelector('#st-prev').addEventListener('click', () => {
        Audio.playTap();
        if (state.storyFavOnly && favs.length > 0) {
          const i = favs.indexOf(state.storyId);
          state.storyId = favs[(i - 1 + favs.length) % favs.length];
        } else {
          state.storyId = state.storyId > 1 ? state.storyId - 1 : 1000;
        }
        drawStory();
      });

      bookEl.querySelector('#st-next').addEventListener('click', () => {
        Audio.playTap();
        if (state.storyFavOnly && favs.length > 0) {
          const i = favs.indexOf(state.storyId);
          state.storyId = favs[(i + 1) % favs.length];
        } else {
          state.storyId = state.storyId < 1000 ? state.storyId + 1 : 1;
        }
        drawStory();
      });

      bookEl.querySelector('#st-rand').addEventListener('click', () => {
        Audio.playTap();
        state.storyFavOnly = false;
        state.storyId = Math.floor(Math.random() * 1000) + 1;
        drawStory();
      });

      const jumpInput = bookEl.querySelector('#st-jump-input');
      const jumpAction = () => {
        const val = parseInt(jumpInput.value, 10);
        if (!isNaN(val)) {
          Audio.playTap();
          state.storyFavOnly = false;
          state.storyId = Math.max(1, Math.min(1000, val));
          drawStory();
        }
      };
      bookEl.querySelector('#st-jump-go').addEventListener('click', jumpAction);
      jumpInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') jumpAction();
      });
    }

    drawStory();
  }

  /* =========================================================
     5. EXIT CONFIRMATION, GIFT CLOSE, MUSIC & PWA INSTALL
     ========================================================= */
  function initGlobalControls() {
    const musicBtn = document.getElementById('music-btn');
    const exitBtn = document.getElementById('exit-btn');
    const exitModal = document.getElementById('exit-modal');
    const exitTitle = document.getElementById('exit-modal-title');
    const exitMsg = document.getElementById('exit-modal-msg');
    const exitYes = document.getElementById('exit-yes-btn');
    const exitNo = document.getElementById('exit-no-btn');
    const goodbyeOverlay = document.getElementById('goodbye-overlay');
    const returnBtn = document.getElementById('return-app-btn');
    const installBtn = document.getElementById('install-btn');
    const fsBtn = document.getElementById('fullscreen-btn');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        Audio.playTap();
        const docEl = document.documentElement;
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          if (docEl.requestFullscreen) docEl.requestFullscreen().catch(() => {});
          else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
      });
    }
    const giftCloseBtn = document.getElementById('gift-close-btn');
    const giftModal = document.getElementById('gift-modal');

    if (giftCloseBtn && giftModal) {
      giftCloseBtn.addEventListener('click', () => {
        Audio.playTap();
        giftModal.classList.add('hidden');
        if (state.view === 'home') navigate('home');
      });
    }

    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        Audio.unlock();
        Audio.toggleMusic();
        Audio.playTap();
        updateTopBarLabels();
      });
    }

    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        Audio.playTap();
        state.paused = true;
        Audio.stopSpeech();
        const lang = state.view === 'hub' ? Langs.get('en') : getLang();
        if (exitTitle) exitTitle.textContent = lang.ui.exitTitle;
        if (exitMsg) exitMsg.textContent = lang.ui.exitMsg;
        if (exitYes) exitYes.textContent = lang.ui.yes;
        if (exitNo) exitNo.textContent = lang.ui.no;
        if (exitModal) exitModal.classList.remove('hidden');
      });
    }

    if (exitNo) {
      exitNo.addEventListener('click', () => {
        Audio.playTap();
        if (exitModal) exitModal.classList.add('hidden');
        state.paused = false;
      });
    }

    if (exitYes) {
      exitYes.addEventListener('click', () => {
        Audio.stopAll();
        clearLoops();
        if (exitModal) exitModal.classList.add('hidden');
        try {
          window.close();
        } catch (e) {}
        if (window.history && window.history.length > 1) {
          try {
            window.history.back();
          } catch (e) {}
        }
        if (goodbyeOverlay) goodbyeOverlay.classList.remove('hidden');
      });
    }

    if (returnBtn) {
      returnBtn.addEventListener('click', () => {
        if (goodbyeOverlay) goodbyeOverlay.classList.add('hidden');
        Audio.unlock();
        if (Audio.isMusicEnabled()) Audio.startMusic();
        navigate(state.view === 'splash' ? 'hub' : state.view);
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      state.deferredInstallPrompt = e;
      if (installBtn) installBtn.classList.remove('hidden');
    });

    if (installBtn) {
      installBtn.addEventListener('click', () => {
        if (!state.deferredInstallPrompt) return;
        Audio.playTap();
        state.deferredInstallPrompt.prompt();
        state.deferredInstallPrompt.userChoice.then(() => {
          state.deferredInstallPrompt = null;
          installBtn.classList.add('hidden');
        }).catch(() => {});
      });
    }
  }

  /* =========================================================
     3D INTERACTIVE TILT, CASCADE ENTRANCE & TAP SPARKLE BURST
     ========================================================= */
  function spawnSparkles(x, y) {
    const layer = document.getElementById('float-layer');
    if (!layer) return;
    const icons = ['✨', '⭐', '🌸', '💛', '🩵'];
    for (let i = 0; i < 6; i++) {
      const sp = document.createElement('span');
      sp.className = 'tap-sparkle';
      sp.textContent = icons[i % icons.length];
      const angle = (Math.PI * 2 * i) / 6 + (Math.random() * 0.5 - 0.25);
      const dist = 34 + Math.random() * 34;
      sp.style.left = x + 'px';
      sp.style.top = y + 'px';
      sp.style.setProperty('--sx', Math.round(Math.cos(angle) * dist) + 'px');
      sp.style.setProperty('--sy', Math.round(Math.sin(angle) * dist) + 'px');
      sp.style.setProperty('--sr', Math.round(Math.random() * 90 - 45) + 'deg');
      layer.appendChild(sp);
      setTimeout(() => sp.remove(), 680);
    }
  }

  function enhance3DCards() {
    const cards = document.querySelectorAll('.lang-card, .clay-card-btn, .letter-tile, .quiz-card');
    cards.forEach((card, idx) => {
      card.classList.add('card-3d-in');
      card.style.animationDelay = Math.min(idx * 28, 360) + 'ms';
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = '1';
      card.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const r = card.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${(-ny * 12).toFixed(1)}deg) rotateY(${(nx * 14).toFixed(1)}deg) translateY(-4px) scale(1.03)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  function init3DEffects() {
    document.addEventListener('pointerdown', (e) => {
      const target = e.target && e.target.closest ? e.target.closest('.clay-btn, .balloon-item, .mem-card') : null;
      if (target) {
        spawnSparkles(e.clientX, e.clientY);
      }
    });
    const main = document.getElementById('main-view');
    if (main && typeof MutationObserver !== 'undefined') {
      const obs = new MutationObserver(() => enhance3DCards());
      obs.observe(main, { childList: true, subtree: true });
    }
  }

  window.addEventListener('load', () => {
    initGlobalControls();
    if (window.AlphabloomAds) window.AlphabloomAds.init();
    init3DEffects();
    initSplash();
  });
})();
