// Dashboard Module
import { auth, db } from './firebase-config.js';
import { 
    onAuthStateChanged,
    signOut 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// ============================================
// Global State
// ============================================

let currentUser = null;
let userData = null;

// ============================================
// Auth State Observer
// ============================================

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        await initializeDashboard(user);
    } else {
        // User is signed out, redirect to login
        window.location.href = 'index.html';
    }
});

// ============================================
// Initialize Dashboard
// ============================================

async function initializeDashboard(user) {
    try {
        // Load user data from Firestore
        userData = await loadUserData(user.uid);
        
        // If new user, create initial data
        if (!userData) {
            userData = await createInitialUserData(user);
        }
        
        // Update UI
        updateUserProfile(user);
        updateStats();
        loadLessons();
        loadAchievements();
        loadRecentProgress();
        loadFlashcards();
        loadVideos();
        
        // Initialize interactive features
        initializeNavigation();
        initializeFlashcards();
        initializePomodoroTimer();
        initializeThemeToggle();
        
    } catch (error) {
        console.error('Dashboard initialization error:', error);
    }
}

// ============================================
// Firestore Functions
// ============================================

async function loadUserData(uid) {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return userSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Error loading user data:', error);
        return null;
    }
}

async function createInitialUserData(user) {
    const initialData = {
        displayName: user.displayName || 'Student',
        email: user.email,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        
        // Progress tracking
        level: 1,
        xp: 0,
        streak: 0,
        lastStudyDate: null,
        
        // Lesson progress
        lessonsCompleted: 0,
        currentLesson: 1,
        lessonProgress: {},
        
        // Study stats
        totalStudyTime: 0,
        todayStudyTime: 0,
        pomodoroSessions: 0,
        
        // Learning stats
        kanjiLearned: 0,
        vocabularyLearned: 0,
        flashcardsReviewed: 0,
        quizzesTaken: 0,
        
        // Achievements
        achievements: [],
        
        // Settings
        theme: 'light',
        dailyGoal: 30,
        notificationsEnabled: true
    };
    
    try {
        await setDoc(doc(db, 'users', user.uid), initialData);
        return initialData;
    } catch (error) {
        console.error('Error creating user data:', error);
        return initialData;
    }
}

async function updateUserData(updates) {
    if (!currentUser) return;
    
    try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
            ...updates,
            lastLogin: serverTimestamp()
        });
        
        // Update local data
        userData = { ...userData, ...updates };
        
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

// ============================================
// UI Update Functions
// ============================================

function updateUserProfile(user) {
    const displayName = user.displayName || 'Student';
    const firstName = displayName.split(' ')[0];
    const initial = displayName.charAt(0).toUpperCase();
    
    document.getElementById('userName').textContent = firstName;
    document.getElementById('welcomeName').textContent = firstName;
    document.getElementById('userAvatar').textContent = initial;
}

function updateStats() {
    if (!userData) return;
    
    // Update stat displays
    document.getElementById('streakCount').textContent = userData.streak || 0;
    document.getElementById('userLevel').textContent = userData.level || 1;
    document.getElementById('userXP').textContent = (userData.xp || 0).toLocaleString();
    document.getElementById('lessonsCompleted').textContent = userData.lessonsCompleted || 0;
    document.getElementById('kanjiLearned').textContent = userData.kanjiLearned || 0;
    
    // Update daily goal progress
    const goalProgress = Math.min((userData.todayStudyTime / userData.dailyGoal) * 100, 100);
    document.getElementById('goalText').textContent = `${Math.round(goalProgress)}%`;
    
    const goalCircle = document.getElementById('goalProgress');
    if (goalCircle) {
        const circumference = 339.292;
        const offset = circumference - (goalProgress / 100) * circumference;
        goalCircle.style.strokeDashoffset = offset;
    }
}

// ============================================
// Lessons System
// ============================================

