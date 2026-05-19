// ESSENTIAL KANJI LESSON - JLPT N5

const LESSON_STEPS = [
    {
        id: 1,
        title: 'Introduction to Kanji',
        content: `
            <p class="step-description">
                Kanji (漢字) are Chinese characters used in Japanese writing. There are over 2,000 commonly used kanji, 
                but for JLPT N5 (beginner level), you only need to learn about 80 kanji.
            </p>
            <div class="info-box">
                <h3>💡 Why Learn Kanji?</h3>
                <p>
                    • Makes reading Japanese much easier<br>
                    • Each kanji carries meaning<br>
                    • Required for JLPT exams<br>
                    • Opens up authentic Japanese content (signs, menus, books)
                </p>
            </div>
            <p class="step-description">
                Today we'll learn 8 essential kanji that form the foundation of many words.
            </p>
        `
    },
    {
        id: 2,
        title: 'Numbers: 一 二 三',
        content: `
            <p class="step-description">
                Let's start with the simplest kanji - numbers 1, 2, and 3:
            </p>
            <div class="character-grid">
                <div class="character-card">
                    <div class="character">一</div>
                    <div class="romaji">ICHI / ITSU</div>
                    <div class="pronunciation">one, 1</div>
                </div>
                <div class="character-card">
                    <div class="character">二</div>
                    <div class="romaji">NI</div>
                    <div class="pronunciation">two, 2</div>
                </div>
                <div class="character-card">
                    <div class="character">三</div>
                    <div class="romaji">SAN</div>
                    <div class="pronunciation">three, 3</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example Words</h3>
                <p>
                    <strong>一人</strong> (ひとり - hitori) = one person<br>
                    <strong>二つ</strong> (ふたつ - futatsu) = two things<br>
                    <strong>三日</strong> (みっか - mikka) = 3rd day of month
                </p>
            </div>
        `
    },
    {
        id: 3,
        title: 'Time & Days: 日 月 年',
        content: `
            <p class="step-description">
                Essential kanji for talking about time:
            </p>
            <div class="character-grid">
                <div class="character-card">
                    <div class="character">日</div>
                    <div class="romaji">NICHI / HI / KA</div>
                    <div class="pronunciation">day, sun</div>
                </div>
                <div class="character-card">
                    <div class="character">月</div>
                    <div class="romaji">GETSU / GATSU / TSUKI</div>
                    <div class="pronunciation">month, moon</div>
                </div>
                <div class="character-card">
                    <div class="character">年</div>
                    <div class="romaji">NEN / TOSHI</div>
                    <div class="pronunciation">year</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example Words</h3>
                <p>
                    <strong>今日</strong> (きょう - kyō) = today<br>
                    <strong>一月</strong> (いちがつ - ichigatsu) = January<br>
                    <strong>去年</strong> (きょねん - kyonen) = last year
                </p>
            </div>
        `
    },
    {
        id: 4,
        title: 'Practice: Time Kanji',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Quick Quiz</h3>
                <p class="practice-question">Which kanji means "day" or "sun"?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="checkAnswer(this, true)">日</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">月</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">年</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">三</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 5,
        title: 'People: 人 本',
        content: `
            <p class="step-description">
                Kanji for people and origin:
            </p>
            <div class="character-grid">
                <div class="character-card">
                    <div class="character">人</div>
                    <div class="romaji">JIN / NIN / HITO</div>
                    <div class="pronunciation">person, people</div>
                </div>
                <div class="character-card">
                    <div class="character">本</div>
                    <div class="romaji">HON / MOTO</div>
                    <div class="pronunciation">book, origin</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example Words</h3>
                <p>
                    <strong>日本</strong> (にほん - Nihon) = Japan<br>
                    <strong>日本人</strong> (にほんじん - Nihonjin) = Japanese person<br>
                    <strong>本</strong> (ほん - hon) = book<br>
                    <strong>二人</strong> (ふたり - futari) = two people
                </p>
            </div>
        `
    },
    {
        id: 6,
        title: 'Congratulations! 🎉',
        content: `
            <p class="step-description" style="font-size: 1.3rem; text-align: center;">
                You've learned 8 essential JLPT N5 kanji!
            </p>
            <div class="character-grid" style="max-width: 600px; margin: 2rem auto;">
                <div class="character-card">
                    <div class="character">一</div>
                    <div class="romaji">one</div>
                </div>
                <div class="character-card">
                    <div class="character">二</div>
                    <div class="romaji">two</div>
                </div>
                <div class="character-card">
                    <div class="character">三</div>
                    <div class="romaji">three</div>
                </div>
                <div class="character-card">
                    <div class="character">日</div>
                    <div class="romaji">day/sun</div>
                </div>
                <div class="character-card">
                    <div class="character">月</div>
                    <div class="romaji">month/moon</div>
                </div>
                <div class="character-card">
                    <div class="character">年</div>
                    <div class="romaji">year</div>
                </div>
                <div class="character-card">
                    <div class="character">人</div>
                    <div class="romaji">person</div>
                </div>
                <div class="character-card">
                    <div class="character">本</div>
                    <div class="romaji">book/origin</div>
                </div>
            </div>
            <div class="info-box" style="background: rgba(46, 204, 113, 0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ Next Steps</h3>
                <p>You now know basic kanji for numbers, time, and people. Ready to learn grammar patterns?</p>
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
    const characters = ['一', '二', '三', '日', '月', '年', '人', '本',
                       '大', '小', '中', '上', '下', '左', '右', '手',
                       '足', '目', '口', '耳'];
    
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
            xp: firebase.firestore.FieldValue.increment(75),
            kanjiLearned: firebase.firestore.FieldValue.increment(8)
        });
        document.getElementById('completionModal').style.display = 'flex';
        console.log('Kanji lesson completed! +75 XP, +8 Kanji');
    } catch (error) {
        console.error('Error completing lesson:', error);
        alert('Error saving progress. Please try again.');
    }
}

console.log('Essential Kanji Lesson Loaded - Total Steps:', LESSON_STEPS.length);
