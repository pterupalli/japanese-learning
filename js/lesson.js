// ========================================
// LESSON JAVASCRIPT - HIRAGANA BASICS
// ========================================

// Hiragana Lesson Content
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
                <h3>💡 Why Learn Hiragana?</h3>
                <p>Hiragana is the foundation of Japanese writing. Once you master it, you'll be able to read and write basic Japanese, 
                pronounce words correctly, and understand how the language works.</p>
            </div>
            <p class="step-description">
                Let's start with the first five characters: あ (a), い (i), う (u), え (e), お (o)
            </p>
        `
    },
    {
        id: 2,
        title: 'Vowels: あ い う え お',
        content: `
            <p class="step-description">
                These are the five vowel sounds in Japanese. Click each character to hear how it's pronounced:
            </p>
            <div class="character-grid">
                <div class="character-card" onclick="speakCharacter('a')">
                    <div class="character">あ</div>
                    <div class="romaji">A</div>
                    <div class="pronunciation">ah (like in "father")</div>
                </div>
                <div class="character-card" onclick="speakCharacter('i')">
                    <div class="character">い</div>
                    <div class="romaji">I</div>
                    <div class="pronunciation">ee (like in "see")</div>
                </div>
                <div class="character-card" onclick="speakCharacter('u')">
                    <div class="character">う</div>
                    <div class="romaji">U</div>
                    <div class="pronunciation">oo (like in "blue")</div>
                </div>
                <div class="character-card" onclick="speakCharacter('e')">
                    <div class="character">え</div>
                    <div class="romaji">E</div>
                    <div class="pronunciation">eh (like in "red")</div>
                </div>
                <div class="character-card" onclick="speakCharacter('o')">
                    <div class="character">お</div>
                    <div class="romaji">O</div>
                    <div class="pronunciation">oh (like in "go")</div>
                </div>
            </div>
            <div class="info-box">
                <h3>✍️ Writing Tip</h3>
                <p>Each hiragana character is written with specific stroke order. Practice writing them in the air or on paper as you learn!</p>
            </div>
        `
    },
    {
        id: 3,
        title: 'Practice: Vowels',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Quick Quiz</h3>
                <p class="practice-question">Which character represents the sound "i" (like in "see")?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="checkAnswer(this, false)">あ</button>
                    <button class="option-btn" onclick="checkAnswer(this, true)">い</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">う</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">え</button>
                </div>
                <div id="feedback"></div>
            </div>
        `
    },
    {
        id: 4,
        title: 'K-Column: か き く け こ',
        content: `
            <p class="step-description">
                Now let's learn the K-column. These characters combine the K sound with each vowel:
            </p>
            <div class="character-grid">
                <div class="character-card">
                    <div class="character">か</div>
                    <div class="romaji">KA</div>
                    <div class="pronunciation">kah</div>
                </div>
                <div class="character-card">
                    <div class="character">き</div>
                    <div class="romaji">KI</div>
                    <div class="pronunciation">kee</div>
                </div>
                <div class="character-card">
                    <div class="character">く</div>
                    <div class="romaji">KU</div>
                    <div class="pronunciation">koo</div>
                </div>
                <div class="character-card">
                    <div class="character">け</div>
                    <div class="romaji">KE</div>
                    <div class="pronunciation">keh</div>
                </div>
                <div class="character-card">
                    <div class="character">こ</div>
                    <div class="romaji">KO</div>
                    <div class="pronunciation">koh</div>
                </div>
            </div>
            <div class="info-box">
                <h3>🎯 Common Words</h3>
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
        title: 'Practice: K-Column',
        content: `
            <div class="practice-section">
                <h3 class="practice-title">Match the Sound</h3>
                <p class="practice-question">Which character represents "ku"?</p>
                <div class="practice-options">
                    <button class="option-btn" onclick="checkAnswer(this, false)">か</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">き</button>
                    <button class="option-btn" onclick="checkAnswer(this, true)">く</button>
                    <button class="option-btn" onclick="checkAnswer(this, false)">け</button>
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
                You've completed the Hiragana Basics lesson!
            </p>
            <div class="character-grid" style="max-width: 600px; margin: 2rem auto;">
                <div class="character-card">
                    <div class="character">あ</div>
                    <div class="romaji">A</div>
                </div>
                <div class="character-card">
                    <div class="character">い</div>
                    <div class="romaji">I</div>
                </div>
                <div class="character-card">
                    <div class="character">う</div>
                    <div class="romaji">U</div>
                </div>
                <div class="character-card">
                    <div class="character">え</div>
                    <div class="romaji">E</div>
                </div>
                <div class="character-card">
                    <div class="character">お</div>
                    <div class="romaji">O</div>
                </div>
                <div class="character-card">
                    <div class="character">か</div>
                    <div class="romaji">KA</div>
                </div>
                <div class="character-card">
                    <div class="character">き</div>
                    <div class="romaji">KI</div>
                </div>
                <div class="character-card">
                    <div class="character">く</div>
                    <div class="romaji">KU</div>
                </div>
                <div class="character-card">
                    <div class="character">け</div>
                    <div class="romaji">KE</div>
                </div>
                <div class="character-card">
                    <div class="character">こ</div>
                    <div class="romaji">KO</div>
                </div>
            </div>
            <div class="info-box" style="background: rgba(46, 204, 113, 0.1); border-color: #2ecc71;">
                <h3 style="color: #2ecc71;">✨ Next Steps</h3>
                <p>Continue learning more hiragana characters, or move on to Katakana Basics!</p>
            </div>
        `
    }
];

// ========================================
// LESSON STATE
// ========================================

let currentStep = 0;
let userId = null;

// ========================================
// INITIALIZE
// ========================================

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userId = user.uid;
        initializeLesson();
    } else {
        window.location.href = 'index.html';
    }
});

function initializeLesson() {
    // Create floating characters
    createFloatingCharacters();
    
    // Set total steps
    document.getElementById('totalSteps').textContent = LESSON_STEPS.length;
    
    // Load first step
    loadStep(0);
    
    // Setup navigation
    setupNavigation();
}

// ========================================
// FLOATING CHARACTERS
// ========================================

function createFloatingCharacters() {
    const container = document.getElementById('floatingChars');
    const characters = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ',
                       'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と'];
    
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

// ========================================
// STEP MANAGEMENT
// ========================================

function loadStep(stepIndex) {
    currentStep = stepIndex;
    const step = LESSON_STEPS[stepIndex];
    
    // Update content
    const contentDiv = document.getElementById('lessonContent');
    contentDiv.innerHTML = `
        <div class="step-content">
            <h2 class="step-title">${step.title}</h2>
            ${step.content}
        </div>
    `;
    
    // Update progress
    updateProgress();
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top
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
    
    // Previous button
    prevBtn.disabled = currentStep === 0;
    
    // Next/Complete button
    if (currentStep === LESSON_STEPS.length - 1) {
        nextBtn.style.display = 'none';
        completeBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        completeBtn.style.display = 'none';
    }
}

// ========================================
// NAVIGATION
// ========================================

function setupNavigation() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentStep > 0) {
            loadStep(currentStep - 1);
        }
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentStep < LESSON_STEPS.length - 1) {
            loadStep(currentStep + 1);
        }
    });
    
    document.getElementById('completeBtn').addEventListener('click', () => {
        completeLesson();
    });
}

// ========================================
// PRACTICE FUNCTIONS
// ========================================

function checkAnswer(button, isCorrect) {
    const feedbackDiv = button.parentElement.nextElementSibling;
    const allButtons = button.parentElement.querySelectorAll('.option-btn');
    
    // Disable all buttons
    allButtons.forEach(btn => btn.style.pointerEvents = 'none');
    
    // Mark correct/incorrect
    if (isCorrect) {
        button.classList.add('correct');
        feedbackDiv.innerHTML = '<div class="feedback correct">✅ Correct! Great job!</div>';
    } else {
        button.classList.add('incorrect');
        feedbackDiv.innerHTML = '<div class="feedback incorrect">❌ Not quite. Try to remember the correct answer!</div>';
    }
}

function speakCharacter(sound) {
    // Simple visual feedback (you can add Web Speech API later)
    console.log('Speaking:', sound);
    alert(`Pronunciation: ${sound.toUpperCase()}`);
}

// ========================================
// LESSON COMPLETION
// ========================================

async function completeLesson() {
    try {
        // Update user progress in Firestore
        const userRef = firebase.firestore().collection('users').doc(userId);
        await userRef.update({
            lessonsCompleted: firebase.firestore.FieldValue.increment(1),
            xp: firebase.firestore.FieldValue.increment(50),
            kanjiLearned: firebase.firestore.FieldValue.increment(10) // 10 hiragana learned
        });
        
        // Show completion modal
        document.getElementById('completionModal').style.display = 'flex';
        
        console.log('Lesson completed! +50 XP, +1 Lesson, +10 Characters');
    } catch (error) {
        console.error('Error completing lesson:', error);
        alert('Error saving progress. Please try again.');
    }
}

function startNextLesson() {
    // Redirect to Katakana lesson (you'll create this next)
    window.location.href = 'lesson-katakana.html';
}

// ========================================
// CONSOLE LOG
// ========================================

console.log(`
╔════════════════════════════════════════╗
║     Hiragana Basics Lesson Loaded      ║
║     Total Steps: ${LESSON_STEPS.length}                     ║
╚════════════════════════════════════════╝
`);