function loadLessons() {
    const lessonsData = [
        {
            id: 1,
            title: 'Hiragana Basics',
            description: 'Master all 46 Hiragana characters with stroke order and pronunciation',
            totalLessons: 12,
            xpReward: 500,
            status: 'completed',
            progress: 100
        },
        {
            id: 2,
            title: 'Katakana Mastery',
            description: 'Learn Katakana for foreign words and modern Japanese',
            totalLessons: 12,
            xpReward: 500,
            status: 'in-progress',
            progress: 75
        },
        {
            id: 3,
            title: 'Basic Kanji (N5)',
            description: '80 essential Kanji characters for JLPT N5 level',
            totalLessons: 20,
            xpReward: 800,
            status: 'in-progress',
            progress: 45
        },
        {
            id: 4,
            title: 'Grammar Foundations',
            description: 'Core sentence structures and particles',
            totalLessons: 15,
            xpReward: 600,
            status: 'available',
            progress: 0
        },
        {
            id: 5,
            title: 'Everyday Vocabulary',
            description: '500 common words and phrases for daily conversation',
            totalLessons: 25,
            xpReward: 1000,
            status: 'locked',
            progress: 0
        },
        {
            id: 6,
            title: 'JLPT N4 Preparation',
            description: 'Intermediate level exam preparation',
            totalLessons: 30,
            xpReward: 1500,
            status: 'locked',
            progress: 0
        }
    ];
    
    const container = document.getElementById('lessonsContainer');
    if (!container) return;
    
    container.innerHTML = lessonsData.map(lesson => `
        <div class="lesson-item ${lesson.status}" data-lesson-id="${lesson.id}">
            <div class="lesson-badge">
                Lesson ${String(lesson.id).padStart(2, '0')} • ${getStatusLabel(lesson.status)}
            </div>
            <h3 class="lesson-title">${lesson.title}</h3>
            <p class="lesson-desc">${lesson.description}</p>
            <div class="lesson-meta">
                <span>${lesson.status === 'locked' ? 'Complete previous lesson to unlock' : `${Math.round((lesson.progress / 100) * lesson.totalLessons)}/${lesson.totalLessons} lessons`}</span>
                <span style="background: var(--accent-gold); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-weight: 600; font-size: 0.875rem;">+${lesson.xpReward} XP</span>
            </div>
            ${lesson.progress > 0 && lesson.progress < 100 ? `
                <div class="lesson-progress-bar">
                    <div class="lesson-progress-fill" style="width: ${lesson.progress}%"></div>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function getStatusLabel(status) {
    const labels = {
        'completed': 'Completed',
        'in-progress': 'In Progress',
        'available': 'Available',
        'locked': 'Locked'
    };
    return labels[status] || status;
}

// ============================================
// Achievements System
// ============================================

function loadAchievements() {
    const achievements = [
        { id: 1, icon: '🌸', name: 'First Steps', unlocked: true },
        { id: 2, icon: '✨', name: 'Hiragana Master', unlocked: true },
        { id: 3, icon: '🔥', name: 'Week Warrior', unlocked: true },
        { id: 4, icon: '⚔️', name: 'Katakana Master', unlocked: false },
        { id: 5, icon: '📜', name: '50 Kanji', unlocked: false },
        { id: 6, icon: '🎌', name: 'Sensei', unlocked: false },
        { id: 7, icon: '💎', name: 'Perfect Week', unlocked: false },
        { id: 8, icon: '🏆', name: 'JLPT N5', unlocked: false },
        { id: 9, icon: '📚', name: 'Bookworm', unlocked: false },
        { id: 10, icon: '⭐', name: 'Level 10', unlocked: false },
        { id: 11, icon: '🎯', name: 'Sharpshooter', unlocked: false },
        { id: 12, icon: '👑', name: 'Master', unlocked: false }
    ];
    
    const container = document.getElementById('achievementsList');
    if (!container) return;
    
    container.innerHTML = achievements.map(ach => `
        <div class="achievement ${ach.unlocked ? 'unlocked' : 'locked'}" title="${ach.name}">
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-name">${ach.name}</div>
        </div>
    `).join('');
}

// ============================================
// Recent Progress
// ============================================

function loadRecentProgress() {
    const recentItems = [
        { title: 'Completed: Hiragana Lesson 12', meta: '2 hours ago', xp: 50 },
        { title: 'Daily Challenge Complete', meta: 'Today', xp: 200 },
        { title: 'Reviewed 25 flashcards', meta: 'Yesterday', xp: 30 },
        { title: 'Completed: Katakana Lesson 9', meta: '2 days ago', xp: 50 }
    ];
    
    const container = document.getElementById('recentProgress');
    if (!container) return;
    
    container.innerHTML = recentItems.map(item => `
        <div class="progress-item">
            <div class="progress-info">
                <div class="progress-title">${item.title}</div>
                <div class="progress-meta">${item.meta}</div>
            </div>
            <div class="progress-xp">+${item.xp} XP</div>
        </div>
    `).join('');
}

// ============================================
// Flashcard System
// ============================================

let flashcardData = [];
let currentCardIndex = 0;
let isFlipped = false;

function loadFlashcards() {
    flashcardData = [
        { front: 'あ', back: 'a', type: 'Hiragana', example: 'あなた (anata) - you' },
        { front: 'い', back: 'i', type: 'Hiragana', example: 'いえ (ie) - house' },
        { front: 'う', back: 'u', type: 'Hiragana', example: 'うみ (umi) - sea' },
        { front: 'え', back: 'e', type: 'Hiragana', example: 'えき (eki) - station' },
        { front: 'お', back: 'o', type: 'Hiragana', example: 'おちゃ (ocha) - tea' }
    ];
    
    updateFlashcard();
    
    // Load decks
    const decks = [
        { name: 'Hiragana', count: 46, active: true },
        { name: 'Katakana', count: 46, active: false },
        { name: 'JLPT N5 Kanji', count: 80, active: false },
        { name: 'Basic Vocabulary', count: 200, active: false }
    ];
    
    const deckGrid = document.getElementById('deckGrid');
    if (deckGrid) {
        deckGrid.innerHTML = decks.map(deck => `
            <div class="deck-item ${deck.active ? 'active' : ''}" data-deck="${deck.name}">
                <div class="deck-name">${deck.name}</div>
                <div class="deck-count">${deck.count} cards</div>
            </div>
        `).join('');
    }
}

function updateFlashcard() {
    if (flashcardData.length === 0) return;
    
    const card = flashcardData[currentCardIndex];
    document.getElementById('cardFront').textContent = card.front;
    document.getElementById('cardBack').textContent = card.back;
    
    const exampleEl = document.querySelector('.card-example');
    if (exampleEl) {
        exampleEl.textContent = `Example: ${card.example}`;
    }
}

function initializeFlashcards() {
    const flashcard = document.getElementById('flashcard');
    const btnFlip = document.getElementById('btnFlip');
    
    const flipCard = () => {
        flashcard.classList.toggle('flipped');
        isFlipped = !isFlipped;
        btnFlip.textContent = isFlipped ? 'Next Card (Space)' : 'Show Answer (Space)';
    };
    
    btnFlip?.addEventListener('click', () => {
        if (!isFlipped) {
            flipCard();
        } else {
            // Go to next card
            currentCardIndex = (currentCardIndex + 1) % flashcardData.length;
            flashcard.classList.remove('flipped');
            isFlipped = false;
            btnFlip.textContent = 'Show Answer (Space)';
            updateFlashcard();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && document.querySelector('#flashcards.active')) {
            e.preventDefault();
            btnFlip?.click();
        }
    });
    
    // Answer buttons
    ['btnAgain', 'btnHard', 'btnGood', 'btnEasy'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', () => {
            // Here you would update the spaced repetition algorithm
            currentCardIndex = (currentCardIndex + 1) % flashcardData.length;
            flashcard.classList.remove('flipped');
            isFlipped = false;
            btnFlip.textContent = 'Show Answer (Space)';
            updateFlashcard();
        });
    });
}

