// ============================================================
// LESSON-VOCABULARY.JS — Vocabulary Builder
// Depends on: firebase-config.js, audio-pronunciation.js, lesson-core.js
// ============================================================

const LESSON_STEPS = [
    {
        id: 1,
        title: 'Introduction to Japanese vocabulary',
        content: `
            <p class="step-description">Building vocabulary is essential for communication. Let's learn common words organised by category.</p>
            <div class="info-box">
                <h3>💡 Learning strategy</h3>
                <p>
                    • Learn words in context<br>
                    • Practice with real sentences<br>
                    • Group similar words together<br>
                    • Use the Vocab Tracker on the dashboard for SRS review
                </p>
            </div>
        `
    },
    {
        id: 2,
        title: 'Greetings & basic phrases',
        autoSpeak: 'こんにちは',
        content: `
            <p class="step-description">Essential daily greetings — click each to hear it:</p>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('おはよう')">
                    <div class="character">おはよう</div>
                    <div class="romaji">Ohayou</div>
                    <div class="pronunciation">Good morning</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('こんにちは')">
                    <div class="character">こんにちは</div>
                    <div class="romaji">Konnichiwa</div>
                    <div class="pronunciation">Hello / Good afternoon</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('こんばんは')">
                    <div class="character">こんばんは</div>
                    <div class="romaji">Konbanwa</div>
                    <div class="pronunciation">Good evening</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('ありがとう')">
                    <div class="character">ありがとう</div>
                    <div class="romaji">Arigatou</div>
                    <div class="pronunciation">Thank you</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('すみません')">
                    <div class="character">すみません</div>
                    <div class="romaji">Sumimasen</div>
                    <div class="pronunciation">Excuse me / Sorry</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('さようなら')">
                    <div class="character">さようなら</div>
                    <div class="romaji">Sayounara</div>
                    <div class="pronunciation">Goodbye</div>
                </div>
            </div>
        `
    },
    {
        id: 3,
        title: 'Food & drinks',
        autoSpeak: 'みず',
        content: `
            <p class="step-description">Common food vocabulary — click to hear:</p>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('みず')">
                    <div class="character">水</div>
                    <div class="romaji">Mizu</div>
                    <div class="pronunciation">Water</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('おちゃ')">
                    <div class="character">お茶</div>
                    <div class="romaji">Ocha</div>
                    <div class="pronunciation">Tea</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('コーヒー')">
                    <div class="character">コーヒー</div>
                    <div class="romaji">Kōhī</div>
                    <div class="pronunciation">Coffee</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('ごはん')">
                    <div class="character">ご飯</div>
                    <div class="romaji">Gohan</div>
                    <div class="pronunciation">Rice / Meal</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('パン')">
                    <div class="character">パン</div>
                    <div class="romaji">Pan</div>
                    <div class="pronunciation">Bread</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('にく')">
                    <div class="character">肉</div>
                    <div class="romaji">Niku</div>
                    <div class="pronunciation">Meat</div>
                </div>
            </div>
        `
    },
    {
        id: 4,
        title: 'Numbers 1–10',
        autoSpeak: 'いちにさんしごろくしちはちきゅうじゅう',
        content: `
            <p class="step-description">Numbers in Japanese — click to hear each one:</p>
            <div class="character-grid">
                ${[
                    ['一','Ichi','1'],['二','Ni','2'],['三','San','3'],
                    ['四','Shi / Yon','4'],['五','Go','5'],['六','Roku','6'],
                    ['七','Shichi / Nana','7'],['八','Hachi','8'],
                    ['九','Kyuu / Ku','9'],['十','Juu','10']
                ].map(([c, r, p]) => `
                    <div class="character-card" onclick="LessonCore.speakChar('${p}')">
                        <div class="character">${c}</div>
                        <div class="romaji">${r}</div>
                        <div class="pronunciation">${p}</div>
                    </div>
                `).join('')}
            </div>
        `
    },
    {
        id: 5,
        title: 'Practice: Vocabulary quiz',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Quick quiz</h3>
                <p class="practice-question">How do you say "Thank you" in Japanese?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">こんにちは</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, true)">ありがとう</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">すみません</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">さようなら</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 6,
        title: 'Congratulations! 🎉',
        autoSpeak: 'よくできました',
        content: `
            <p class="step-description" style="font-size: 1.3rem; text-align: center;">
                You've learned 30+ essential Japanese words!
            </p>
            <div class="info-box" style="background: rgba(46,204,113,0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ Keep practising</h3>
                <p>Review these words daily using the Vocab Tracker on the dashboard. Try using them in sentences!</p>
            </div>
        `
    }
];

const LESSON_CONFIG = {
    floatingChars: [
        '水','茶','飯','肉','魚','野','菜','果','物','食',
        '飲','買','売','店','家','人','友','母','父','兄'
    ],
    firestoreUpdates: {
        lessonsCompleted: firebase.firestore.FieldValue.increment(1),
        xp:               firebase.firestore.FieldValue.increment(80),
        vocabLearned:     firebase.firestore.FieldValue.increment(15)  // correct field
        // No kanjiLearned — this is a vocab lesson
    },
    nextPage: 'lesson-jlpt-n4.html'
};

LessonCore.init(LESSON_STEPS, LESSON_CONFIG);
