// KATAKANA BASICS LESSON

const LESSON_STEPS = [
    {
        id: 1,
        title: 'Introduction to Katakana',
        content: `
            <p class="step-description">
                Katakana (カタカナ) is the second Japanese writing system, also consisting of 46 basic characters. 
                Katakana is primarily used for foreign words, borrowed terms, onomatopoeia, and emphasis.
            </p>
            <div class="info-box">
                <h3>💡 When is Katakana Used?</h3>
                <p>
                    • <strong>Foreign Names:</strong> マイク (Mike), トム (Tom)<br>
                    • <strong>Borrowed Words:</strong> コーヒー (coffee), テレビ (TV)<br>
                    • <strong>Country Names:</strong> アメリカ (America), インド (India)<br>
                    • <strong>Emphasis:</strong> Like using CAPS in English
                </p>
            </div>
            <p class="step-description">
                Katakana has the same sounds as Hiragana, just written differently. Let's start with the vowels!
            </p>
        `
    },
    {
        id: 2,
        title: 'Vowels: ア イ ウ エ オ',
        content: `
            <p class="step-description">
                The five vowel sounds in Katakana. Notice how they look different from Hiragana:
            </p>
            <div class="character-grid">
                <div class="character-card">
                    <div class="character">ア</div>
                    <div class="romaji">A</div>
                    <div class="pronunciation">ah (like in "father")</div>
                </div>
                <div class="character-card">
                    <div class="character">イ</div>
                    <div class="romaji">I</div>
                    <div class="pronunciation">ee (like in "see")</div>
                </div>
                <div class="character-card">
                    <div class="character">ウ</div>
                    <div class="romaji">U</div>
                    <div class="pronunciation">oo (like in "blue")</div>
                </div>
                <div class="character-card">
                    <div class="character">エ</div>
                    <div class="romaji">E</div>
                    <div class="pronunciation">eh (like in "red")</div>
                </div>
                <div class="character-card">
                    <div class="character">オ</div>
                    <div class="romaji">O</div>
                    <div class="pronunciation">oh (like in "go")</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Common Words</h3>
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
                <h3 class="practice-title">Quick Quiz</h3>
                <p class="practice-question">Which character represents the sound "u" (oo)?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="checkAnswer(this, false)">ア</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">イ</button>
                    <button class="option-btn" onclick="checkAnswer(this, true)">ウ</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">エ</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 4,
        title: 'K-Column: カ キ ク ケ コ',
        content: `
            <p class="step-description">
                The K-column in Katakana. These look more angular than Hiragana:
            </p>
            <div class="character-grid">
                <div class="character-card">
                    <div class="character">カ</div>
                    <div class="romaji">KA</div>
                    <div class="pronunciation">kah</div>
                </div>
                <div class="character-card">
                    <div class="character">キ</div>
                    <div class="romaji">KI</div>
                    <div class="pronunciation">kee</div>
                </div>
                <div class="character-card">
                    <div class="character">ク</div>
                    <div class="romaji">KU</div>
                    <div class="pronunciation">koo</div>
                </div>
                <div class="character-card">
                    <div class="character">ケ</div>
                    <div class="romaji">KE</div>
                    <div class="pronunciation">keh</div>
                </div>
                <div class="character-card">
                    <div class="character">コ</div>
                    <div class="romaji">KO</div>
                    <div class="pronunciation">koh</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Foreign Words</h3>
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
        title: 'Practice: K-Column',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Match the Sound</h3>
                <p class="practice-question">Which character represents "ki"?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="checkAnswer(this, false)">カ</button>
                    <button class="option-btn" onclick="checkAnswer(this, true)">キ</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">ク</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">ケ</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 6,
        title: 'Congratulations! 🎉',
        content: `
            <p class="step-description" style="font-size: 1.3rem; text-align: center;">
                You've completed the Katakana Basics lesson!
            </p>
            <div class="character-grid" style="max-width: 600px; margin: 2rem auto;">
                <div class="character-card">
                    <div class="character">ア</div>
                    <div class="romaji">A</div>
                </div>
                <div class="character-card">
                    <div class="character">イ</div>
                    <div class="romaji">I</div>
                </div>
                <div class="character-card">
                    <div class="character">ウ</div>
                    <div class="romaji">U</div>
                </div>
                <div class="character-card">
                    <div class="character">エ</div>
                    <div class="romaji">E</div>
                </div>
                <div class="character-card">
                    <div class="character">オ</div>
                    <div class="romaji">O</div>
                </div>
                <div class="character-card">
                    <div class="character">カ</div>
                    <div class="romaji">KA</div>
                </div>
                <div class="character-card">
                    <div class="character">キ</div>
                    <div class="romaji">KI</div>
                </div>
                <div class="character-card">
                    <div class="character">ク</div>
                    <div class="romaji">KU</div>
                </div>
                <div class="character-card">
                    <div class="character">ケ</div>
                    <div class="romaji">KE</div>
                </div>
                <div class="character-card">
                    <div class="character">コ</div>
                    <div class="romaji">KO</div>
                </div>
            </div>
            <div class="info-box" style="background: rgba(46, 204, 113, 0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ Next Steps</h3>
                <p>Now you know both Hiragana and Katakana vowels and K-columns. Ready for Kanji?</p>
            </div>
        `
    }
];