// ============================================
// Pomodoro Timer
// ============================================

let timerInterval = null;
let timeLeft = 25 * 60; // 25 minutes
let isTimerRunning = false;

function initializePomodoroTimer() {
    const modal = document.getElementById('pomodoroModal');
    const openBtn = document.getElementById('studyTimerBtn');
    const closeBtn = document.getElementById('pomodoroClose');
    const startBtn = document.getElementById('timerStart');
    const resetBtn = document.getElementById('timerReset');
    
    openBtn?.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('active');
    });
    
    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.classList.add('hidden');
    });
    
    startBtn?.addEventListener('click', () => {
        if (!isTimerRunning) {
            startTimer();
            startBtn.textContent = 'Pause';
        } else {
            pauseTimer();
            startBtn.textContent = 'Start';
        }
    });
    
    resetBtn?.addEventListener('click', () => {
        resetTimer();
    });
}

function startTimer() {
    isTimerRunning = true;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        updateTimerProgress();
        
        if (timeLeft <= 0) {
            completeTimer();
        }
    }, 1000);
}

function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    pauseTimer();
    timeLeft = 25 * 60;
    updateTimerDisplay();
    updateTimerProgress();
    document.getElementById('timerStart').textContent = 'Start';
}

function completeTimer() {
    pauseTimer();
    alert('🎉 Pomodoro session complete! Great work!');
    
    // Update study time
    if (userData) {
        updateUserData({
            todayStudyTime: (userData.todayStudyTime || 0) + 25,
            totalStudyTime: (userData.totalStudyTime || 0) + 25,
            pomodoroSessions: (userData.pomodoroSessions || 0) + 1
        });
    }
    
    resetTimer();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const timerEl = document.getElementById('timerDisplay');
    if (timerEl) {
        timerEl.textContent = display;
    }
}

