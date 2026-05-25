/**
 * audio-pronunciation.js
 * Nihongo道 — Japanese Learning Platform
 *
 * Drop-in audio module using Web Speech API (no external dependencies).
 * Place in /js/ and load before your closing </body> tag:
 *   <script src="js/audio-pronunciation.js"></script>
 *
 * Integration points in dashboard.html:
 *   openKanaModal(k, type)  → AP.speak(kanaData[k].char)
 *   modalSetStatus('mastered') → AP.speak(kanaData[currentKana].char)
 *   cycleVocab(jp) on 'known' → AP.speak(jp)
 *   cycleKanji(k) on 'known'  → AP.speak(k)
 *   logSession(minutes)        → AP.speak('お疲れ様でした')
 */

const AP = (() => {

  // ─── State ───────────────────────────────────────────────────────────────

  const synth = window.speechSynthesis;
  let _voice  = null;   // active SpeechSynthesisVoice
  let _rate   = 0.85;   // 0.5–1.5  (slower = clearer for learners)
  let _pitch  = 1.0;    // 0.5–2.0
  let _volume = 1.0;    // 0.0–1.0

  // ─── Voice loading ────────────────────────────────────────────────────────

  /**
   * Returns all available Japanese voices, sorted so device-native
   * voices come before remote/network ones.
   */
  function getJapaneseVoices() {
    return synth.getVoices()
      .filter(v => v.lang && v.lang.startsWith('ja'))
      .sort((a, b) => (a.localService === b.localService) ? 0 : a.localService ? -1 : 1);
  }

  /**
   * Returns ALL available voices (fallback when no Japanese voice exists).
   */
  function getAllVoices() {
    return synth.getVoices();
  }

  /**
   * Picks the best available voice.
   * Priority: ja-JP local → ja-JP remote → any ja-* → system default
   */
  function pickBestVoice() {
    const jpVoices = getJapaneseVoices();
    if (jpVoices.length > 0) {
      _voice = jpVoices[0];
      return;
    }
    const all = getAllVoices();
    _voice = all.length > 0 ? all[0] : null;

    if (_voice) {
      console.warn(
        '[AP] No Japanese TTS voice found. Using system default: ' + _voice.name +
        '. For best results, install a Japanese voice in your OS settings.'
      );
    } else {
      console.warn('[AP] No TTS voices available at all.');
    }
  }

  // Voices load asynchronously; handle both eager and event-based cases.
  function _initVoices() {
    pickBestVoice();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = pickBestVoice;
    }
  }

  if (typeof speechSynthesis !== 'undefined') {
    // Some browsers populate voices synchronously; some only via the event.
    if (synth.getVoices().length > 0) {
      _initVoices();
    } else {
      synth.addEventListener('voiceschanged', _initVoices, { once: true });
    }
  }

  // ─── Core speak ───────────────────────────────────────────────────────────

  /**
   * Speak a string of Japanese text.
   *
   * @param {string}   text     - Text to speak (kanji, kana, or romaji)
   * @param {object}   [opts]   - Optional overrides
   * @param {number}   [opts.rate]    - Speech rate (overrides global)
   * @param {number}   [opts.pitch]   - Pitch (overrides global)
   * @param {number}   [opts.volume]  - Volume (overrides global)
   * @param {Function} [opts.onEnd]   - Callback when utterance finishes
   * @param {Function} [opts.onStart] - Callback when utterance begins
   * @param {Function} [opts.onError] - Callback on error (receives event)
   */
  function speak(text, opts = {}) {
    if (typeof speechSynthesis === 'undefined') return;
    if (!text || !text.trim()) return;

    // Cancel any in-progress speech
    synth.cancel();

    const u = new SpeechSynthesisUtterance(text.trim());
    u.voice  = _voice;
    u.lang   = 'ja-JP';
    u.rate   = opts.rate   !== undefined ? opts.rate   : _rate;
    u.pitch  = opts.pitch  !== undefined ? opts.pitch  : _pitch;
    u.volume = opts.volume !== undefined ? opts.volume : _volume;

    if (opts.onStart) u.onstart = opts.onStart;
    if (opts.onEnd)   u.onend   = opts.onEnd;
    if (opts.onError) u.onerror = opts.onError;

    synth.speak(u);
  }

  // ─── Convenience helpers ──────────────────────────────────────────────────

  /**
   * Speak a single kana character slowly (for kana modal).
   * Repeats twice with a short gap so learners can hear it clearly.
   */
  function speakKana(char) {
    speak(char, {
      rate: 0.7,
      onEnd: () => setTimeout(() => speak(char, { rate: 0.7 }), 600)
    });
  }

  /**
   * Speak a vocabulary word at normal pace.
   */
  function speakVocab(jp) {
    speak(jp, { rate: _rate });
  }

  /**
   * Speak a kanji character with its reading if provided.
   * e.g. speakKanji('日', 'にち')
   */
  function speakKanji(char, reading) {
    const text = reading ? reading : char;
    speak(text, { rate: 0.8 });
  }

  /**
   * Play a short motivational phrase.
   * Called at end of study session, streak milestone, or stage-up.
   */
  const PHRASES = {
    sessionEnd:   'お疲れ様でした',       // "Good work"
    mastered:     'よくできました',        // "Well done"
    stageUp:      'おめでとうございます',  // "Congratulations"
    streakRemind: '今日も頑張りましょう',  // "Let's do our best today too"
    correct:      'せいかい',             // "Correct"
  };

  function praise(key = 'mastered') {
    const text = PHRASES[key] || PHRASES.mastered;
    speak(text, { rate: 0.9 });
  }

  // ─── Settings ─────────────────────────────────────────────────────────────

  function setRate(r)   { _rate   = Math.max(0.5, Math.min(1.5, r)); }
  function setPitch(p)  { _pitch  = Math.max(0.5, Math.min(2.0, p)); }
  function setVolume(v) { _volume = Math.max(0.0, Math.min(1.0, v)); }

  /**
   * Manually set voice by name (from getJapaneseVoices() list).
   * e.g. AP.setVoiceByName('Kyoko')
   */
  function setVoiceByName(name) {
    const all = synth.getVoices();
    const match = all.find(v => v.name === name);
    if (match) { _voice = match; return true; }
    return false;
  }

  function stop() { synth.cancel(); }

  // ─── Diagnostic ───────────────────────────────────────────────────────────

  /**
   * Returns a plain object with current state — useful for your settings UI.
   */
  function status() {
    const jpVoices = getJapaneseVoices();
    return {
      supported:      typeof speechSynthesis !== 'undefined',
      activeVoice:    _voice ? _voice.name : null,
      activeVoiceLang: _voice ? _voice.lang : null,
      japaneseVoices: jpVoices.map(v => ({ name: v.name, lang: v.lang, local: v.localService })),
      rate:  _rate,
      pitch: _pitch,
      volume: _volume,
    };
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  return {
    speak,
    speakKana,
    speakVocab,
    speakKanji,
    praise,
    stop,
    setRate,
    setPitch,
    setVolume,
    setVoiceByName,
    getJapaneseVoices,
    getAllVoices,
    status,
    PHRASES,
  };

})();

// ─── Dashboard integration hooks ──────────────────────────────────────────────
//
// Paste these one-liners into the matching functions in dashboard.html:
//
//  openKanaModal(k, type)
//    → AP.speakKana(kanaData[k].char);
//
//  modalSetStatus(status)
//    → if (status === 'mastered') AP.praise('mastered');
//
//  cycleVocab(jp)
//    → if (newStatus === 'known') AP.speakVocab(jp);
//
//  cycleKanji(k)
//    → if (newStatus === 'known') AP.speakKanji(k, kanjiData[k].kun);
//
//  addXP(n) — stage-up toast
//    → AP.praise('stageUp');
//
//  logSession(minutes)
//    → AP.praise('sessionEnd');
//
// Optional — settings panel (rate / pitch sliders):
//    rateSlider.oninput  = () => AP.setRate(+rateSlider.value);
//    pitchSlider.oninput = () => AP.setPitch(+pitchSlider.value);
//
// Diagnostic (browser console):
//    console.table(AP.status());
// ──────────────────────────────────────────────────────────────────────────────
