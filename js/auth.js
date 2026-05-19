// Authentication Module
import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// DOM Elements
const modal = document.getElementById('authModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

// Modal triggers
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const ctaStart = document.getElementById('ctaStart');
const ctaFinal = document.getElementById('ctaFinal');

// Form elements
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const googleRegisterBtn = document.getElementById('googleRegisterBtn');

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// ============================================
// Auth State Observer
// ============================================

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
});

// ============================================
// Modal Functions
// ============================================

function openModal(showRegister = false) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (showRegister) {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    } else {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Event Listeners
// ============================================

// Modal triggers
loginBtn?.addEventListener('click', () => openModal(false));
registerBtn?.addEventListener('click', () => openModal(true));
ctaStart?.addEventListener('click', () => openModal(true));
ctaFinal?.addEventListener('click', () => openModal(true));

// Close modal
modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);

// Switch between forms
switchToRegister?.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

switchToLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// ============================================
// Authentication Functions
// ============================================

// Email/Password Registration
registerFormElement?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile with display name
        await updateProfile(userCredential.user, {
            displayName: name
        });
        
        // Create user document in Firestore (will be handled in dashboard.js)
        console.log('User registered successfully');
        
    } catch (error) {
        console.error('Registration error:', error);
        alert(getErrorMessage(error.code));
    }
});

// Email/Password Login
loginFormElement?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in successfully');
        
    } catch (error) {
        console.error('Login error:', error);
        alert(getErrorMessage(error.code));
    }
});

// Google Sign In
googleLoginBtn?.addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        console.log('Google sign in successful');
        
    } catch (error) {
        console.error('Google sign in error:', error);
        alert(getErrorMessage(error.code));
    }
});

googleRegisterBtn?.addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        console.log('Google sign up successful');
        
    } catch (error) {
        console.error('Google sign up error:', error);
        alert(getErrorMessage(error.code));
    }
});

// ============================================
// Error Messages
// ============================================

function getErrorMessage(code) {
    const errors = {
        'auth/email-already-in-use': 'This email is already registered. Please login instead.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed.',
        'auth/cancelled-popup-request': 'Sign-in was cancelled.'
    };
    
    return errors[code] || 'An error occurred. Please try again.';
}

// ============================================
// Escape key to close modal
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
