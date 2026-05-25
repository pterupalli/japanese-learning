// ============================================================
// DASHBOARD.JS — 日本語道
// ============================================================

// ── Video Database ────────────────────────────────────────────

const VIDEO_DATABASE = {
    beginner: [
        { id: 'r2nBQGLHqqU', title: 'Learn ALL Hiragana in 1 Hour',                    channel: 'JapanesePod101',                     tags: ['Beginner', 'Hiragana', 'Writing'],        level: 1 },
        { id: '6p9Il_j0zjc', title: 'Learn ALL Katakana in 1 Hour',                    channel: 'JapanesePod101',                     tags: ['Beginner', 'Katakana', 'Writing'],        level: 1 },
        { id: 'bcdYKxHT8kY', title: '100 Phrases Every Japanese Beginner Must Know',   channel: 'JapanesePod101',                     tags: ['Beginner', 'Phrases', 'Conversation'],   level: 1 },
        { id: 'bOUqVC4XPjQ', title: 'Japanese for Absolute Beginners — Full Course',   channel: 'JapanesePod101',                     tags: ['Beginner', 'Full Course', 'Grammar'],    level: 1 },
        { id: 'bceijiy90rU', title: 'Learn Japanese While You Sleep — 130 Phrases',    channel: 'Eko Languages',                      tags: ['Beginner', 'Vocabulary', 'Listening'],   level: 1 },
        { id: 'sjv4V4SS4ZA', title: 'Japanese Pronunciation for Beginners',             channel: 'Dogen',                              tags: ['Beginner', 'Pronunciation', 'Speaking'], level: 1 }
    ],
    intermediate: [
        { id: 'wD3FJgij79c', title: 'JLPT N5 Complete Course — Grammar + Vocabulary',  channel: 'ToKini Andy',                        tags: ['JLPT N5', 'Grammar', 'Vocabulary'],      level: 2 },
        { id: 'Ejc9LJBNqZs', title: 'Learn 100 Essential Kanji for JLPT N5',           channel: 'Japanese Ammo with Misa',            tags: ['Kanji', 'JLPT N5', 'Reading'],           level: 2 },
        { id: 'GN7iJKAL9qo', title: 'Japanese Conversation Practice — 500 Sentences',  channel: "Kendra's Language School",           tags: ['Conversation', 'Listening', 'Speaking'], level: 2 },
        { id: 'XI92WgOByEY', title: 'Japanese Grammar — て Form Complete Guide',        channel: 'Japanese Ammo with Misa',            tags: ['Grammar', 'て-form', 'Intermediate'],    level: 2 },
        { id: 'Mcbz2O2GZnQ', title: 'Real Japanese — Native Conversations',             channel: 'Comprehensible Japanese',            tags: ['Listening', 'Conversation', 'Native'],   level: 2 },
        { id: 'oVPJJw1WIlM', title: 'Japanese Particles Explained — Complete Guide',    channel: 'ToKini Andy',                        tags: ['Grammar', 'Particles', 'は・が・を'],   level: 2 }
    ],
    advanced: [
        { id: 's6DKRgtVLtw', title: 'Advanced Japanese — Business Conversation',        channel: 'Japanese Ammo with Misa',            tags: ['Advanced', 'Business', 'Conversation'],  level: 3 },
        { id: 'DlgR51OjJlY', title: 'JLPT N4 Full Course — All Grammar Points',        channel: 'ToKini Andy',                        tags: ['JLPT N4', 'Grammar', 'Advanced'],        level: 3 },
        { id: 'JWmMPI-fKd8', title: 'Japanese News Podcast — Easy Japanese',            channel: 'Easy Japanese',                      tags: ['News', 'Listening', 'Advanced'],         level: 3 },
        { id: 'nqJ5wU4FamA', title: 'Keigo — Japanese Honorific Language',              channel: 'That Japanese Man Yuta',             tags: ['Keigo', 'Honorifics', 'Polite'],         level: 3 },
        { id: 'BE7a6dQZsxU', title: 'Native Japanese Podcast — Slow and Clear',         channel: 'Nihongo con Teppei',                 tags: ['Podcast', 'Native', 'Listening'],        level: 3 },
        { id: 'Av0Twd8xb5U', title: 'Japanese Anime Without Subtitles — Listening',    channel: 'Anime Sensei',                       tags: ['Anime', 'Listening', 'Entertainment'],   level: 3 }
    ]
};

// ── Track → lesson page map ───────────────────────────────────

const LESSON_MAP = {
    'Hiragana Basics':   'lesson-hiragana.html',
    'Katakana Basics':   'lesson-katakana.html',
    'Essential Kanji':   'lesson-kanji.html',
    'Basic Grammar':     'lesson-grammar.html',
    'Vocabulary Builder':'lesson-vocabulary.html',
    'JLPT N4 Prep':      'lesson-jlpt-n4.html'
};