let currentStep = 0;
let userId = null;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userId = user.uid;
        initializeLesson();
    } else {
        window.location.href = 'index.html';
    }
});

function initializeLesson() {
    createFloatingCharacters();
    document.getElementById('totalSteps').textContent = LESSON_STEPS.length;
    loadStep(0);
    setupNavigation();
}

function createFloatingCharacters() {
    const container = document.getElementById('floatingChars');
    const characters = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
                       'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'];
    
    for (let i = 0; i < 20; i++) {
        const char = document.createElement('div');
        char.className = 'floating-char';
        char.textContent = characters[i % characters.length];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (15 + Math.random() * 20) + 's';
        char.style.animationDelay = Math.random() * 10 + 's';
        char.style.fontSize = (2 + Math.random() * 2) + 'rem';
        char.style.opacity = 0.1 + Math.random() * 0.2;
        container.appendChild(char);
    }
}

function loadStep(stepIndex) {
    currentStep = stepIndex;
    const step = LESSON_STEPS[stepIndex];
    const contentDiv = document.getElementById('lessonContent');
    contentDiv.innerHTML = `
        <div class="step-content">
            <h2 class="step-title">${step.title}</h2>
            ${step.content}
        </div>
    `;
    updateProgress();
    updateNavigationButtons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
    const progress = ((currentStep + 1) / LESSON_STEPS.length) * 100;
    document.getElementById('lessonProgress').style.width = progress + '%';
    document.getElementById('currentStep').textContent = currentStep + 1;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const completeBtn = document.getElementById('completeBtn');
    prevBtn.disabled = currentStep === 0;
    if (currentStep === LESSON_STEPS.length - 1) {
        nextBtn.style.display = 'none';
        completeBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        completeBtn.style.display = 'none';
    }
}

function setupNavigation() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentStep > 0) loadStep(currentStep - 1);
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentStep < LESSON_STEPS.length - 1) loadStep(currentStep + 1);
    });
    document.getElementById('completeBtn').addEventListener('click', () => {
        completeLesson();
    });
}

function checkAnswer(button, isCorrect) {
    const feedbackDiv = button.parentElement.nextElementSibling;
    const allButtons = button.parentElement.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.style.pointerEvents = 'none');
    if (isCorrect) {
        button.classList.add('correct');
        feedbackDiv.innerHTML = '<div class="feedback correct">✅ Correct! Great job!</div>';
    } else {
        button.classList.add('incorrect');
        feedbackDiv.innerHTML = '<div class="feedback incorrect">❌ Not quite. Try to remember the correct answer!</div>';
    }
}

async function completeLesson() {
    try {
        const userRef = firebase.firestore().collection('users').doc(userId);
        await userRef.update({
            lessonsCompleted: firebase.firestore.FieldValue.increment(1),
            xp: firebase.firestore.FieldValue.increment(50),
            kanjiLearned: firebase.firestore.FieldValue.increment(10)
        });
        document.getElementById('completionModal').style.display = 'flex';
        console.log('Katakana lesson completed! +50 XP');
    } catch (error) {
        console.error('Error completing lesson:', error);
        alert('Error saving progress. Please try again.');
    }
}

console.log('Katakana Basics Lesson Loaded - Total Steps:', LESSON_STEPS.length);
