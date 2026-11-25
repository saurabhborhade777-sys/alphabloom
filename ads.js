/* Alphabloom Kid-Safe Advertisement & Monetization Module (Google Play Families Policy, Ages 3-8) */
window.AlphabloomAds = (function () {
  /* =========================================================
     1. MODULAR AD CONFIGURATION (Replace placeholders for live ads)
     ========================================================= */
  const CONFIG = {
    ADS_ENABLED: true,
    PUBLISHER_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
    BANNER_SLOT_ID: '0000000000',
    CHILD_DIRECTED_TREATMENT: true, // Enforces non-personalized, family-safe ads (npa=1, TFCD)
    BREAK_COOLDOWN_MS: 180000 // Strict 3-minute cooldown between interstitial break ads
  };

  let lastBreakTime = 0;
  let scriptLoaded = false;
  let activeView = 'splash';
  let onRewardCallback = null;
  let currentGateAnswer = 0;

  function isPlaceholderConfig() {
    return (
      !CONFIG.PUBLISHER_ID ||
      CONFIG.PUBLISHER_ID.includes('XXXX') ||
      !CONFIG.BANNER_SLOT_ID ||
      CONFIG.BANNER_SLOT_ID === '0000000000'
    );
  }

  function isOnline() {
    return typeof navigator === 'undefined' ? true : navigator.onLine !== false;
  }

  function canShowAds() {
    return CONFIG.ADS_ENABLED && isOnline();
  }

  function pauseGameAudio() {
    if (window.AlphabloomAudio) {
      window.AlphabloomAudio.stopSpeech();
      window.AlphabloomAudio.setDucking(true);
    }
  }

  function resumeGameAudio() {
    if (window.AlphabloomAudio) {
      window.AlphabloomAudio.setDucking(false);
    }
  }

  /* =========================================================
     2. GOOGLE ADSENSE & H5 GAMES AD PLACEMENT API HOOKS
     ========================================================= */
  function initAdScript() {
    if (!canShowAds() || isPlaceholderConfig() || scriptLoaded) return;
    scriptLoaded = true;
    try {
      // Enforce non-personalized & child-directed ad treatment
      window.adsbygoogle = window.adsbygoogle || [];
      if (CONFIG.CHILD_DIRECTED_TREATMENT) {
        window.adsbygoogle.requestNonPersonalizedAds = 1;
      }

      // Initialize H5 Games Ad Placement API (adBreak / adConfig)
      window.adBreak = window.adBreak || function (o) { window.adsbygoogle.push(o); };
      window.adConfig = window.adConfig || function (o) { window.adsbygoogle.push(o); };
      window.adConfig({
        preloadAdBreaks: 'on',
        sound: 'on',
        onReady: function () {}
      });

      const s = document.createElement('script');
      s.async = true;
      const npaParam = CONFIG.CHILD_DIRECTED_TREATMENT ? '&npa=1&tag_for_child_directed_treatment=1' : '';
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(CONFIG.PUBLISHER_ID)}${npaParam}`;
      s.crossOrigin = 'anonymous';
      s.setAttribute('data-ad-frequency-hint', '180s');
      s.onerror = function () {
        hideBanner();
      };
      document.head.appendChild(s);
    } catch (e) {
      hideBanner();
    }
  }

  /* =========================================================
     3. SAFE BOTTOM BANNER AD (ONLY ON HUB & HOME SCREEN)
     ========================================================= */
  function hideBanner() {
    const bar = document.getElementById('safe-banner-ad');
    if (bar) bar.classList.add('hidden');
  }

  function updateBannerForView(viewName) {
    activeView = viewName;
    const bar = document.getElementById('safe-banner-ad');
    const slot = document.getElementById('safe-banner-slot');
    if (!bar || !slot) return;

    // Show ONLY on Language Hub and Home Screen — NEVER inside active gameplay screens
    const allowed = viewName === 'hub' || viewName === 'home';
    if (!allowed || !canShowAds()) {
      bar.classList.add('hidden');
      return;
    }

    bar.classList.remove('hidden');

    if (isPlaceholderConfig()) {
      slot.innerHTML = '<div class="ad-test-box">Ad Space (Test Mode — Kid-Safe Family Banner • npa=1)</div>';
    } else {
      initAdScript();
      if (!slot.dataset.liveRendered) {
        slot.dataset.liveRendered = '1';
        slot.innerHTML = `<ins class="adsbygoogle" style="display:block;width:100%;height:50px"
          data-ad-client="${CONFIG.PUBLISHER_ID}"
          data-ad-slot="${CONFIG.BANNER_SLOT_ID}"
          data-npa="${CONFIG.CHILD_DIRECTED_TREATMENT ? '1' : '0'}"
          data-tag-for-child-directed-treatment="${CONFIG.CHILD_DIRECTED_TREATMENT ? '1' : '0'}"></ins>`;
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          bar.classList.add('hidden');
        }
      }
    }
  }

  /* =========================================================
     4. CONTROLLED BREAK AD (INTERSTITIAL HOOK, 3-MIN COOLDOWN)
     ========================================================= */
  function showTestOverlay(title, subtitle, durationMs, onComplete) {
    const overlay = document.getElementById('ad-test-overlay');
    const titleEl = document.getElementById('ad-test-title');
    const subEl = document.getElementById('ad-test-sub');
    const closeBtn = document.getElementById('ad-test-close');
    if (!overlay || !closeBtn) {
      if (onComplete) onComplete();
      return;
    }

    pauseGameAudio();
    if (titleEl) titleEl.textContent = title;
    if (subEl) subEl.textContent = subtitle;
    overlay.classList.remove('hidden');

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      overlay.classList.add('hidden');
      resumeGameAudio();
      if (onComplete) onComplete();
    };

    closeBtn.onclick = finish;
    setTimeout(finish, durationMs);
  }

  function maybeShowBreakAd(onDone) {
    if (!canShowAds()) {
      if (onDone) onDone();
      return;
    }
    const now = Date.now();
    if (now - lastBreakTime < CONFIG.BREAK_COOLDOWN_MS) {
      if (onDone) onDone();
      return;
    }
    lastBreakTime = now;

    if (isPlaceholderConfig()) {
      showTestOverlay(
        'Ad Space (Test Mode)',
        'Family-Safe Break Ad • 3-min cooldown active',
        2200,
        onDone
      );
      return;
    }

    initAdScript();
    if (typeof window.adBreak === 'function') {
      try {
        window.adBreak({
          type: 'next',
          name: 'return_from_minigame',
          beforeAd: pauseGameAudio,
          afterAd: resumeGameAudio,
          adBreakDone: function () {
            resumeGameAudio();
            if (onDone) onDone();
          }
        });
      } catch (e) {
        resumeGameAudio();
        if (onDone) onDone();
      }
    } else {
      if (onDone) onDone();
    }
  }

  /* =========================================================
     5. PARENTAL GATE + OPTIONAL REWARDED BONUS (+50 STARS)
     ========================================================= */
  function openParentalGate(onReward) {
    if (!canShowAds()) return;
    onRewardCallback = onReward;

    const modal = document.getElementById('parent-gate-modal');
    const qEl = document.getElementById('parent-gate-question');
    const input = document.getElementById('parent-gate-input');
    const errEl = document.getElementById('parent-gate-error');
    if (!modal || !qEl || !input) return;

    const a = 6 + Math.floor(Math.random() * 6); // 6..11
    const b = 5 + Math.floor(Math.random() * 6); // 5..10
    currentGateAnswer = a + b;

    qEl.textContent = `What is ${a} + ${b}?`;
    input.value = '';
    if (errEl) errEl.classList.add('hidden');
    modal.classList.remove('hidden');
    setTimeout(() => input.focus(), 80);
  }

  function triggerRewardedAd() {
    if (!canShowAds()) return;
    const rewardFn = onRewardCallback;
    onRewardCallback = null;

    if (isPlaceholderConfig()) {
      showTestOverlay(
        'Ad Space (Test Mode — Rewarded)',
        'Kid-Safe Family Ad • Unlocking +50 Bonus Stars!',
        2400,
        function () {
          if (rewardFn) rewardFn(50);
        }
      );
      return;
    }

    initAdScript();
    if (typeof window.adBreak === 'function') {
      try {
        window.adBreak({
          type: 'reward',
          name: 'bonus_50_stars',
          beforeAd: pauseGameAudio,
          afterAd: resumeGameAudio,
          beforeReward: function (showAdFn) {
            showAdFn();
          },
          adViewed: function () {
            resumeGameAudio();
            if (rewardFn) rewardFn(50);
          },
          adDismissed: function () {
            resumeGameAudio();
          },
          adBreakDone: function () {
            resumeGameAudio();
          }
        });
      } catch (e) {
        resumeGameAudio();
      }
    }
  }

  function init() {
    const modal = document.getElementById('parent-gate-modal');
    const input = document.getElementById('parent-gate-input');
    const errEl = document.getElementById('parent-gate-error');
    const submitBtn = document.getElementById('parent-gate-submit');
    const cancelBtn = document.getElementById('parent-gate-cancel');

    const verifyGate = () => {
      if (!input) return;
      const val = parseInt(input.value, 10);
      if (val === currentGateAnswer) {
        if (modal) modal.classList.add('hidden');
        triggerRewardedAd();
      } else {
        if (errEl) errEl.classList.remove('hidden');
        input.value = '';
        input.focus();
      }
    };

    if (submitBtn) submitBtn.addEventListener('click', verifyGate);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') verifyGate();
      });
    }
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        if (modal) modal.classList.add('hidden');
        onRewardCallback = null;
      });
    }

    // 100% Offline-Safe online/offline listeners
    window.addEventListener('offline', () => {
      hideBanner();
      const bonusBtn = document.getElementById('home-reward-ad-btn');
      if (bonusBtn) bonusBtn.classList.add('hidden');
    });
    window.addEventListener('online', () => {
      updateBannerForView(activeView);
      const bonusBtn = document.getElementById('home-reward-ad-btn');
      if (bonusBtn && canShowAds()) bonusBtn.classList.remove('hidden');
    });

    initAdScript();
  }

  return {
    CONFIG,
    init,
    canShowAds,
    updateBannerForView,
    maybeShowBreakAd,
    openParentalGate
  };
})();
