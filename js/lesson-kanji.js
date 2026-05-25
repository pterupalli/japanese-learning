// ============================================================
// LESSON-KANJI.JS — Essential Kanji (JLPT N5)
// Depends on: firebase-config.js, audio-pronunciation.js, lesson-core.js
// ============================================================

const LESSON_STEPS = [
    {
        id: 1,
        title: 'Introduction to Kanji',
        content: `
            <p class="step-description">
                Kanji (漢字) are Chinese characters used in Japanese writing. There are over 2,000 commonly used kanji,
                but for JLPT N5 (beginner level) you only need about 80.
            </p>
            <div class="info-box">
                <h3>💡 Why learn Kanji?</h3>
                <p>
                    • Makes reading Japanese much easier<br>
                    • Each kanji carries its own meaning<br>
                    • Required for JLPT exams<br>
                    • Opens up authentic content — signs, menus, books
                </p>
            </div>
            <p class="step-description">Today we'll learn 8 essential N5 kanji that form the foundation of many words.</p>
        `
    },
    {
        id: 2,
        title: 'Numbers: 一 二 三',
        autoSpeak: 'いちにさん',
        content: `
            <p class="step-description">The simplest kanji — numbers 1, 2, and 3:</p>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('いち')">
                    <div class="character">一</div>
                    <div class="romaji">ICHI / ITSU</div>
                    <div class="pronunciation">one, 1</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('に')">
                    <div class="character">二</div>
                    <div class="romaji">NI</div>
                    <div class="pronunciation">two, 2</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('さん')">
                    <div class="character">三</div>
                    <div class="romaji">SAN</div>
                    <div class="pronunciation">three, 3</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example words</h3>
                <p>
                    <strong>一人</strong> (ひとり) = one person<br>
                    <strong>二つ</strong> (ふたつ) = two things<br>
                    <strong>三日</strong> (みっか) = 3rd day of the month
                </p>
            </div>
        `
    },
    {
        id: 3,
        title: 'Time & days: 日 月 年',
        autoSpeak: 'にちがつねん',
        content: `
            <p class="step-description">Essential kanji for talking about time:</p>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('にち')">
                    <div class="character">日</div>
                    <div class="romaji">NICHI / HI / KA</div>
                    <div class="pronunciation">day, sun</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('つき')">
                    <div class="character">月</div>
                    <div class="romaji">GETSU / GATSU / TSUKI</div>
                    <div class="pronunciation">month, moon</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('ねん')">
                    <div class="character">年</div>
                    <div class="romaji">NEN / TOSHI</div>
                    <div class="pronunciation">year</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example words</h3>
                <p>
                    <strong>今日</strong> (きょう) = today<br>
                    <strong>一月</strong> (いちがつ) = January<br>
                    <strong>去年</strong> (きょねん) = last year
                </p>
            </div>
        `
    },
    {
        id: 4,
        title: 'Practice: Time kanji',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Quick quiz</h3>
                <p class="practice-question">Which kanji means "day" or "sun"?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, true)">日</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">月</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">年</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">三</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 5,
        title: 'People & origins: 人 本',
        autoSpeak: 'にほん',
        content: `
            <p class="step-description">Two incredibly common kanji:</p>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('ひと')">
                    <div class="character">人</div>
                    <div class="romaji">JIN / NIN / HITO</div>
                    <div class="pronunciation">person, people</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('ほん')">
                    <div class="character">本</div>
                    <div class="romaji">HON / MOTO</div>
                    <div class="pronunciation">book, origin</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example words</h3>
                <p>
                    <strong>日本</strong> (にほん) = Japan<br>
                    <strong>日本人</strong> (にほんじん) = Japanese person<br>
                    <strong>本</strong> (ほん) = book<br>
                    <strong>二人</strong> (ふたり) = two people
                </p>
            </div>
        `
    },
    {
        id: 6,
        title: 'Congratulations! 🎉',
        autoSpeak: 'よくできました',
        content: `
            <p class="step-description" style="font-size: 1.3rem; text-align: center;">
                You've learned 8 essential JLPT N5 kanji!
            </p>
            <div class="character-grid" style="max-width: 600px; margin: 2rem auto;">
                <div class="character-card"><div class="character">一</div><div class="romaji">one</div></div>
                <div class="character-card"><div class="character">二</div><div class="romaji">two</div></div>
                <div class="character-card"><div class="character">三</div><div class="romaji">three</div></div>
                <div class="character-card"><div class="character">日</div><div class="romaji">day/sun</div></div>
                <div class="character-card"><div class="character">月</div><div class="romaji">month/moon</div></div>
                <div class="character-card"><div class="character">年</div><div class="romaji">year</div></div>
                <div class="character-card"><div class="character">人</div><div class="romaji">person</div></div>
                <div class="character-card"><div class="character">本</div><div class="romaji">book/origin</div></div>
            </div>
            <div class="info-box" style="background: rgba(46,204,113,0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ Next steps</h3>
                <p>You now know basic kanji for numbers, time, and people. Ready to learn grammar patterns?</p>
            </div>
        `
    }
];

const LESSON_CONFIG = {
    floatingChars: [
        '一','二','三','日','月','年','人','本',
        '大','小','中','上','下','左','右','手',
        '足','目','口','耳'
    ],
    firestoreUpdates: {
        lessonsCompleted: firebase.firestore.FieldValue.increment(1),
        xp:               firebase.firestore.FieldValue.increment(75),
        kanjiLearned:     firebase.firestore.FieldValue.increment(8)   // correct: 8 kanji taught here
    },
    nextPage: 'lesson-grammar.html'
};

LessonCore.init(LESSON_STEPS, LESSON_CONFIG);