// ── XP thresholds per track (for accurate progress bars) ─────

const TRACK_XP = {
    hiragana:   { field: 'xp',              max: 500  },
    katakana:   { field: 'xp',              max: 1000 },
    kanji:      { field: 'kanjiLearned',    max: 80   },
    grammar:    { field: 'lessonsCompleted',max: 6    },
    vocabulary: { field: 'vocabLearned',    max: 100  },
    jlpt:       { field: 'xp',              max: 7000 }
};

// ── Floating background characters ───────────────────────────

function createFloatingCharacters() {
    const container = document.getElementById('floatingChars');
    if (!container) return;

    const chars = [
        '日','本','語','学','習','あ','い','う','え','お',
        '漢','字','勉','強','文','読','書','話','聞','会',
        'か','き','く','け','こ','さ','し','す','せ','そ'
    ];

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 30; i++) {
        const el = document.createElement('div');
        el.className = 'floating-char';
        el.textContent = chars[i % chars.length];
        el.style.cssText = [
            `left:${Math.random() * 100}%`,
            `animation-duration:${15 + Math.random() * 20}s`,
            `animation-delay:${Math.random() * 10}s`,
            `font-size:${2 + Math.random() * 2}rem`,
            `opacity:${(0.08 + Math.random() * 0.15).toFixed(2)}`
        ].join(';');
        fragment.appendChild(el);
    }
    container.appendChild(fragment);
}

// ── Firebase auth + data ──────────────────────────────────────

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        loadUserData(user);
        setupLogout();
    } else {
        window.location.href = 'index.html';
    }
});

async function loadUserData(user) {
    const userRef = firebase.firestore().collection('users').doc(user.uid);

    try {
        const doc = await userRef.get();

        if (doc.exists) {
            const d = doc.data();

            setEl('userName',     d.displayName     || 'Student');
            setEl('lessonsCount', d.lessonsCompleted || 0);
            setEl('xpCount',      d.xp               || 0);
            setEl('streakCount',  d.streak            || 0);
            setEl('kanjiCount',   d.kanjiLearned      || 0);

            updateProgressBars(d);
            loadRecommendedVideos(d.level || 1);
        } else {
            // First-time user — create document
            const defaults = {
                displayName:      user.displayName || 'Student',
                email:            user.email,
                createdAt:        firebase.firestore.FieldValue.serverTimestamp(),
                level:            1,
                xp:               0,
                streak:           0,
                lessonsCompleted: 0,
                kanjiLearned:     0,
                vocabLearned:     0,
                totalStudyTime:   0,
                achievements:     [],
                theme:            'dark'
            };
            await userRef.set(defaults);
            setEl('userName', defaults.displayName);
            loadRecommendedVideos(1);
        }
    } catch (err) {
        console.error('[Dashboard] loadUserData failed:', err);
        loadRecommendedVideos(1);
    }
}

// ── Progress bars — per-track logic ──────────────────────────

function updateProgressBars(userData) {
    // Expects bars to have data-track attribute matching TRACK_XP keys
    document.querySelectorAll('.progress-fill[data-track]').forEach(bar => {
        const key   = bar.dataset.track;
        const cfg   = TRACK_XP[key];
        if (!cfg) return;

        const value    = Number(userData[cfg.field] || 0);
        const pct      = Math.min(Math.round((value / cfg.max) * 100), 100);
        bar.style.width = pct + '%';
        bar.setAttribute('aria-valuenow', pct);
    });

    // Fallback: bare .progress-fill bars without data-track
    // distribute xp-based pct evenly (coarse, better than nothing)
    document.querySelectorAll('.progress-fill:not([data-track])').forEach(bar => {
        const pct = Math.min(Math.round(((userData.xp || 0) / 500) * 20), 100);
        bar.style.width = pct + '%';
    });
}

// ── Logout ────────────────────────────────────────────────────

function setupLogout() {
    const btn = document.getElementById('logoutBtn');
    if (!btn) return;
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().signOut();
            window.location.href = 'index.html';
        } catch (err) {
            console.error('[Dashboard] logout failed:', err);
        }
    });
}

// ── YouTube search ────────────────────────────────────────────

function setupYouTubeSearch() {
    const btn   = document.getElementById('searchBtn');
    const input = document.getElementById('youtubeSearch');
    if (!btn || !input) return;

    const search = () => {
        const q = input.value.trim();
        if (!q) return;
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, '_blank');
        logActivity('youtube_search', { query: q });
    };

    btn.addEventListener('click', (e) => { e.preventDefault(); search(); });
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); search(); } });
}

