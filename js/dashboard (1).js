// ========================================
// DASHBOARD JAVASCRIPT - FRESH DESIGN
// ========================================

// ========================================
// VIDEO DATABASE - DEFINED FIRST
// ========================================

// Verified, fresh YouTube videos organized by level (as of May 2026)
const VIDEO_DATABASE = {
    beginner: [
        {
            id: 'r2nBQGLHqqU',
            title: 'Learn ALL Hiragana in 1 Hour - How to Write and Read Japanese',
            channel: 'JapanesePod101',
            tags: ['Beginner', 'Hiragana', 'Writing'],
            level: 1
        },
        {
            id: '6p9Il_j0zjc',
            title: 'Learn ALL Katakana in 1 Hour - How to Write and Read Japanese',
            channel: 'JapanesePod101',
            tags: ['Beginner', 'Katakana', 'Writing'],
            level: 1
        },
        {
            id: 'bcdYKxHT8kY',
            title: '100 Phrases Every Japanese Beginner Must Know',
            channel: 'JapanesePod101',
            tags: ['Beginner', 'Phrases', 'Conversation'],
            level: 1
        },
        {
            id: 'bOUqVC4XPjQ',
            title: 'Japanese for Absolute Beginners - The Complete Course',
            channel: 'Learn Japanese with JapanesePod101.com',
            tags: ['Beginner', 'Full Course', 'Grammar'],
            level: 1
        },
        {
            id: 'bceijiy90rU',
            title: 'Learn Japanese While You Sleep - 130 Basic Phrases',
            channel: 'Eko Languages',
            tags: ['Beginner', 'Vocabulary', 'Listening'],
            level: 1
        },
        {
            id: 'sjv4V4SS4ZA',
            title: 'Japanese Pronunciation for Beginners',
            channel: 'Dogen',
            tags: ['Beginner', 'Pronunciation', 'Speaking'],
            level: 1
        }
    ],
    intermediate: [
        {
            id: 'wD3FJgij79c',
            title: 'JLPT N5 Complete Course - Grammar + Vocabulary',
            channel: 'ToKini Andy',
            tags: ['JLPT N5', 'Grammar', 'Vocabulary'],
            level: 2
        },
        {
            id: 'Ejc9LJBNqZs',
            title: 'Learn 100 Essential Kanji for JLPT N5',
            channel: 'Japanese Ammo with Misa',
            tags: ['Kanji', 'JLPT N5', 'Reading'],
            level: 2
        },
        {
            id: 'GN7iJKAL9qo',
            title: 'Japanese Conversation Practice - 500 Sentences',
            channel: 'Kendra\'s Language School',
            tags: ['Conversation', 'Listening', 'Speaking'],
            level: 2
        },
        {
            id: 'XI92WgOByEY',
            title: 'Japanese Grammar - て Form Complete Guide',
            channel: 'Japanese Ammo with Misa',
            tags: ['Grammar', 'て-form', 'Intermediate'],
            level: 2
        },
        {
            id: 'Mcbz2O2GZnQ',
            title: 'Real Japanese - Native Conversations with Subtitles',
            channel: 'Comprehensible Japanese',
            tags: ['Listening', 'Conversation', 'Native'],
            level: 2
        },
        {
            id: 'oVPJJw1WIlM',
            title: 'Japanese Particles Explained - Complete Guide',
            channel: 'ToKini Andy',
            tags: ['Grammar', 'Particles', 'は・が・を'],
            level: 2
        }
    ],
    advanced: [
        {
            id: 's6DKRgtVLtw',
            title: 'Advanced Japanese Conversation - Business Japanese',
            channel: 'Japanese Ammo with Misa',
            tags: ['Advanced', 'Business', 'Conversation'],
            level: 3
        },
        {
            id: 'DlgR51OjJlY',
            title: 'JLPT N4 Full Course - All Grammar Points',
            channel: 'ToKini Andy',
            tags: ['JLPT N4', 'Grammar', 'Advanced'],
            level: 3
        },
        {
            id: 'JWmMPI-fKd8',
            title: 'Japanese News Podcast - Easy Japanese',
            channel: 'Easy Japanese',
            tags: ['News', 'Listening', 'Advanced'],
            level: 3
        },
        {
            id: 'nqJ5wU4FamA',
            title: 'Keigo - Japanese Honorific Language',
            channel: 'That Japanese Man Yuta',
            tags: ['Keigo', 'Honorifics', 'Polite'],
            level: 3
        },
        {
            id: 'BE7a6dQZsxU',
            title: 'Native Japanese Podcast - Slow and Clear',
            channel: 'Nihongo con Teppei',
            tags: ['Podcast', 'Native', 'Listening'],
            level: 3
        },
        {
            id: 'Av0Twd8xb5U',
            title: 'Japanese Anime without Subtitles - Practice Listening',
            channel: 'Anime Sensei',
            tags: ['Anime', 'Listening', 'Entertainment'],
            level: 3
        }
    ]
};

