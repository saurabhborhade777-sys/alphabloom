/* Alphabloom Audio Engine — Kalimba, SFX, Voice Switcher & Offline Indic Transliteration TTS */
window.AlphabloomAudio = (function () {
  let ctx = null;
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;
  let musicEnabled = true;
  let musicPlaying = false;
  let musicTimer = null;
  let stepIndex = 0;
  let isDucked = false;
  let voices = [];
  let speechUnlocked = false;
  let currentNarrationToken = 0;
  let activeUtterance = null;
  let storyRate = 0.80;
  let madhurMode = true;
  let preferredVoiceURI = '';

  try {
    preferredVoiceURI = localStorage.getItem('alphabloom_voice_uri_v1') || '';
  } catch (e) {}

  const KALIMBA_MELODY = [
    523.25, 659.25, 783.99, 659.25,
    880.00, 783.99, 659.25, 587.33,
    523.25, 587.33, 659.25, 783.99,
    659.25, 587.33, 523.25, 0,
    783.99, 880.00, 1046.50, 880.00,
    783.99, 659.25, 587.33, 659.25,
    523.25, 659.25, 587.33, 440.00,
    523.25, 0, 392.00, 0
  ];

  const FEMALE_VOICE_HINTS = [
    'swara', 'aarohi', 'neerja', 'heera', 'veena', 'lekha', 'aditi', 'kalpana',
    'priya', 'shruti', 'dhwani', 'tanishaa', 'pallavi', 'sapna', 'meera', 'nidhi',
    'shreya', 'ananya', 'kavya', 'female', 'woman', 'samantha', 'victoria',
    'google मराठी', 'google हिन्दी', 'google english india', 'google বাংলা',
    'google தமிழ்', 'google తెలుగు', 'google ಕನ್ನಡ', 'google മലയാളം',
    'google ગુજરાતી', 'google ਪੰਜਾਬੀ'
  ];

  // Offline Indic-to-Latin phonetic transliterator (used automatically when device only has English voices)
  const DEVA_MAP = {
    'अ':'a','आ':'aa','इ':'i','ई':'ee','उ':'u','ऊ':'oo','ऋ':'ri','ए':'e','ऐ':'ai','ओ':'o','औ':'au',
    'क':'ka','ख':'kha','ग':'ga','घ':'gha','ङ':'nga','च':'cha','छ':'chha','ज':'ja','झ':'jha','ञ':'nya',
    'ट':'ta','ठ':'tha','ड':'da','ढ':'dha','ण':'na','त':'ta','थ':'tha','द':'da','ध':'dha','न':'na',
    'प':'pa','फ':'pha','ब':'ba','भ':'bha','म':'ma','य':'ya','र':'ra','ल':'la','ळ':'la','व':'va',
    'श':'sha','ष':'sha','स':'sa','ह':'ha','क्ष':'ksha','त्र':'tra','ज्ञ':'gya',
    'ा':'aa','ि':'i','ी':'ee','ु':'u','ू':'oo','ृ':'ri','े':'e','ै':'ai','ो':'o','ौ':'au',
    'ं':'n','ः':'h','ँ':'n','्':'','।':'.','़':''
  };
  const BENG_MAP = {
    'অ':'o','আ':'aa','ই':'i','ঈ':'ee','উ':'u','ঊ':'oo','ঋ':'ri','এ':'e','ঐ':'oi','ও':'o','ঔ':'ou',
    'ক':'ko','খ':'kho','গ':'go','ঘ':'gho','চ':'cho','ছ':'chho','জ':'jo','ঝ':'jho',
    'ট':'to','ঠ':'tho','ড':'do','ঢ':'dho','ণ':'no','ত':'to','থ':'tho','দ':'do','ধ':'dho','ন':'no',
    'প':'po','ফ':'pho','ব':'bo','ভ':'bho','ম':'mo','য':'jo','র':'ro','ৰ':'ro','ল':'lo','শ':'sho','ষ':'sho','স':'so','হ':'ho',
    'া':'aa','ি':'i','ী':'ee','ু':'u','ূ':'oo','ে':'e','ৈ':'oi','ো':'o','ৌ':'ou','ং':'ng','ঁ':'n','্':'','।':'.'
  };
  const GUJ_MAP = {
    'અ':'a','આ':'aa','ઇ':'i','ઈ':'ee','ઉ':'u','ઊ':'oo','એ':'e','ઐ':'ai','ઓ':'o','ઔ':'au',
    'ક':'ka','ખ':'kha','ગ':'ga','ઘ':'gha','ચ':'cha','છ':'chha','જ':'ja','ઝ':'jha',
    'ટ':'ta','ઠ':'tha','ડ':'da','ઢ':'dha','ણ':'na','ત':'ta','થ':'tha','દ':'da','ધ':'dha','ન':'na',
    'પ':'pa','ફ':'pha','બ':'ba','ભ':'bha','મ':'ma','ય':'ya','ર':'ra','લ':'la','ળ':'la','વ':'va','શ':'sha','ષ':'sha','સ':'sa','હ':'ha',
    'ા':'aa','િ':'i','ી':'ee','ુ':'u','ૂ':'oo','ે':'e','ૈ':'ai','ો':'o','ૌ':'au','ં':'n','્':''
  };
  const GURU_MAP = {
    'ਅ':'a','ਆ':'aa','ਇ':'i','ਈ':'ee','ਉ':'u','ਊ':'oo','ਏ':'e','ਐ':'ai','ਓ':'o','ਔ':'au',
    'ਕ':'ka','ਖ':'kha','ਗ':'ga','ਘ':'gha','ਚ':'cha','ਛ':'chha','ਜ':'ja','ਝ':'jha',
    'ਟ':'ta','ਠ':'tha','ਡ':'da','ਢ':'dha','ਣ':'na','ਤ':'ta','ਥ':'tha','ਦ':'da','ਧ':'dha','ਨ':'na',
    'ਪ':'pa','ਫ':'pha','ਬ':'ba','ਭ':'bha','ਮ':'ma','ਯ':'ya','ਰ':'ra','ਲ':'la','ਵ':'va','ਸ':'sa','ਹ':'ha',
    'ਾ':'aa','ਿ':'i','ੀ':'ee','ੁ':'u','ੂ':'oo','ੇ':'e','ੈ':'ai','ੋ':'o','ੌ':'au','ੰ':'n','ਂ':'n','੍':''
  };
  const TAM_MAP = {
    'அ':'a','ஆ':'aa','இ':'i','ஈ':'ee','உ':'u','ஊ':'oo','எ':'e','ஏ':'ae','ஐ':'ai','ஒ':'o','ஓ':'oa','ஔ':'au',
    'க':'ka','ங':'nga','ச':'cha','ஞ':'nya','ட':'ta','ண':'na','த':'tha','ந':'na','ப':'pa','ம':'ma',
    'ய':'ya','ர':'ra','ல':'la','வ':'va','ழ':'zha','ள':'la','ற':'ra','ன':'na',
    'ா':'aa','ி':'i','ீ':'ee','ு':'u','ூ':'oo','ெ':'e','ே':'ae','ை':'ai','ொ':'o','ோ':'oa','ௌ':'au','்':''
  };
  const TEL_MAP = {
    'అ':'a','ఆ':'aa','ఇ':'i','ఈ':'ee','ఉ':'u','ఊ':'oo','ఎ':'e','ఏ':'ae','ఐ':'ai','ఒ':'o','ఓ':'oa','ఔ':'au',
    'క':'ka','ఖ':'kha','గ':'ga','ఘ':'gha','చ':'cha','జ':'ja','ట':'ta','డ':'da','ణ':'na','త':'ta','ద':'da','ధ':'dha','న':'na',
    'ప':'pa','ఫ':'pha','బ':'ba','భ':'bha','మ':'ma','య':'ya','ర':'ra','ల':'la','ళ':'la','వ':'va','శ':'sha','స':'sa','హ':'ha',
    'ా':'aa','ి':'i','ీ':'ee','ు':'u','ూ':'oo','ె':'e','ే':'ae','ై':'ai','ొ':'o','ో':'oa','ౌ':'au','ం':'m','్':''
  };
  const KAN_MAP = {
    'ಅ':'a','ಆ':'aa','ಇ':'i','ಈ':'ee','ಉ':'u','ಊ':'oo','ಎ':'e','ಏ':'ae','ಐ':'ai','ಒ':'o','ಓ':'oa','ಔ':'au',
    'ಕ':'ka','ಖ':'kha','ಗ':'ga','ಘ':'gha','ಚ':'cha','ಜ':'ja','ಟ':'ta','ಡ':'da','ಣ':'na','ತ':'ta','ದ':'da','ಧ':'dha','ನ':'na',
    'ಪ':'pa','ಫ':'pha','ಬ':'ba','ಭ':'bha','ಮ':'ma','ಯ':'ya','ರ':'ra','ಲ':'la','ಳ':'la','ವ':'va','ಶ':'sha','ಸ':'sa','ಹ':'ha',
    'ಾ':'aa','ಿ':'i','ೀ':'ee','ು':'u','ೂ':'oo','ೆ':'e','ೇ':'ae','ೈ':'ai','ೊ':'o','ೋ':'oa','ೌ':'au','ಂ':'m','್':''
  };
  const MAL_MAP = {
    'അ':'a','ആ':'aa','ഇ':'i','ഈ':'ee','ഉ':'u','ഊ':'oo','എ':'e','ഏ':'ae','ഐ':'ai','ഒ':'o','ഓ':'oa','ഔ':'au',
    'ക':'ka','ഖ':'kha','ഗ':'ga','ച':'cha','ജ':'ja','ട':'ta','ഡ':'da','ണ':'na','ത':'tha','ദ':'da','ന':'na',
    'പ':'pa','ഫ':'pha','ബ':'ba','മ':'ma','യ':'ya','ര':'ra','ല':'la','ള':'la','വ':'va','ശ':'sha','സ':'sa','ഹ':'ha',
    'ാ':'aa','ി':'i','ീ':'ee','ു':'u','ൂ':'oo','െ':'e','േ':'ae','ൈ':'ai','ൊ':'o','ോ':'oa','ൗ':'au','ം':'m','്':''
  };
  const ODI_MAP = {
    'ଅ':'a','ଆ':'aa','ଇ':'i','ଈ':'ee','ଉ':'u','ଊ':'oo','ଏ':'e','ଐ':'ai','ଓ':'o','ଔ':'au',
    'କ':'ka','ଖ':'kha','ଗ':'ga','ଘ':'gha','ଚ':'cha','ଛ':'chha','ଜ':'ja','ଟ':'ta','ଡ':'da','ଣ':'na',
    'ତ':'ta','ଥ':'tha','ଦ':'da','ଧ':'dha','ନ':'na','ପ':'pa','ଫ':'pha','ବ':'ba','ଭ':'bha','ମ':'ma',
    'ଯ':'ja','ର':'ra','ଲ':'la','ଳ':'la','ଶ':'sha','ସ':'sa','ହ':'ha',
    'ା':'aa','ି':'i','ୀ':'ee','ୁ':'u','ୂ':'oo','େ':'e','ୈ':'ai','ୋ':'o','ୌ':'au','ଂ':'ng','୍':''
  };

  const COMBINED_INDIC = Object.assign({}, DEVA_MAP, BENG_MAP, GUJ_MAP, GURU_MAP, TAM_MAP, TEL_MAP, KAN_MAP, MAL_MAP, ODI_MAP);
  const MATRA_RE = /[\u093E-\u094D\u09BE-\u09CD\u0A3E-\u0A4D\u0ABE-\u0ACD\u0B3E-\u0B4D\u0BBE-\u0BCD\u0C3E-\u0C4D\u0CBE-\u0CCD\u0D3E-\u0D4D]/;

  function hasIndicChars(str) {
    return /[\u0900-\u0D7F]/.test(str);
  }

  function transliterateIndicToLatin(str) {
    if (!hasIndicChars(str)) return str;
    let out = '';
    const chars = Array.from(str);
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const next = chars[i + 1] || '';
      const mapped = COMBINED_INDIC[ch];
      if (mapped !== undefined) {
        if (MATRA_RE.test(next) && mapped.length >= 2 && (mapped.endsWith('a') || mapped.endsWith('o'))) {
          out += mapped.slice(0, -1);
        } else {
          out += mapped;
        }
      } else {
        out += ch;
      }
    }
    return out.replace(/\s+/g, ' ').trim();
  }

  function loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      const list = window.speechSynthesis.getVoices();
      if (list && list.length > 0) {
        voices = list;
      }
    } catch (e) {}
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    loadVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function ensureContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.9;
      masterGain.connect(ctx.destination);

      musicGain = ctx.createGain();
      musicGain.gain.value = musicEnabled ? 0.14 : 0.0;
      musicGain.connect(masterGain);

      sfxGain = ctx.createGain();
      sfxGain.gain.value = 0.45;
      sfxGain.connect(masterGain);
    }
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function unlock() {
    ensureContext();
    loadVoices();
    if (!speechUnlocked && 'speechSynthesis' in window) {
      try {
        const u = new SpeechSynthesisUtterance('');
        u.volume = 0;
        window.speechSynthesis.speak(u);
        speechUnlocked = true;
      } catch (e) {}
    }
  }

  function playKalimbaNote(freq, time, duration = 0.52, vol = 0.22) {
    if (!ctx || !musicGain || !freq || isDucked) return;
    const osc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.0, time);

    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.14, time);
    overtoneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(vol, time + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0008, time + duration);

    osc.connect(env);
    overtone.connect(overtoneGain);
    overtoneGain.connect(env);
    env.connect(musicGain);

    osc.start(time);
    overtone.start(time);
    osc.stop(time + duration + 0.03);
    overtone.stop(time + duration + 0.03);
  }

  function startMusic() {
    ensureContext();
    if (!ctx || !musicEnabled) return;
    if (musicPlaying) return;
    musicPlaying = true;
    updateMusicGain();
    if (musicTimer) clearInterval(musicTimer);
    musicTimer = setInterval(() => {
      if (!musicPlaying || !musicEnabled || isDucked || !ctx || ctx.state !== 'running') return;
      const freq = KALIMBA_MELODY[stepIndex % KALIMBA_MELODY.length];
      if (freq > 0) {
        playKalimbaNote(freq, ctx.currentTime, 0.62, 0.2);
        if (stepIndex % 4 === 0) {
          playKalimbaNote(freq * 0.5, ctx.currentTime, 0.8, 0.09);
        }
      }
      stepIndex = (stepIndex + 1) % KALIMBA_MELODY.length;
    }, 460);
  }

  function stopMusic() {
    musicPlaying = false;
    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
  }

  function updateMusicGain() {
    if (!ctx || !musicGain) return;
    const target = !musicEnabled ? 0.0 : isDucked ? 0.0 : 0.14;
    try {
      musicGain.gain.cancelScheduledValues(ctx.currentTime);
      musicGain.gain.setTargetAtTime(target, ctx.currentTime, 0.08);
    } catch (e) {
      musicGain.gain.value = target;
    }
  }

  function setDucking(duck) {
    isDucked = !!duck;
    updateMusicGain();
  }

  function toggleMusic() {
    musicEnabled = !musicEnabled;
    if (musicEnabled) {
      ensureContext();
      startMusic();
    } else {
      updateMusicGain();
    }
    return musicEnabled;
  }

  function isMusicEnabled() { return musicEnabled; }
  function setStoryRate(r) { storyRate = Math.max(0.6, Math.min(1.05, r)); }
  function getStoryRate() { return storyRate; }
  function setMadhurMode(enabled) { madhurMode = !!enabled; }
  function isMadhurMode() { return madhurMode; }

  function setPreferredVoiceURI(uri) {
    preferredVoiceURI = uri || '';
    try {
      localStorage.setItem('alphabloom_voice_uri_v1', preferredVoiceURI);
    } catch (e) {}
  }

  function getPreferredVoiceURI() {
    return preferredVoiceURI;
  }

  function getAvailableVoices(targetLocale) {
    loadVoices();
    const target = (targetLocale || 'en-IN').toLowerCase();
    const base = target.split('-')[0];
    return [...voices].sort((a, b) => {
      const la = (a.lang || '').toLowerCase();
      const lb = (b.lang || '').toLowerCase();
      const sa = (la === target ? 300 : la.startsWith(base) ? 200 : la.endsWith('-in') ? 120 : la.startsWith('en') ? 60 : 0);
      const sb = (lb === target ? 300 : lb.startsWith(base) ? 200 : lb.endsWith('-in') ? 120 : lb.startsWith('en') ? 60 : 0);
      return sb - sa;
    });
  }

  const BHUPALI_NOTES = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
  function playMadhurBreath(stepIdx) {
    if (!madhurMode) return;
    ensureContext();
    if (!ctx || !sfxGain) return;
    const freq = BHUPALI_NOTES[stepIdx % BHUPALI_NOTES.length];
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.06, t + 0.08);
    env.gain.exponentialRampToValueAtTime(0.0008, t + 0.5);
    osc.connect(env);
    env.connect(sfxGain);
    osc.start(t);
    osc.stop(t + 0.54);
  }

  function playMadhurIntro() {
    if (!madhurMode) return;
    [261.63, 329.63, 392.00, 523.25].forEach((f, i) => {
      playTone(f, i * 0.1, 0.45, 'sine', 0.07);
    });
  }

  function playMadhurOutro() {
    if (!madhurMode) return;
    [392.00, 329.63, 261.63].forEach((f, i) => {
      playTone(f, i * 0.13, 0.6, 'sine', 0.07);
    });
  }

  function playTone(freq, startOffset, duration, type = 'sine', volume = 0.28) {
    ensureContext();
    if (!ctx || !sfxGain) return;
    const t = ctx.currentTime + startOffset;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    env.gain.setValueAtTime(0.001, t);
    env.gain.linearRampToValueAtTime(volume, t + 0.015);
    env.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(env);
    env.connect(sfxGain);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  function playIntroChime() {
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((n, idx) => {
      playTone(n, idx * 0.085, 0.34, 'triangle', 0.32);
    });
    playTone(1046.5, 0.44, 0.55, 'sine', 0.25);
  }

  function playTap() {
    playTone(580, 0, 0.09, 'sine', 0.22);
    playTone(760, 0.03, 0.09, 'triangle', 0.16);
  }

  function playCorrect() {
    playTone(523.25, 0, 0.16, 'triangle', 0.32);
    playTone(659.25, 0.09, 0.18, 'triangle', 0.32);
    playTone(783.99, 0.18, 0.22, 'triangle', 0.34);
    playTone(1046.5, 0.27, 0.36, 'sine', 0.32);
  }

  function playWrong() {
    ensureContext();
    if (!ctx || !sfxGain) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(290, t);
    osc.frequency.exponentialRampToValueAtTime(165, t + 0.24);
    env.gain.setValueAtTime(0.001, t);
    env.gain.linearRampToValueAtTime(0.18, t + 0.02);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc.connect(env);
    env.connect(sfxGain);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  function playPop() {
    ensureContext();
    if (!ctx || !sfxGain) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(980, t + 0.07);
    env.gain.setValueAtTime(0.32, t);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    osc.connect(env);
    env.connect(sfxGain);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  function playFlip() {
    playTone(440, 0, 0.07, 'sine', 0.18);
    playTone(620, 0.04, 0.08, 'sine', 0.14);
  }

  function cleanForSpeech(text) {
    if (!text) return '';
    return String(text)
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function scoreVoice(v, targetLocale) {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();
    const target = (targetLocale || 'en-IN').toLowerCase();
    const base = target.split('-')[0];
    let score = 0;

    if (lang === target) score += 130;
    else if (lang.startsWith(base + '-')) score += 85;
    else if (lang === base) score += 75;
    else return -1;

    if (lang.endsWith('-in')) score += 22;
    if (name.includes('google') || name.includes('natural')) score += 28;
    if (name.includes('microsoft')) score += 16;
    if (name.includes('espeak') || name.includes('compact')) score -= 40;
    for (const hint of FEMALE_VOICE_HINTS) {
      if (name.includes(hint)) {
        score += 36;
        break;
      }
    }
    if (name.includes('male') && !name.includes('female')) score -= 32;
    return score;
  }

  function selectVoice(locale, fallbackLocale) {
    loadVoices();
    if (!voices || voices.length === 0) {
      return { voice: null, usedFallback: false, resolvedLocale: locale };
    }

    // 1. Honor user's manually chosen voice if set
    if (preferredVoiceURI) {
      const manual = voices.find((v) => v.voiceURI === preferredVoiceURI || v.name === preferredVoiceURI);
      if (manual) {
        const mLang = (manual.lang || '').toLowerCase();
        const tBase = (locale || 'en-IN').toLowerCase().split('-')[0];
        const isDifferentLang = !mLang.startsWith(tBase);
        return { voice: manual, usedFallback: isDifferentLang, resolvedLocale: manual.lang || locale };
      }
    }

    // 2. Best automatic native voice for target locale
    let best = null;
    let bestScore = -1;
    for (const v of voices) {
      const s = scoreVoice(v, locale);
      if (s > bestScore) {
        bestScore = s;
        best = v;
      }
    }
    if (best) {
      return { voice: best, usedFallback: false, resolvedLocale: best.lang || locale };
    }

    // 3. Fallback chain (hi-IN -> en-IN -> en-GB -> en-US)
    const fallbacks = [];
    if (fallbackLocale) fallbacks.push(fallbackLocale);
    if (!fallbacks.includes('hi-IN')) fallbacks.push('hi-IN');
    if (!fallbacks.includes('en-IN')) fallbacks.push('en-IN');
    fallbacks.push('en-GB', 'en-US');

    for (const fb of fallbacks) {
      let fbBest = null;
      let fbScore = -1;
      for (const v of voices) {
        const s = scoreVoice(v, fb);
        if (s > fbScore) {
          fbScore = s;
          fbBest = v;
        }
      }
      if (fbBest) {
        return { voice: fbBest, usedFallback: true, resolvedLocale: fbBest.lang || fb };
      }
    }

    return { voice: voices[0], usedFallback: true, resolvedLocale: voices[0].lang || 'en-IN' };
  }

  function stopSpeech() {
    currentNarrationToken++;
    activeUtterance = null;
    setDucking(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  function speakInternal(text, locale, phoneticFallback, fallbackLocale, opts, onEnd) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    try {
      const doCancel = opts && opts.cancel !== undefined ? opts.cancel : true;
      if (doCancel) {
        window.speechSynthesis.cancel();
      }
      const pick = selectVoice(locale, fallbackLocale);
      let rawText = (pick.usedFallback && phoneticFallback) ? phoneticFallback : text;
      const chosenLang = (pick.voice ? pick.voice.lang : (pick.resolvedLocale || locale)).toLowerCase();

      // Critical fix: if the chosen voice is an English voice but the text is in Indic script,
      // transliterate offline to readable Indian phonetics so it NEVER goes silent or garbled!
      if (chosenLang.startsWith('en') && hasIndicChars(rawText)) {
        rawText = transliterateIndicToLatin(rawText);
      }

      const clean = cleanForSpeech(rawText);
      if (!clean) {
        if (onEnd) onEnd();
        return;
      }

      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = pick.voice ? pick.voice.lang : (pick.resolvedLocale || locale);
      if (pick.voice) utter.voice = pick.voice;
      utter.rate = (opts && opts.rate) ? opts.rate : 0.86;
      utter.pitch = (opts && opts.pitch !== undefined) ? opts.pitch : 1.0;
      utter.volume = 1.0;

      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        if (activeUtterance === utter) activeUtterance = null;
        if (onEnd) onEnd();
      };
      utter.onend = done;
      utter.onerror = done;

      activeUtterance = utter;
      window.speechSynthesis.speak(utter);
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      if (onEnd) onEnd();
    }
  }

  function speak(text, locale = 'en-IN', phoneticFallback = '', fallbackLocale = 'en-IN', onEnd = null) {
    speakInternal(text, locale, phoneticFallback, fallbackLocale, { cancel: true, rate: 0.86, pitch: 1.02 }, onEnd);
  }

  function speakStoryLine(text, locale = 'en-IN', fallbackLocale = 'en-IN', onEnd = null) {
    setDucking(true);
    if (madhurMode) playMadhurBreath(0);
    const pitchVal = madhurMode ? 1.04 : 1.0;
    speakInternal(text, locale, '', fallbackLocale, { cancel: true, rate: storyRate, pitch: pitchVal }, () => {
      setDucking(false);
      if (onEnd) onEnd();
    });
  }

  function narrateLines(lines, locale = 'en-IN', phoneticLines = null, fallbackLocale = 'en-IN', onLineChange = null, onDone = null) {
    stopSpeech();
    if (!lines || lines.length === 0) {
      if (onDone) onDone();
      return;
    }
    const token = ++currentNarrationToken;
    setDucking(true);
    if (madhurMode) playMadhurIntro();
    let idx = 0;

    function next() {
      if (token !== currentNarrationToken) return;
      if (idx >= lines.length) {
        if (madhurMode) playMadhurOutro();
        setDucking(false);
        if (onDone) onDone();
        return;
      }
      if (onLineChange) onLineChange(idx);
      const text = lines[idx];
      const ph = (phoneticLines && phoneticLines[idx]) ? phoneticLines[idx] : '';
      const isFirst = idx === 0;
      const stepNum = idx;
      idx++;

      const pitchVal = madhurMode ? 1.04 : 1.0;
      speakInternal(
        text,
        locale,
        ph,
        fallbackLocale,
        { cancel: isFirst, rate: storyRate, pitch: pitchVal },
        () => {
          if (token !== currentNarrationToken) return;
          if (madhurMode && idx < lines.length) playMadhurBreath(stepNum);
          setTimeout(next, madhurMode ? 460 : 340);
        }
      );
    }

    setTimeout(next, madhurMode ? 440 : 120);
  }

  function stopAll() {
    stopSpeech();
    stopMusic();
  }

  return {
    unlock,
    startMusic,
    stopMusic,
    toggleMusic,
    isMusicEnabled,
    setDucking,
    setStoryRate,
    getStoryRate,
    setMadhurMode,
    isMadhurMode,
    setPreferredVoiceURI,
    getPreferredVoiceURI,
    getAvailableVoices,
    playIntroChime,
    playTap,
    playCorrect,
    playWrong,
    playPop,
    playFlip,
    speak,
    speakStoryLine,
    stopSpeech,
    narrateLines,
    stopAll
  };
})();