// ── Recommended videos ────────────────────────────────────────

function loadRecommendedVideos(level = 1) {
    const container  = document.getElementById('videoRecommendations');
    const noteEl     = document.getElementById('recommendationNote');
    if (!container) return;

    let pool, note;
    if (level === 1) {
        pool = VIDEO_DATABASE.beginner;
        note = 'Perfect for beginners — start your Japanese journey here 🌱';
    } else if (level <= 3) {
        pool = VIDEO_DATABASE.intermediate;
        note = 'Building your skills — these match your current level 📈';
    } else {
        pool = VIDEO_DATABASE.advanced;
        note = 'Advanced content for serious learners 🚀';
    }

    if (noteEl) { noteEl.textContent = note; noteEl.style.display = 'inline-block'; }

    const grid = document.createElement('div');
    grid.className = 'classes-grid';
    pool.slice(0, 6).forEach(v => grid.appendChild(createVideoCard(v)));

    container.innerHTML = '';
    container.appendChild(grid);

    // Single delegated click handler — no cloneNode needed
    grid.addEventListener('click', (e) => {
        const card    = e.target.closest('.class-card');
        if (!card) return;
        const videoId = card.dataset.videoId;
        if (!videoId) return;
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        const title = card.querySelector('.class-title')?.textContent || '';
        logActivity('video_click', { videoId, title });
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.dataset.videoId = video.id;
    card.innerHTML = `
        <div class="class-thumbnail">
            <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg"
                 alt="${escHtml(video.title)}"
                 onerror="this.src='https://img.youtube.com/vi/${video.id}/hqdefault.jpg'">
            <div class="play-overlay">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
                    <circle cx="30" cy="30" r="30" fill="rgba(193,39,45,0.9)"/>
                    <path d="M23 18l20 12-20 12V18z" fill="white"/>
                </svg>
            </div>
        </div>
        <div class="class-info">
            <h3 class="class-title">${escHtml(video.title)}</h3>
            <p class="class-channel">${escHtml(video.channel)}</p>
            <div class="class-tags">${video.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}</div>
        </div>
    `;
    return card;
}

// ── Track buttons ─────────────────────────────────────────────

function setupTrackButtons() {
    document.querySelectorAll('.track-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card  = e.target.closest('.track-card');
            const title = card?.querySelector('h3')?.textContent?.trim();
            const page  = LESSON_MAP[title];

            if (page) {
                logActivity('track_started', { track: title });
                window.location.href = page;
            } else {
                console.warn('[Dashboard] No lesson page mapped for track:', title);
            }
        });
    });
}

// ── Welcome greeting ──────────────────────────────────────────

function updateWelcomeMessage() {
    const h    = new Date().getHours();
    const text = h < 12 ? '☀️ Good Morning' : h < 18 ? '🌤️ Good Afternoon' : '🌙 Good Evening';
    const el   = document.querySelector('.welcome-badge');
    if (el) el.textContent = text;
}

// ── Keyboard shortcuts ────────────────────────────────────────

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('youtubeSearch')?.focus();
        }
        if (e.key === 'Escape') {
            const s = document.getElementById('youtubeSearch');
            if (s) { s.value = ''; s.blur(); }
        }
    });
}

// ── Smooth scrolling ──────────────────────────────────────────

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(a.getAttribute('href'))
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ── Analytics helper ──────────────────────────────────────────

async function logActivity(type, data) {
    const user = firebase.auth().currentUser;
    if (!user) return;
    try {
        await firebase.firestore().collection('activity_logs').add({
            userId:       user.uid,
            activityType: type,
            data,
            timestamp:    firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (_) { /* non-critical, swallow */ }
}

// ── Progress update helper (call from lesson pages) ───────────

async function updateUserProgress(updates) {
    const user = firebase.auth().currentUser;
    if (!user) return;
    const ref = firebase.firestore().collection('users').doc(user.uid);
    try {
        await ref.update(updates);
        const doc = await ref.get();
        if (doc.exists) {
            const d = doc.data();
            setEl('lessonsCount', d.lessonsCompleted || 0);
            setEl('xpCount',      d.xp               || 0);
            setEl('streakCount',  d.streak            || 0);
            setEl('kanjiCount',   d.kanjiLearned      || 0);
        }
    } catch (err) {
        console.error('[Dashboard] updateUserProgress failed:', err);
    }
}

// ── Utilities ─────────────────────────────────────────────────

function setEl(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ── Init ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    createFloatingCharacters();
    setupYouTubeSearch();
    setupTrackButtons();
    updateWelcomeMessage();
    setupKeyboardShortcuts();
    setupSmoothScrolling();
    loadRecommendedVideos(1); // shown immediately; overwritten once user data loads
});