// Initialize floating characters immediately
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    createFloatingCharacters();
    setupYouTubeSearch();
    setupTrackButtons();
    updateWelcomeMessage();
    setupKeyboardShortcuts();
    setupSmoothScrolling();
    
    // Load beginner videos immediately as fallback
    console.log('Loading initial beginner videos...');
    loadRecommendedVideos(1);
    
    // Backup: Try loading videos again after 2 seconds if container is still empty
    setTimeout(() => {
        const container = document.getElementById('videoRecommendations');
        if (container && container.children.length === 0) {
            console.log('Videos not loaded yet, retrying...');
            loadRecommendedVideos(1);
        }
    }, 2000);
});

// Firebase Authentication Check
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        loadUserData(user);
        setupLogout();
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
            
            // Load recommended videos based on user level
            const userLevel = userData.level || 1;
            loadRecommendedVideos(userLevel);
            
            console.log('User data loaded. Level:', userLevel);
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
            
            // Load beginner videos for new users
            loadRecommendedVideos(1);
            
            console.log('New user created. Starting with beginner videos.');
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        // Load default beginner videos on error
        loadRecommendedVideos(1);
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
// LOGOUT FUNCTIONALITY
// ========================================

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await firebase.auth().signOut();
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Logout error:', error);
            }
        });
    }
}

// ========================================
// YOUTUBE SEARCH FUNCTIONALITY
// ========================================

function setupYouTubeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('youtubeSearch');

    if (!searchBtn || !searchInput) {
        console.log('Search elements not found yet');
        return;
    }

    // Search on button click
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performYouTubeSearch();
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performYouTubeSearch();
        }
    });

    console.log('YouTube search initialized');
}

function performYouTubeSearch() {
    const searchInput = document.getElementById('youtubeSearch');
    const query = searchInput.value.trim();
    
    console.log('Search triggered with query:', query);
    
    if (query) {
        // Open YouTube search in new tab with EXACT user query
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        console.log('Opening URL:', searchUrl);
        window.open(searchUrl, '_blank');
        
        // Optional: Log search for analytics
        const user = firebase.auth().currentUser;
        if (user) {
            logUserActivity('youtube_search', { query: query });
        }
    } else {
        console.log('Empty search query');
    }
}

// ========================================
// POPULAR CLASS CARDS
// ========================================

