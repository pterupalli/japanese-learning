// ============================================================
// LESSON-GRAMMAR.JS — Basic Grammar: Particles
// Depends on: firebase-config.js, audio-pronunciation.js, lesson-core.js
// ============================================================

const LESSON_STEPS = [
    {
        id: 1,
        title: 'Introduction to Japanese particles',
        content: `
            <p class="step-description">
                Particles (助詞 — joshi) are small words that show the grammatical function of words in a sentence.
                They come <em>after</em> the word they mark and are essential for understanding Japanese.
            </p>
            <div class="info-box">
                <h3>💡 Why are particles important?</h3>
                <p>
                    Particles are like road signs in Japanese sentences. They tell you:<br>
                    • What is the subject<br>
                    • What is the object<br>
                    • What is the topic<br>
                    • Direction, location, time, and more
                </p>
            </div>
            <p class="step-description">Today we'll learn the three most important particles: は、が、and を</p>
        `
    },
    {
        id: 2,
        title: 'Topic particle: は (wa)',
        autoSpeak: 'は',
        content: `
            <p class="step-description">
                は marks the <em>topic</em> of a sentence. Written as は but pronounced "wa".
            </p>
            <div class="character-grid" style="grid-template-columns: 1fr;">
                <div class="character-card" onclick="LessonCore.speakChar('は')">
                    <div class="character">は</div>
                    <div class="romaji">WA (particle)</div>
                    <div class="pronunciation">Topic marker</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example sentences</h3>
                <p>
                    <strong>私は学生です。</strong><br>
                    (わたしはがくせいです)<br>
                    = As for me, I am a student.<br><br>
                    <strong>これは本です。</strong><br>
                    (これはほんです)<br>
                    = This is a book.
                </p>
            </div>
        `
    },
    {
        id: 3,
        title: 'Subject particle: が (ga)',
        autoSpeak: 'が',
        content: `
            <p class="step-description">
                が marks the grammatical <em>subject</em> — often used for new information or emphasis.
            </p>
            <div class="character-grid" style="grid-template-columns: 1fr;">
                <div class="character-card" onclick="LessonCore.speakChar('が')">
                    <div class="character">が</div>
                    <div class="romaji">GA</div>
                    <div class="pronunciation">Subject marker</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example sentences</h3>
                <p>
                    <strong>雨が降っています。</strong><br>
                    (あめがふっています)<br>
                    = Rain is falling.<br><br>
                    <strong>猫が好きです。</strong><br>
                    (ねこがすきです)<br>
                    = I like cats.
                </p>
            </div>
        `
    },
    {
        id: 4,
        title: 'Practice: は vs が',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Quick quiz</h3>
                <p class="practice-question">Which particle completes: "私＿＿学生です" (I am a student)?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, true)">は</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">が</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">を</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">に</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 5,
        title: 'Object particle: を (o)',
        autoSpeak: 'を',
        content: `
            <p class="step-description">
                を marks the direct <em>object</em> of a verb. Pronounced "o" (not "wo").
            </p>
            <div class="character-grid" style="grid-template-columns: 1fr;">
                <div class="character-card" onclick="LessonCore.speakChar('お')">
                    <div class="character">を</div>
                    <div class="romaji">O / WO</div>
                    <div class="pronunciation">Object marker</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example sentences</h3>
                <p>
                    <strong>水を飲みます。</strong><br>
                    (みずをのみます)<br>
                    = I drink water.<br><br>
                    <strong>本を読みます。</strong><br>
                    (ほんをよみます)<br>
                    = I read a book.
                </p>
            </div>
        `
    },
    {
        id: 6,
        title: 'Congratulations! 🎉',
        autoSpeak: 'おつかれさまでした',
        content: `
            <p class="step-description" style="font-size: 1.3rem; text-align: center;">
                You've learned the three essential Japanese particles!
            </p>
            <div class="character-grid" style="max-width: 600px; margin: 2rem auto;">
                <div class="character-card"><div class="character">は</div><div class="romaji">WA</div><div class="pronunciation">Topic</div></div>
                <div class="character-card"><div class="character">が</div><div class="romaji">GA</div><div class="pronunciation">Subject</div></div>
                <div class="character-card"><div class="character">を</div><div class="romaji">O/WO</div><div class="pronunciation">Object</div></div>
            </div>
            <div class="info-box">
                <h3>📝 Practice sentence</h3>
                <p style="font-size: 1.1rem; text-align: center;">
                    <strong>私は日本語を勉強します。</strong><br>
                    (わたしはにほんごをべんきょうします)<br>
                    <em>I study Japanese.</em>
                </p>
            </div>
            <div class="info-box" style="background: rgba(46,204,113,0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ Next steps</h3>
                <p>You now understand basic sentence structure. Ready to expand your vocabulary?</p>
            </div>
        `
    }
];

const LESSON_CONFIG = {
    floatingChars: [
        'は','が','を','に','で','と','の','へ','も','や',
        'か','ね','よ','さ','ぞ','わ','な','ば','ら','し'
    ],
    firestoreUpdates: {
        lessonsCompleted: firebase.firestore.FieldValue.increment(1),
        xp:               firebase.firestore.FieldValue.increment(60)
        // No kanjiLearned increment — this is a grammar lesson, not kanji
    },
    nextPage: 'lesson-vocabulary.html'
};

LessonCore.init(LESSON_STEPS, LESSON_CONFIG);