function updateTimerProgress() {
    const totalTime = 25 * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    const circumference = 565.487;
    const offset = circumference - (progress / 100) * circumference;
    
    const progressEl = document.getElementById('timerProgress');
    if (progressEl) {
        progressEl.style.strokeDashoffset = offset;
    }
}

// ============================================
// Navigation
// ============================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.dataset.section;
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection)?.classList.add('active');
        });
    });
    
    // Profile dropdown
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    profileBtn?.addEventListener('click', () => {
        profileDropdown?.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.profile-menu')) {
            profileDropdown?.classList.remove('active');
        }
    });
    
    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    });
    
    // Resource tabs
    const resourceTabs = document.querySelectorAll('.resource-tab');
    const resourcePanels = document.querySelectorAll('.resource-panel');
    
    resourceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.dataset.tab;
            
            resourceTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            resourcePanels.forEach(p => p.classList.remove('active'));
            document.querySelector(`[data-panel="${targetPanel}"]`)?.classList.add('active');
        });
    });
}

// ============================================
// Theme Toggle
// ============================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        
        // Update user preferences in Firestore
        if (userData) {
            updateUserData({ theme: newTheme });
        }
    });
}

// ============================================
// Load YouTube Videos
// ============================================

function loadVideos() {
    const videos = [
        { 
            title: 'Japanese Hiragana in 10 Minutes', 
            channel: 'Learn Japanese',
            videoId: 'dQw4w9WgXcQ'  // Replace with actual video IDs
        },
        { 
            title: 'JLPT N5 Grammar Complete Guide', 
            channel: 'Japanese Ammo',
            videoId: 'dQw4w9WgXcQ'
        },
        { 
            title: 'Essential Japanese Phrases', 
            channel: 'JapanesePod101',
            videoId: 'dQw4w9WgXcQ'
        },
        { 
            title: 'Kanji Learning Strategy', 
            channel: 'Matt vs Japan',
            videoId: 'dQw4w9WgXcQ'
        }
    ];
    
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;
    
    videoGrid.innerHTML = videos.map(video => `
        <div class="video-card">
            <div class="video-thumbnail">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${video.videoId}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-meta">${video.channel}</div>
            </div>
        </div>
    `).join('');
}

// ============================================
// Daily Challenge
// ============================================

document.getElementById('dailyChallengeBtn')?.addEventListener('click', () => {
    alert('Daily Challenge feature coming soon! 🎯');
});
