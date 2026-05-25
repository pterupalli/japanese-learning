// ============================================================
// LESSON-JLPT-N4.JS — JLPT N4 Prep
// Depends on: firebase-config.js, audio-pronunciation.js, lesson-core.js
// ============================================================

const LESSON_STEPS = [
    {
        id: 1,
        title: 'Welcome to JLPT N4',
        content: `
            <p class="step-description">
                JLPT N4 is the intermediate level. You'll cover advanced grammar patterns, keigo (honorific language), and richer vocabulary.
            </p>
            <div class="info-box">
                <h3>💡 N4 level requirements</h3>
                <p>
                    • ~300 kanji characters<br>
                    • ~1,500 vocabulary words<br>
                    • Everyday conversations<br>
                    • Basic reading comprehension
                </p>
            </div>
        `
    },
    {
        id: 2,
        title: 'Grammar pattern: ～たり～たりする',
        autoSpeak: 'えいがをみたり、ほんをよんだりします',
        content: `
            <p class="step-description">This pattern expresses "doing things like A and B" — listing example activities.</p>
            <div class="info-box">
                <h3>🎯 Formation</h3>
                <p>Verb (た-form) + り + Verb (た-form) + り + する</p>
            </div>
            <div class="info-box">
                <h3>📝 Examples</h3>
                <p>
                    <strong>週末は映画を見たり、本を読んだりします。</strong><br>
                    (しゅうまつはえいがをみたり、ほんをよんだりします)<br>
                    On weekends, I do things like watch movies and read books.<br><br>
                    <strong>日本で寿司を食べたり、お寺を見たりしました。</strong><br>
                    (にほんですしをたべたり、おてらをみたりしました)<br>
                    In Japan, I did things like eat sushi and visit temples.
                </p>
            </div>
        `
    },
    {
        id: 3,
        title: 'Grammar pattern: ～ている',
        autoSpeak: 'べんきょうしています',
        content: `
            <p class="step-description">Progressive / continuous action or ongoing state.</p>
            <div class="info-box">
                <h3>🎯 Formation</h3>
                <p>Verb (て-form) + いる</p>
            </div>
            <div class="info-box">
                <h3>📝 Examples</h3>
                <p>
                    <strong>今、勉強しています。</strong><br>
                    (いま、べんきょうしています)<br>
                    I am studying now.<br><br>
                    <strong>彼は日本に住んでいます。</strong><br>
                    (かれはにほんにすんでいます)<br>
                    He lives in Japan.
                </p>
            </div>
        `
    },
    {
        id: 4,
        title: 'Practice: N4 grammar',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Quick quiz</h3>
                <p class="practice-question">Which pattern means "doing things like A and B"?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, true)">～たり～たりする</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">～ている</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">～てください</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">～ましょう</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 5,
        title: 'Keigo — honorific language',
        autoSpeak: 'いらっしゃいませ',
        content: `
            <p class="step-description">Basic polite expressions for business and formal situations:</p>
            <div class="info-box">
                <h3>🎯 Common keigo</h3>
                <p>
                    <strong>いらっしゃる</strong> = to be / come / go (polite)<br>
                    <strong>召し上がる</strong> = to eat / drink (polite)<br>
                    <strong>おっしゃる</strong> = to say (polite)<br>
                    <strong>ご覧になる</strong> = to look / see (polite)
                </p>
            </div>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('いらっしゃいませ')">
                    <div class="character">いらっしゃいませ</div>
                    <div class="romaji">Irasshaimase</div>
                    <div class="pronunciation">Welcome (to a shop)</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('よろしくおねがいします')">
                    <div class="character">よろしくお願いします</div>
                    <div class="romaji">Yoroshiku onegaishimasu</div>
                    <div class="pronunciation">Please treat me well</div>
                </div>
            </div>
        `
    },
    {
        id: 6,
        title: 'Congratulations! 🎉',
        autoSpeak: 'おめでとうございます。がんばってください',
        content: `
            <p class="step-description" style="font-size: 1.3rem; text-align: center;">
                You've completed JLPT N4 Prep — all learning tracks finished!
            </p>
            <div class="info-box" style="background: rgba(46,204,113,0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ All lessons complete</h3>
                <p>
                    Keep practising with the Kana Tracker, Vocab Tracker, and YouTube resources.<br><br>
                    <strong>がんばってください！</strong> — Keep up the great work!
                </p>
            </div>
        `
    }
];

const LESSON_CONFIG = {
    floatingChars: [
        '上','下','左','右','前','後','中','外','内','近',
        '遠','高','低','早','遅','長','短','新','古','若'
    ],
    firestoreUpdates: {
        lessonsCompleted: firebase.firestore.FieldValue.increment(1),
        xp:               firebase.firestore.FieldValue.increment(100)
        // N4 prep doesn't teach kanji directly — kanjiLearned not incremented
    },
    nextPage: 'dashboard.html'
};

LessonCore.init(LESSON_STEPS, LESSON_CONFIG);
