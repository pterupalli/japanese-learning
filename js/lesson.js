// ============================================================
// LESSON.JS — Hiragana Basics
// Depends on: firebase-config.js, audio-pronunciation.js, lesson-core.js
// ============================================================

const LESSON_STEPS = [
    {
        id: 1,
        title: 'Introduction to Hiragana',
        content: `
            <p class="step-description">
                Hiragana (ひらがな) is one of the three writing systems in Japanese. It consists of 46 basic characters,
                each representing a syllable. Hiragana is used for native Japanese words, grammatical particles, and verb endings.
            </p>
            <div class="info-box">
                <h3>💡 Why learn Hiragana?</h3>
                <p>Hiragana is the foundation of Japanese writing. Once you master it, you can read and write basic Japanese,
                pronounce words correctly, and understand how the language works.</p>
            </div>
            <p class="step-description">
                We'll start with the first five characters: あ (a), い (i), う (u), え (e), お (o)
            </p>
        `
    },
    {
        id: 2,
        title: 'Vowels: あ い う え お',
        autoSpeak: 'あいうえお',
        content: `
            <p class="step-description">
                The five vowel sounds in Japanese. Click each character to hear it:
            </p>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('あ')">
                    <div class="character">あ</div>
                    <div class="romaji">A</div>
                    <div class="pronunciation">ah — like "father"</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('い')">
                    <div class="character">い</div>
                    <div class="romaji">I</div>
                    <div class="pronunciation">ee — like "see"</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('う')">
                    <div class="character">う</div>
                    <div class="romaji">U</div>
                    <div class="pronunciation">oo — like "blue"</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('え')">
                    <div class="character">え</div>
                    <div class="romaji">E</div>
                    <div class="pronunciation">eh — like "red"</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('お')">
                    <div class="character">お</div>
                    <div class="romaji">O</div>
                    <div class="pronunciation">oh — like "go"</div>
                </div>
            </div>
            <div class="info-box">
                <h3>✍️ Writing tip</h3>
                <p>Each hiragana character is written with specific stroke order. Practice writing them as you learn!</p>
            </div>
        `
    },
    {
        id: 3,
        title: 'Practice: Vowels',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Quick quiz</h3>
                <p class="practice-question">Which character represents the sound "i" (like in "see")?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">あ</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, true)">い</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">う</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">え</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 4,
        title: 'K-column: か き く け こ',
        autoSpeak: 'かきくけこ',
        content: `
            <p class="step-description">
                The K-column combines the K sound with each vowel. Click to hear each one:
            </p>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('か')">
                    <div class="character">か</div>
                    <div class="romaji">KA</div>
                    <div class="pronunciation">kah</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('き')">
                    <div class="character">き</div>
                    <div class="romaji">KI</div>
                    <div class="pronunciation">kee</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('く')">
                    <div class="character">く</div>
                    <div class="romaji">KU</div>
                    <div class="pronunciation">koo</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('け')">
                    <div class="character">け</div>
                    <div class="romaji">KE</div>
                    <div class="pronunciation">keh</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('こ')">
                    <div class="character">こ</div>
                    <div class="romaji">KO</div>
                    <div class="pronunciation">koh</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Common words</h3>
                <p>
                    <strong>かき</strong> (kaki) = persimmon<br>
                    <strong>いけ</strong> (ike) = pond<br>
                    <strong>あき</strong> (aki) = autumn
                </p>
            </div>
        `
    },
    {
        id: 5,
        title: 'Practice: K-column',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Match the sound</h3>
                <p class="practice-question">Which character represents "ku"?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">か</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">き</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, true)">く</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">け</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 6,
        title: 'Congratulations! 🎉',
        autoSpeak: 'おめでとうございます',
        content: `
            <p class="step-description" style="font-size: 1.3rem; text-align: center;">
                You've completed Hiragana Basics!
            </p>
            <div class="character-grid" style="max-width: 600px; margin: 2rem auto;">
                ${['あA','いI','うU','えE','おO','かKA','きKI','くKU','けKE','こKO']
                    .map(s => {
                        const [c,r] = [s[0], s.slice(1)];
                        return `<div class="character-card"><div class="character">${c}</div><div class="romaji">${r}</div></div>`;
                    }).join('')}
            </div>
            <div class="info-box" style="background: rgba(46,204,113,0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ Next steps</h3>
                <p>Continue to Katakana, or practise what you've learned in the Kana Tracker on the dashboard!</p>
            </div>
        `
    }
];

const LESSON_CONFIG = {
    floatingChars: [
        'あ','い','う','え','お','か','き','く','け','こ',
        'さ','し','す','せ','そ','た','ち','つ','て','と'
    ],
    firestoreUpdates: {
        lessonsCompleted: firebase.firestore.FieldValue.increment(1),
        xp:               firebase.firestore.FieldValue.increment(50)
        // Note: hiragana mastery is tracked via the kana tracker on the dashboard,
        // not per-lesson — so we don't blindly increment kanjiLearned here.
    },
    nextPage: 'lesson-katakana.html'
};

LessonCore.init(LESSON_STEPS, LESSON_CONFIG);
