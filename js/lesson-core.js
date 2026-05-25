// ============================================================
// LESSON-CORE.JS — 日本語道
// Shared engine used by ALL lesson pages.
// Each lesson page just defines LESSON_STEPS + LESSON_CONFIG,
// then calls: LessonCore.init(LESSON_STEPS, LESSON_CONFIG)
//
// Load order in each lesson HTML:
//   <script src="js/firebase-config.js"></script>
//   <script src="js/audio-pronunciation.js"></script>
//   <script src="js/lesson-core.js"></script>
//   <script src="js/lesson-XXXX.js"></script>   ← defines steps + config + calls init
// ============================================================

const LessonCore = (() => {

    // ── State ─────────────────────────────────────────────────
    let _steps   = [];
    let _config  = {};
    let _step    = 0;
    let _userId  = null;

    // ── Public init ───────────────────────────────────────────

    /**
     * @param {Array}  steps   - LESSON_STEPS array from the lesson file
     * @param {Object} config  - { floatingChars[], firestoreUpdates{}, nextPage, xpReward }
     */
    function init(steps, config) {
        _steps  = steps;
        _config = config;

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                _userId = user.uid;
                _boot();
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // ── Boot ──────────────────────────────────────────────────

    function _boot() {
        _createFloatingChars();
        _setEl('totalSteps', _steps.length);
        _loadStep(0);
        _bindNavigation();
    }

    // ── Floating characters ───────────────────────────────────

    function _createFloatingChars() {
        const container = document.getElementById('floatingChars');
        if (!container) return;

        const chars   = _config.floatingChars || ['あ','い','う','え','お'];
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 20; i++) {
            const el = document.createElement('div');
            el.className  = 'floating-char';
            el.textContent = chars[i % chars.length];
            el.style.cssText = [
                `left:${Math.random() * 100}%`,
                `animation-duration:${15 + Math.random() * 20}s`,
                `animation-delay:${Math.random() * 10}s`,
                `font-size:${2 + Math.random() * 2}rem`,
                `opacity:${(0.1 + Math.random() * 0.2).toFixed(2)}`
            ].join(';');
            fragment.appendChild(el);
        }
        container.appendChild(fragment);
    }

    // ── Step rendering ────────────────────────────────────────

    function _loadStep(index) {
        _step = index;
        const s = _steps[index];

        const contentDiv = document.getElementById('lessonContent');
        if (contentDiv) {
            contentDiv.innerHTML = `
                <div class="step-content">
                    <h2 class="step-title">${s.title}</h2>
                    ${s.content}
                </div>
            `;
        }

        _updateProgress();
        _updateNavButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Auto-speak first character visible in new step if AP is loaded
        if (window.AP && s.autoSpeak) {
            AP.speak(s.autoSpeak);
        }
    }

    function _updateProgress() {
        const pct = ((_step + 1) / _steps.length) * 100;
        const bar = document.getElementById('lessonProgress');
        if (bar) bar.style.width = pct + '%';
        _setEl('currentStep', _step + 1);
    }

    function _updateNavButtons() {
        const prev     = document.getElementById('prevBtn');
        const next     = document.getElementById('nextBtn');
        const complete = document.getElementById('completeBtn');

        if (prev)     prev.disabled    = _step === 0;
        if (next)     next.style.display     = _step === _steps.length - 1 ? 'none'  : 'block';
        if (complete) complete.style.display = _step === _steps.length - 1 ? 'block' : 'none';
    }

    // ── Navigation ────────────────────────────────────────────

    function _bindNavigation() {
        document.getElementById('prevBtn')
            ?.addEventListener('click', () => { if (_step > 0) _loadStep(_step - 1); });

        document.getElementById('nextBtn')
            ?.addEventListener('click', () => { if (_step < _steps.length - 1) _loadStep(_step + 1); });

        document.getElementById('completeBtn')
            ?.addEventListener('click', _completeLesson);
    }

    // ── Practice quiz ─────────────────────────────────────────

    /**
     * Called from inline onclick in lesson step HTML.
     * e.g.  onclick="LessonCore.checkAnswer(this, true)"
     */
    function checkAnswer(button, isCorrect) {
        const options = button.parentElement.querySelectorAll('.option-btn');
        options.forEach(b => { b.style.pointerEvents = 'none'; });

        const feedback = button.parentElement.nextElementSibling;

        if (isCorrect) {
            button.classList.add('correct');
            if (feedback) feedback.innerHTML = '<div class="feedback correct">✅ Correct! Great job!</div>';
            if (window.AP) AP.praise('correct');
        } else {
            button.classList.add('incorrect');
            if (feedback) feedback.innerHTML = '<div class="feedback incorrect">❌ Not quite — review the characters above!</div>';
        }
    }

    /**
     * Called from character cards in lesson steps.
     * e.g.  onclick="LessonCore.speakChar('あ')"
     */
    function speakChar(text) {
        if (window.AP) {
            AP.speakKana(text);
        }
    }

    // ── Lesson completion ─────────────────────────────────────

    async function _completeLesson() {
        if (!_userId) return;

        const btn = document.getElementById('completeBtn');
        if (btn) { btn.disabled = true; btn.textContent = 'Saving...'; }

        try {
            const updates = _config.firestoreUpdates || {
                lessonsCompleted: firebase.firestore.FieldValue.increment(1),
                xp:               firebase.firestore.FieldValue.increment(50)
            };

            await firebase.firestore()
                .collection('users')
                .doc(_userId)
                .update(updates);

            if (window.AP) AP.praise('sessionEnd');

            const modal = document.getElementById('completionModal');
            if (modal) modal.style.display = 'flex';

        } catch (err) {
            console.error('[LessonCore] completeLesson failed:', err);
            if (btn) { btn.disabled = false; btn.textContent = 'Complete Lesson'; }
            alert('Error saving progress — please check your connection and try again.');
        }
    }

    // ── Next lesson navigation ────────────────────────────────

    function goToNextLesson() {
        window.location.href = _config.nextPage || 'dashboard.html';
    }

    // ── Utility ───────────────────────────────────────────────

    function _setEl(id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    // ── Public API ────────────────────────────────────────────

    return { init, checkAnswer, speakChar, goToNextLesson };

})();
