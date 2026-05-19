// BASIC GRAMMAR LESSON - Particles

const LESSON_STEPS = [
    {
        id: 1,
        title: 'Introduction to Japanese Particles',
        content: `
            <p class="step-description">
                Particles (助詞 - joshi) are small words that show the grammatical function of words in a sentence. 
                They come AFTER the word they mark and are essential for understanding Japanese.
            </p>
            <div class="info-box">
                <h3>💡 Why Are Particles Important?</h3>
                <p>
                    Particles are like road signs in Japanese sentences. They tell you:<br>
                    • What is the subject<br>
                    • What is the object<br>
                    • What is the topic<br>
                    • Direction, location, time, and more
                </p>
            </div>
            <p class="step-description">
                Today we'll learn the three most important particles: は、が、and を
            </p>
        `
    },
    {
        id: 2,
        title: 'Topic Particle: は (wa)',
        content: `
            <p class="step-description">
                は marks the topic of a sentence. Written as は but pronounced "wa".
            </p>
            <div class="character-grid" style="grid-template-columns: 1fr;">
                <div class="character-card">
                    <div class="character">は</div>
                    <div class="romaji">WA (particle)</div>
                    <div class="pronunciation">Topic marker</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example Sentences</h3>
                <p>
                    <strong>私は学生です。</strong><br>
                    (わたしはがくせいです - Watashi wa gakusei desu)<br>
                    = As for me, I am a student.<br><br>
                    
                    <strong>これは本です。</strong><br>
                    (これはほんです - Kore wa hon desu)<br>
                    = This is a book.<br><br>
                    
                    <strong>日本は美しいです。</strong><br>
                    (にほんはうつくしいです - Nihon wa utsukushii desu)<br>
                    = Japan is beautiful.
                </p>
            </div>
        `
    },
    {
        id: 3,
        title: 'Subject Particle: が (ga)',
        content: `
            <p class="step-description">
                が marks the grammatical subject, often used for new information or emphasis.
            </p>
            <div class="character-grid" style="grid-template-columns: 1fr;">
                <div class="character-card">
                    <div class="character">が</div>
                    <div class="romaji">GA</div>
                    <div class="pronunciation">Subject marker</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example Sentences</h3>
                <p>
                    <strong>誰が来ましたか。</strong><br>
                    (だれがきましたか - Dare ga kimashita ka)<br>
                    = Who came?<br><br>
                    
                    <strong>雨が降っています。</strong><br>
                    (あめがふっています - Ame ga futteimasu)<br>
                    = Rain is falling.<br><br>
                    
                    <strong>猫が好きです。</strong><br>
                    (ねこがすきです - Neko ga suki desu)<br>
                    = I like cats. (Literally: Cats are likeable)
                </p>
            </div>
        `
    },
    {
        id: 4,
        title: 'Practice: は vs が',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Quick Quiz</h3>
                <p class="practice-question">Which particle would you use in: "私＿＿学生です" (I am a student)?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="checkAnswer(this, true)">は</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">が</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">を</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">に</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 5,
        title: 'Object Particle: を (wo/o)',
        content: `
            <p class="step-description">
                を marks the direct object of a verb. Pronounced "o" (not "wo").
            </p>
            <div class="character-grid" style="grid-template-columns: 1fr;">
                <div class="character-card">
                    <div class="character">を</div>
                    <div class="romaji">O/WO</div>
                    <div class="pronunciation">Object marker</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Example Sentences</h3>
                <p>
                    <strong>水を飲みます。</strong><br>
                    (みずをのみます - Mizu o nomimasu)<br>
                    = I drink water.<br><br>
                    
                    <strong>本を読みます。</strong><br>
                    (ほんをよみます - Hon o yomimasu)<br>
                    = I read a book.<br><br>
                    
                    <strong>映画を見ます。</strong><br>
                    (えいがをみます - Eiga o mimasu)<br>
                    = I watch a movie.
                </p>
            </div>
        `
    },
    {
        id: 6,
        title: 'Congratulations! 🎉',
        content: `
            <p class="step-description" style="font-size: 1.3rem; text-align: center;">
                You've learned the three essential Japanese particles!
            </p>
            <div class="character-grid" style="max-width: 600px; margin: 2rem auto;">
                <div class="character-card">
                    <div class="character">は</div>
                    <div class="romaji">WA</div>
                    <div class="pronunciation">Topic</div>
                </div>
                <div class="character-card">
                    <div class="character">が</div>
                    <div class="romaji">GA</div>
                    <div class="pronunciation">Subject</div>
                </div>
                <div class="character-card">
                    <div class="character">を</div>
                    <div class="romaji">O/WO</div>
                    <div class="pronunciation">Object</div>
                </div>
            </div>
            <div class="info-box">
                <h3>📝 Practice Sentence</h3>
                <p style="font-size: 1.2rem; text-align: center;">
                    <strong>私は日本語を勉強します。</strong><br>
                    (わたしはにほんごをべんきょうします)<br>
                    Watashi wa Nihongo o benkyou shimasu<br>
                    <em>I study Japanese.</em>
                </p>
            </div>
            <div class="info-box" style="background: rgba(46, 204, 113, 0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ Next Steps</h3>
                <p>You now understand basic sentence structure! Ready to expand your vocabulary?</p>
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
    const characters = ['は', 'が', 'を', 'に', 'で', 'と', 'の', 'へ', 'から', 'まで',
                       'も', 'や', 'か', 'ね', 'よ', 'さ', 'ぞ', 'わ', 'な', 'ば'];
    
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
    document.getElementById('lessonContent').innerHTML = `
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
    document.getElementById('prevBtn').disabled = currentStep === 0;
    const nextBtn = document.getElementById('nextBtn');
    const completeBtn = document.getElementById('completeBtn');
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
    document.getElementById('completeBtn').addEventListener('click', completeLesson);
}

function checkAnswer(button, isCorrect) {
    const feedbackDiv = button.parentElement.nextElementSibling;
    button.parentElement.querySelectorAll('.option-btn').forEach(btn => btn.style.pointerEvents = 'none');
    if (isCorrect) {
        button.classList.add('correct');
        feedbackDiv.innerHTML = '<div class="feedback correct">✅ Correct! Great job!</div>';
    } else {
        button.classList.add('incorrect');
        feedbackDiv.innerHTML = '<div class="feedback incorrect">❌ Not quite. Try again next time!</div>';
    }
}

async function completeLesson() {
    try {
        await firebase.firestore().collection('users').doc(userId).update({
            lessonsCompleted: firebase.firestore.FieldValue.increment(1),
            xp: firebase.firestore.FieldValue.increment(60),
            kanjiLearned: firebase.firestore.FieldValue.increment(3)
        });
        document.getElementById('completionModal').style.display = 'flex';
        console.log('Grammar lesson completed! +60 XP');
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving progress.');
    }
}

console.log('Basic Grammar Lesson Loaded');