function loadRecommendedVideos(userLevel = 1) {
    console.log('=== loadRecommendedVideos called with level:', userLevel);
    
    const container = document.getElementById('videoRecommendations');
    const noteElement = document.getElementById('recommendationNote');
    
    console.log('Container found:', !!container);
    console.log('Note element found:', !!noteElement);
    
    if (!container) {
        console.error('videoRecommendations container not found!');
        return;
    }
    
    // Determine which videos to show based on user level
    let videosToShow = [];
    let levelText = '';
    
    if (userLevel === 1) {
        videosToShow = VIDEO_DATABASE.beginner.slice(0, 6);
        levelText = 'Perfect for beginners! Start your Japanese journey here 🌱';
    } else if (userLevel === 2 || userLevel === 3) {
        videosToShow = VIDEO_DATABASE.intermediate.slice(0, 6);
        levelText = 'Building your skills! These videos match your progress 📈';
    } else {
        videosToShow = VIDEO_DATABASE.advanced.slice(0, 6);
        levelText = 'Advanced content for serious learners! 🚀';
    }
    
    console.log('Videos to show:', videosToShow.length);
    
    // Update recommendation note
    if (noteElement) {
        noteElement.textContent = levelText;
        noteElement.style.display = 'inline-block';
    }
    
    // Create grid
    const grid = document.createElement('div');
    grid.className = 'classes-grid';
    
    // Generate video cards
    videosToShow.forEach((video, index) => {
        console.log(`Creating card ${index + 1}:`, video.title);
        const card = createVideoCard(video);
        grid.appendChild(card);
    });
    
    container.innerHTML = '';
    container.appendChild(grid);
    
    console.log('Grid appended to container');
    
    // Re-setup click handlers for new cards
    setupClassCards();
    
    console.log(`✅ Loaded ${videosToShow.length} videos for level ${userLevel}`);
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.setAttribute('data-video-id', video.id);
    
    card.innerHTML = `
        <div class="class-thumbnail">
            <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" 
                 alt="${video.title}"
                 onerror="this.src='https://img.youtube.com/vi/${video.id}/hqdefault.jpg'">
            <div class="play-overlay">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="rgba(193, 39, 45, 0.9)"/>
                    <path d="M23 18l20 12-20 12V18z" fill="white"/>
                </svg>
            </div>
        </div>
        <div class="class-info">
            <h3 class="class-title">${video.title}</h3>
            <p class="class-channel">${video.channel}</p>
            <div class="class-tags">
                ${video.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

function setupClassCards() {
    const classCards = document.querySelectorAll('.class-card');
    
    if (classCards.length === 0) {
        console.log('No class cards found yet');
        return;
    }

    console.log('Setting up', classCards.length, 'class cards');
    
    classCards.forEach((card, index) => {
        // Remove existing listeners by cloning
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        newCard.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = newCard.getAttribute('data-video-id');
            console.log('Card clicked:', index, 'Video ID:', videoId);
            
            if (videoId) {
                // Open YouTube video in new tab
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                console.log('Opening video URL:', videoUrl);
                window.open(videoUrl, '_blank');
                
                // Log video click for analytics
                const user = firebase.auth().currentUser;
                if (user) {
                    const videoTitle = newCard.querySelector('.class-title').textContent;
                    logUserActivity('video_click', { 
                        videoId: videoId,
                        title: videoTitle 
                    });
                }
            } else {
                console.log('No video ID found on card');
            }
        });
    });

    console.log('Class cards initialized successfully');
}

// ========================================
// LEARNING TRACK BUTTONS
// ========================================

function setupTrackButtons() {
    const trackButtons = document.querySelectorAll('.track-btn');
    
    if (trackButtons.length === 0) {
        console.log('No track buttons found yet');
        return;
    }

    console.log('Setting up', trackButtons.length, 'track buttons');
    
    // Map of track titles to lesson pages - ALL NOW READY!
    const lessonMap = {
        'Hiragana Basics': 'lesson-hiragana.html',
        'Katakana Basics': 'lesson-katakana.html',
        'Essential Kanji': 'lesson-kanji.html',
        'Basic Grammar': 'lesson-grammar.html',
        'Vocabulary Builder': 'lesson-vocabulary.html',
        'JLPT N4 Prep': 'lesson-jlpt-n4.html'
    };
    
    trackButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const trackCard = e.target.closest('.track-card');
            const trackTitle = trackCard.querySelector('h3').textContent;
            
            console.log('Track clicked:', trackTitle);
            
            // Get lesson page
            const lessonPage = lessonMap[trackTitle];
            
            if (lessonPage) {
                // All lessons are ready! Navigate directly
                window.location.href = lessonPage;
            } else {
                // Fallback for any unmapped lessons
                alert(`${trackTitle}\n\nLesson not found. Please check the file structure.`);
            }
            
            // Log track start
            const user = firebase.auth().currentUser;
            if (user) {
                logUserActivity('track_started', { track: trackTitle });
            }
        });
    });

    console.log('Track buttons initialized - ALL 6 LESSONS READY!');
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

function setupSmoothScrolling() {
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
}

// ========================================
// WELCOME MESSAGE BASED ON TIME
// ========================================

function updateWelcomeMessage() {
    const hour = new Date().getHours();
    const badge = document.querySelector('.welcome-badge');
    
    if (badge) {
        if (hour < 12) {
            badge.textContent = '☀️ Good Morning';
        } else if (hour < 18) {
            badge.textContent = '🌤️ Good Afternoon';
        } else {
            badge.textContent = '🌙 Good Evening';
        }
    }
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('youtubeSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('youtubeSearch');
            if (searchInput) {
                searchInput.value = '';
                searchInput.blur();
            }
        }
    });
}

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
