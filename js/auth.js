// ============================================================
// AUTH.JS — Authentication
// Depends on: firebase-config.js (exports auth)
// ============================================================

import { auth } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// ── Element refs ──────────────────────────────────────────────

const modal         = document.getElementById('authModal');
const modalOverlay  = document.getElementById('modalOverlay');
const modalClose    = document.getElementById('modalClose');
const loginForm     = document.getElementById('loginForm');
const registerForm  = document.getElementById('registerForm');
const loginFormEl   = document.getElementById('loginFormElement');
const registerFormEl= document.getElementById('registerFormElement');
const googleLoginBtn    = document.getElementById('googleLoginBtn');
const googleRegisterBtn = document.getElementById('googleRegisterBtn');

const googleProvider = new GoogleAuthProvider();

// ── Auth state ────────────────────────────────────────────────

onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = 'dashboard.html';
});

// ── Modal helpers ─────────────────────────────────────────────

function openModal(showRegister = false) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    loginForm?.classList.toggle('hidden', showRegister);
    registerForm?.classList.toggle('hidden', !showRegister);
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    _clearErrors();
}

// ── Button loading state ──────────────────────────────────────

function _setLoading(btn, loading, originalText) {
    if (!btn) return;
    btn.disabled    = loading;
    btn.textContent = loading ? 'Please wait...' : originalText;
}

// ── Event wiring ──────────────────────────────────────────────

document.getElementById('loginBtn')    ?.addEventListener('click', () => openModal(false));
document.getElementById('registerBtn') ?.addEventListener('click', () => openModal(true));
document.getElementById('ctaStart')    ?.addEventListener('click', () => openModal(true));
document.getElementById('ctaFinal')    ?.addEventListener('click', () => openModal(true));

modalClose  ?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);

document.getElementById('switchToRegister')?.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm?.classList.add('hidden');
    registerForm?.classList.remove('hidden');
    _clearErrors();
});

document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm?.classList.add('hidden');
    loginForm?.classList.remove('hidden');
    _clearErrors();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
});

// ── Email / password register ─────────────────────────────────

registerFormEl?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = registerFormEl.querySelector('[type="submit"]');
    const original  = submitBtn?.textContent || 'Create Account';
    _setLoading(submitBtn, true, original);
    _clearErrors();

    const name     = document.getElementById('registerName')?.value.trim();
    const email    = document.getElementById('registerEmail')?.value.trim();
    const password = document.getElementById('registerPassword')?.value;

    if (!name || name.length < 2) {
        _showError('registerName', 'Please enter your name (at least 2 characters).');
        _setLoading(submitBtn, false, original);
        return;
    }

    try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        // onAuthStateChanged will redirect to dashboard
    } catch (err) {
        _showFormError(registerFormEl, _errorMsg(err.code));
        _setLoading(submitBtn, false, original);
    }
});

// ── Email / password login ────────────────────────────────────

loginFormEl?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = loginFormEl.querySelector('[type="submit"]');
    const original  = submitBtn?.textContent || 'Sign In';
    _setLoading(submitBtn, true, original);
    _clearErrors();

    const email    = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged redirects
    } catch (err) {
        _showFormError(loginFormEl, _errorMsg(err.code));
        _setLoading(submitBtn, false, original);
    }
});

// ── Google sign-in ────────────────────────────────────────────

async function _googleSignIn(btn) {
    const original = btn?.textContent || 'Continue with Google';
    _setLoading(btn, true, original);
    try {
        await signInWithPopup(auth, googleProvider);
        // redirect handled by onAuthStateChanged
    } catch (err) {
        if (err.code !== 'auth/popup-closed-by-user' &&
            err.code !== 'auth/cancelled-popup-request') {
            _showFormError(btn?.closest('form'), _errorMsg(err.code));
        }
        _setLoading(btn, false, original);
    }
}

googleLoginBtn    ?.addEventListener('click', () => _googleSignIn(googleLoginBtn));
googleRegisterBtn ?.addEventListener('click', () => _googleSignIn(googleRegisterBtn));

// ── Error display helpers ─────────────────────────────────────

function _showFormError(form, message) {
    if (!form || !message) return;
    let errEl = form.querySelector('.form-error');
    if (!errEl) {
        errEl = document.createElement('p');
        errEl.className = 'form-error';
        errEl.style.cssText = 'color:#E24B4A;font-size:14px;margin-top:8px;';
        form.appendChild(errEl);
    }
    errEl.textContent = message;
}

function _showError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
    let errEl = input.nextElementSibling;
    if (!errEl || !errEl.classList.contains('field-error')) {
        errEl = document.createElement('p');
        errEl.className = 'field-error';
        errEl.style.cssText = 'color:#E24B4A;font-size:13px;margin-top:4px;';
        input.insertAdjacentElement('afterend', errEl);
    }
    errEl.textContent = message;
    input.focus();
}

function _clearErrors() {
    document.querySelectorAll('.form-error, .field-error').forEach(el => el.remove());
}

// ── Error messages ────────────────────────────────────────────

function _errorMsg(code) {
    const MAP = {
        'auth/email-already-in-use':    'This email is already registered. Try signing in instead.',
        'auth/invalid-email':           'Please enter a valid email address.',
        'auth/operation-not-allowed':   'Email/password sign-in is not enabled.',
        'auth/weak-password':           'Password must be at least 6 characters.',
        'auth/user-disabled':           'This account has been disabled.',
        'auth/user-not-found':          'No account found with that email.',
        'auth/wrong-password':          'Incorrect password — please try again.',
        'auth/too-many-requests':       'Too many attempts. Please wait a moment and try again.',
        'auth/network-request-failed':  'Network error — please check your connection.',
        'auth/invalid-credential':      'Invalid credentials. Please check your email and password.'
    };
    return MAP[code] || 'Something went wrong. Please try again.';
}
