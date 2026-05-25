// ============================================================
// LESSON-KATAKANA.JS — Katakana Basics
// Depends on: firebase-config.js, audio-pronunciation.js, lesson-core.js
// ============================================================

const LESSON_STEPS = [
    {
        id: 1,
        title: 'Introduction to Katakana',
        content: `
            <p class="step-description">
                Katakana (カタカナ) is the second Japanese writing system, also consisting of 46 basic characters.
                It is primarily used for foreign words, borrowed terms, onomatopoeia, and emphasis.
            </p>
            <div class="info-box">
                <h3>💡 When is Katakana used?</h3>
                <p>
                    • <strong>Foreign names:</strong> マイク (Mike), トム (Tom)<br>
                    • <strong>Borrowed words:</strong> コーヒー (coffee), テレビ (TV)<br>
                    • <strong>Country names:</strong> アメリカ (America), インド (India)<br>
                    • <strong>Emphasis:</strong> like using CAPS in English
                </p>
            </div>
            <p class="step-description">Katakana shares the same sounds as Hiragana — just written differently.</p>
        `
    },
    {
        id: 2,
        title: 'Vowels: ア イ ウ エ オ',
        autoSpeak: 'アイウエオ',
        content: `
            <p class="step-description">Notice how these look more angular than Hiragana. Click to hear each one:</p>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('ア')">
                    <div class="character">ア</div>
                    <div class="romaji">A</div>
                    <div class="pronunciation">ah — like "father"</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('イ')">
                    <div class="character">イ</div>
                    <div class="romaji">I</div>
                    <div class="pronunciation">ee — like "see"</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('ウ')">
                    <div class="character">ウ</div>
                    <div class="romaji">U</div>
                    <div class="pronunciation">oo — like "blue"</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('エ')">
                    <div class="character">エ</div>
                    <div class="romaji">E</div>
                    <div class="pronunciation">eh — like "red"</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('オ')">
                    <div class="character">オ</div>
                    <div class="romaji">O</div>
                    <div class="pronunciation">oh — like "go"</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Common words</h3>
                <p>
                    <strong>アイス</strong> (aisu) = ice cream<br>
                    <strong>エアコン</strong> (eakon) = air conditioner<br>
                    <strong>オイル</strong> (oiru) = oil
                </p>
            </div>
        `
    },
    {
        id: 3,
        title: 'Practice: Vowels',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Quick quiz</h3>
                <p class="practice-question">Which character represents the sound "u" (oo)?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">ア</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">イ</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, true)">ウ</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">エ</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 4,
        title: 'K-column: カ キ ク ケ コ',
        autoSpeak: 'カキクケコ',
        content: `
            <p class="step-description">More angular than the hiragana equivalents. Click to hear:</p>
            <div class="character-grid">
                <div class="character-card" onclick="LessonCore.speakChar('カ')">
                    <div class="character">カ</div>
                    <div class="romaji">KA</div><div class="pronunciation">kah</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('キ')">
                    <div class="character">キ</div>
                    <div class="romaji">KI</div><div class="pronunciation">kee</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('ク')">
                    <div class="character">ク</div>
                    <div class="romaji">KU</div><div class="pronunciation">koo</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('ケ')">
                    <div class="character">ケ</div>
                    <div class="romaji">KE</div><div class="pronunciation">keh</div>
                </div>
                <div class="character-card" onclick="LessonCore.speakChar('コ')">
                    <div class="character">コ</div>
                    <div class="romaji">KO</div><div class="pronunciation">koh</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Foreign words in Katakana</h3>
                <p>
                    <strong>ケーキ</strong> (kēki) = cake<br>
                    <strong>コーヒー</strong> (kōhī) = coffee<br>
                    <strong>カメラ</strong> (kamera) = camera
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
                <p class="practice-question">Which character represents "ki"?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">カ</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, true)">キ</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">ク</button>
                    <button class="option-btn" onclick="LessonCore.checkAnswer(this, false)">ケ</button>
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
                You've completed Katakana Basics!
            </p>
            <div class="character-grid" style="max-width: 600px; margin: 2rem auto;">
                ${['アA','イI','ウU','エE','オO','カKA','キKI','クKU','ケKE','コKO']
                    .map(s => `<div class="character-card"><div class="character">${s[0]}</div><div class="romaji">${s.slice(1)}</div></div>`)
                    .join('')}
            </div>
            <div class="info-box" style="background: rgba(46,204,113,0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ Next steps</h3>
                <p>Now you know both Hiragana and Katakana vowels and K-columns. Ready for Kanji?</p>
            </div>
        `
    }
];

const LESSON_CONFIG = {
    floatingChars: [
        'ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ',
        'サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト'
    ],
    firestoreUpdates: {
        lessonsCompleted: firebase.firestore.FieldValue.increment(1),
        xp:               firebase.firestore.FieldValue.increment(50)
    },
    nextPage: 'lesson-kanji.html'
};

LessonCore.init(LESSON_STEPS, LESSON_CONFIG);
