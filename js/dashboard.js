// ========================================
// DASHBOARD JAVASCRIPT - FRESH DESIGN
// ========================================

// Firebase Authentication Check
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        loadUserData(user);
        initializeDashboard(user);
    } else {
        // No user signed in, redirect to login
        window.location.href = 'index.html';
    }
});

// ========================================
// FLOATING JAPANESE CHARACTERS
// ========================================

function createFloatingCharacters() {
    const container = document.getElementById('floatingChars');
    const characters = ['日', '本', '語', '学', '習', 'あ', 'い', 'う', 'え', 'お', 
                       '漢', '字', '勉', '強', '文', '読', '書', '話', '聞', '会',
                       'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ'];
    
    // Create 30 floating characters
    for (let i = 0; i < 30; i++) {
        const char = document.createElement('div');
        char.className = 'floating-char';
        char.textContent = characters[i % characters.length];
        
        // Random positioning
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (15 + Math.random() * 20) + 's';
        char.style.animationDelay = Math.random() * 10 + 's';
        char.style.fontSize = (2 + Math.random() * 2) + 'rem';
        char.style.opacity = 0.1 + Math.random() * 0.2;
        
        container.appendChild(char);
    }
}

// Initialize floating characters on load
createFloatingCharacters();

// ========================================
// USER DATA LOADING
// ========================================

async function loadUserData(user) {
    try {
        const userRef = firebase.firestore().collection('users').doc(user.uid);
        const doc = await userRef.get();
        
        if (doc.exists) {
            const userData = doc.data();
            
            // Update UI with user data
            document.getElementById('userName').textContent = userData.displayName || 'Student';
            document.getElementById('lessonsCount').textContent = userData.lessonsCompleted || 0;
            document.getElementById('xpCount').textContent = userData.xp || 0;
            document.getElementById('streakCount').textContent = userData.streak || 0;
            document.getElementById('kanjiCount').textContent = userData.kanjiLearned || 0;
            
            // Update progress bars based on user data
            updateProgressBars(userData);
        } else {
            // Create new user document with default values
            await userRef.set({
                displayName: user.displayName || 'Student',
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                level: 1,
                xp: 0,
                streak: 0,
                lessonsCompleted: 0,
                kanjiLearned: 0,
                totalStudyTime: 0,
                achievements: [],
                theme: 'dark'
            });
            
            // Set default values in UI
            document.getElementById('userName').textContent = user.displayName || 'Student';
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

function updateProgressBars(userData) {
    // Calculate progress for each track (placeholder logic)
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        // You can customize this based on actual user progress data
        const progress = (userData.lessonsCompleted || 0) * 5; // Example calculation
        bar.style.width = Math.min(progress, 100) + '%';
    });
}

// ========================================
// INITIALIZE DASHBOARD
// ========================================

function initializeDashboard(user) {
    // Setup logout button
    document.getElementById('logoutBtn').addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().signOut();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    });

    // Setup YouTube search
    setupYouTubeSearch();

    // Setup popular class cards
    setupClassCards();

    // Setup learning track buttons
    setupTrackButtons();
}

// ========================================
// YOUTUBE SEARCH FUNCTIONALITY
// ========================================

function setupYouTubeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('youtubeSearch');

    // Search on button click
    searchBtn.addEventListener('click', () => {
        performYouTubeSearch();
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performYouTubeSearch();
        }
    });
}

function performYouTubeSearch() {
    const searchInput = document.getElementById('youtubeSearch');
    const query = searchInput.value.trim();
    
    if (query) {
        // Open YouTube search in new tab
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' japanese learning')}`;
        window.open(searchUrl, '_blank');
        
        // Optional: Log search for analytics
        logUserActivity('youtube_search', { query: query });
    }
}

// ========================================
// POPULAR CLASS CARDS
// ========================================

function setupClassCards() {
    const classCards = document.querySelectorAll('.class-card');
    
    classCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video-id');
            if (videoId) {
                // Open YouTube video in new tab
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                window.open(videoUrl, '_blank');
                
                // Log video click for analytics
                const videoTitle = card.querySelector('.class-title').textContent;
                logUserActivity('video_click', { 
                    videoId: videoId,
                    title: videoTitle 
                });
            }
        });
    });
}

// ========================================
// LEARNING TRACK BUTTONS
// ========================================

function setupTrackButtons() {
    const trackButtons = document.querySelectorAll('.track-btn');
    
    trackButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const trackCard = e.target.closest('.track-card');
            const trackTitle = trackCard.querySelector('h3').textContent;
            
            // For now, show alert (you can implement actual lesson pages later)
            alert(`Starting: ${trackTitle}\n\nLesson content coming soon! 📚`);
            
            // Log track start
            logUserActivity('track_started', { track: trackTitle });
        });
    });
}

// ========================================
// ANALYTICS & LOGGING
// ========================================

async function logUserActivity(activityType, data) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    try {
        await firebase.firestore().collection('activity_logs').add({
            userId: user.uid,
            activityType: activityType,
            data: data,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error logging activity:', error);
    }
}

// ========================================
// UPDATE USER PROGRESS (Helper Functions)
// ========================================

async function updateUserProgress(updates) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    try {
        const userRef = firebase.firestore().collection('users').doc(user.uid);
        await userRef.update(updates);
        
        // Reload user data to update UI
        const doc = await userRef.get();
        if (doc.exists) {
            const userData = doc.data();
            document.getElementById('lessonsCount').textContent = userData.lessonsCompleted || 0;
            document.getElementById('xpCount').textContent = userData.xp || 0;
            document.getElementById('streakCount').textContent = userData.streak || 0;
            document.getElementById('kanjiCount').textContent = userData.kanjiLearned || 0;
        }
    } catch (error) {
        console.error('Error updating progress:', error);
    }
}

// Example usage:
// updateUserProgress({ xp: firebase.firestore.FieldValue.increment(10) });
// updateUserProgress({ lessonsCompleted: firebase.firestore.FieldValue.increment(1) });

// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// WELCOME MESSAGE BASED ON TIME
// ========================================

function updateWelcomeMessage() {
    const hour = new Date().getHours();
    const badge = document.querySelector('.welcome-badge');
    
    if (hour < 12) {
        badge.textContent = '☀️ Good Morning';
    } else if (hour < 18) {
        badge.textContent = '🌤️ Good Afternoon';
    } else {
        badge.textContent = '🌙 Good Evening';
    }
}

// Update welcome message on load
updateWelcomeMessage();

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('youtubeSearch').focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        document.getElementById('youtubeSearch').value = '';
        document.getElementById('youtubeSearch').blur();
    }
});

// ========================================
// CONSOLE LOG (Development)
// ========================================

console.log(`
╔════════════════════════════════════════╗
║  Japanese Learning Platform Dashboard  ║
║  Fresh Design - Phase 4                ║
║  © 2026 Pradeep Terupalli             ║
╚════════════════════════════════════════╝

Features:
✅ Floating Japanese characters
✅ YouTube search integration
✅ Popular classes with direct links
✅ Learning track system
✅ Real-time user progress
✅ Firebase authentication

がんばってください! 🎌
`);
