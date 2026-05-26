/* ═══════════════════════════════════════════════════
   auth.js — Firebase Auth (v9 compat)
   Handles: Google login, email/password login + register,
            logout, avatar click to open modal, auth state UI
   Requires: firebase-config.js loaded before this file
═══════════════════════════════════════════════════ */

(function () {

  /* ── Inject auth modal HTML into body ── */
  const modalHTML = `
  <div id="authModal" style="
    display:none;position:fixed;inset:0;z-index:10000;
    background:rgba(26,21,16,.72);backdrop-filter:blur(12px);
    align-items:center;justify-content:center;padding:1rem;
  ">
    <div style="
      background:#fff;border-radius:20px;width:100%;max-width:420px;
      box-shadow:0 24px 64px rgba(26,21,16,.22);overflow:hidden;position:relative;
    ">
      <!-- close -->
      <button id="authClose" style="
        position:absolute;top:14px;right:14px;width:32px;height:32px;
        border-radius:50%;border:1px solid rgba(26,21,16,.12);background:#f4f0e8;
        font-size:16px;display:flex;align-items:center;justify-content:center;
        cursor:pointer;color:#5a5048;
      ">✕</button>

      <!-- header -->
      <div style="
        background:linear-gradient(135deg,#1a1510,#2c1e10);
        padding:32px 32px 24px;text-align:center;
      ">
        <div style="
          width:52px;height:52px;background:#c0392b;border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          font-family:'Noto Serif JP',serif;font-size:28px;font-weight:700;
          color:#fff;margin:0 auto 14px;box-shadow:0 6px 20px rgba(192,57,43,.4);
        ">道</div>
        <div style="font-family:'Noto Serif JP',serif;font-size:20px;font-weight:700;color:#f4f0e8;margin-bottom:4px">日本語道</div>
        <div id="authModalTitle" style="font-size:12px;color:rgba(244,240,232,.5);font-family:'DM Mono',monospace;letter-spacing:.12em">SIGN IN TO SYNC PROGRESS</div>
      </div>

      <!-- tabs -->
      <div style="display:flex;border-bottom:1px solid rgba(26,21,16,.09)">
        <button id="tabLogin" class="auth-tab auth-tab-active" data-tab="login">Sign in</button>
        <button id="tabRegister" class="auth-tab" data-tab="register">Register</button>
      </div>

      <div style="padding:24px 28px 28px">

        <!-- Google -->
        <button id="googleLoginBtn" style="
          width:100%;display:flex;align-items:center;justify-content:center;gap:10px;
          background:#fff;border:1.5px solid rgba(26,21,16,.15);border-radius:10px;
          padding:12px;font-size:13px;font-weight:500;color:#1a1510;
          cursor:pointer;transition:border-color .15s,box-shadow .15s;margin-bottom:16px;
        ">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-21 0-1.3-.2-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 6.4 6.3 14.7z"/><path fill="#FBBC05" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.7-5.5C29.8 36.7 27 37.5 24 37.5c-6.1 0-10.7-3.9-11.9-9.3l-7 5.3C8.3 41 15.6 46 24 46z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.8-2.8 5.1-5.3 6.6l6.7 5.5C42 37.2 45 31.2 45 24c0-1.3-.2-2.7-.5-4z"/></svg>
          Continue with Google
        </button>

        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div style="flex:1;height:1px;background:rgba(26,21,16,.09)"></div>
          <span style="font-size:11px;color:#665848;font-family:'DM Mono',monospace">OR</span>
          <div style="flex:1;height:1px;background:rgba(26,21,16,.09)"></div>
        </div>

        <!-- Login form -->
        <div id="loginForm">
          <input id="loginEmail" type="email" placeholder="Email address" style="
            width:100%;padding:11px 14px;border:1.5px solid rgba(26,21,16,.15);
            border-radius:9px;font-size:13px;outline:none;margin-bottom:10px;
            font-family:'DM Sans',sans-serif;color:#1a1510;
          ">
          <input id="loginPassword" type="password" placeholder="Password" style="
            width:100%;padding:11px 14px;border:1.5px solid rgba(26,21,16,.15);
            border-radius:9px;font-size:13px;outline:none;margin-bottom:16px;
            font-family:'DM Sans',sans-serif;color:#1a1510;
          ">
          <button id="loginBtn" style="
            width:100%;padding:12px;background:#c0392b;color:#fff;border:none;
            border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;
            letter-spacing:.03em;transition:background .15s;
          ">Sign in →</button>
          <button id="forgotBtn" style="
            width:100%;margin-top:10px;background:none;border:none;
            font-size:12px;color:#665848;cursor:pointer;text-decoration:underline;
          ">Forgot password?</button>
        </div>

        <!-- Register form -->
        <div id="registerForm" style="display:none">
          <input id="registerName" type="text" placeholder="Your name" style="
            width:100%;padding:11px 14px;border:1.5px solid rgba(26,21,16,.15);
            border-radius:9px;font-size:13px;outline:none;margin-bottom:10px;
            font-family:'DM Sans',sans-serif;color:#1a1510;
          ">
          <input id="registerEmail" type="email" placeholder="Email address" style="
            width:100%;padding:11px 14px;border:1.5px solid rgba(26,21,16,.15);
            border-radius:9px;font-size:13px;outline:none;margin-bottom:10px;
            font-family:'DM Sans',sans-serif;color:#1a1510;
          ">
          <input id="registerPassword" type="password" placeholder="Password (min 6 chars)" style="
            width:100%;padding:11px 14px;border:1.5px solid rgba(26,21,16,.15);
            border-radius:9px;font-size:13px;outline:none;margin-bottom:16px;
            font-family:'DM Sans',sans-serif;color:#1a1510;
          ">
          <button id="registerBtn" style="
            width:100%;padding:12px;background:#c0392b;color:#fff;border:none;
            border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;
            letter-spacing:.03em;transition:background .15s;
          ">Create account →</button>
        </div>

        <!-- Error / success message -->
        <div id="authMsg" style="
          display:none;margin-top:12px;padding:10px 14px;border-radius:8px;
          font-size:12px;line-height:1.6;
        "></div>

        <!-- Signed-in state -->
        <div id="signedInState" style="display:none;text-align:center">
          <div style="font-size:32px;margin-bottom:8px">👋</div>
          <div id="signedInName" style="font-size:15px;font-weight:600;color:#1a1510;margin-bottom:4px"></div>
          <div id="signedInEmail" style="font-size:12px;color:#665848;font-family:'DM Mono',monospace;margin-bottom:20px"></div>
          <button id="logoutBtn" style="
            width:100%;padding:11px;background:#f4f0e8;border:1.5px solid rgba(26,21,16,.15);
            border-radius:10px;font-size:13px;color:#5a5048;cursor:pointer;
          ">Sign out</button>
        </div>

      </div>
    </div>
  </div>

  <style>
    .auth-tab {
      flex:1;padding:12px;background:transparent;border:none;border-bottom:2px solid transparent;
      font-size:13px;color:#665848;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;
      transition:color .15s,border-color .15s;
    }
    .auth-tab:hover { color:#1a1510; }
    .auth-tab.auth-tab-active { color:#c0392b; border-bottom-color:#c0392b; }
    #authModal input:focus { border-color:#c0392b !important; }
    #loginBtn:hover, #registerBtn:hover { background:#a93226 !important; }
  </style>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  /* ── Helpers ── */
  const modal    = document.getElementById('authModal');
  const loginForm    = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const signedInState = document.getElementById('signedInState');
  const authMsg      = document.getElementById('authMsg');
  const authModalTitle = document.getElementById('authModalTitle');

  function showModal() { modal.style.display = 'flex'; }
  function hideModal() { modal.style.display = 'none'; clearMsg(); }

  function showMsg(msg, ok) {
    authMsg.style.display = 'block';
    authMsg.style.background = ok ? 'rgba(74,124,63,.1)' : 'rgba(192,57,43,.1)';
    authMsg.style.color = ok ? '#4a7c3f' : '#c0392b';
    authMsg.style.border = ok ? '1px solid rgba(74,124,63,.3)' : '1px solid rgba(192,57,43,.3)';
    authMsg.textContent = msg;
  }

  function clearMsg() { authMsg.style.display = 'none'; authMsg.textContent = ''; }

  function setLoading(btn, loading) {
    btn.disabled = loading;
    btn.style.opacity = loading ? '.6' : '1';
  }

  /* ── Tab switching ── */
  function switchTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('auth-tab-active'));
    document.getElementById('tab' + (tab === 'login' ? 'Login' : 'Register')).classList.add('auth-tab-active');
    loginForm.style.display    = tab === 'login'    ? 'block' : 'none';
    registerForm.style.display = tab === 'register' ? 'block' : 'none';
    signedInState.style.display = 'none';
    clearMsg();
  }

  document.getElementById('tabLogin').addEventListener('click',    () => switchTab('login'));
  document.getElementById('tabRegister').addEventListener('click', () => switchTab('register'));

  /* ── Show signed-in state ── */
  function showSignedIn(user) {
    const name = user.displayName || user.email.split('@')[0];
    document.getElementById('signedInName').textContent  = name;
    document.getElementById('signedInEmail').textContent = user.email;
    authModalTitle.textContent = 'SIGNED IN';
    loginForm.style.display     = 'none';
    registerForm.style.display  = 'none';
    signedInState.style.display = 'block';
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('auth-tab-active'));
  }

  /* ── Auth state observer — updates avatar and nav ── */
  auth.onAuthStateChanged(user => {
    const avatar = document.getElementById('navAvatar');
    if (!avatar) return;
    if (user) {
      const name = user.displayName || user.email.split('@')[0];
      avatar.textContent = name[0].toUpperCase();
      avatar.title = 'Signed in as ' + user.email + ' — click to manage';
    } else {
      avatar.textContent = '人';
      avatar.title = 'Click to sign in';
    }
  });

  /* ── Avatar click → open modal ── */
  const avatar = document.getElementById('navAvatar');
  if (avatar) {
    avatar.style.cursor = 'pointer';
    avatar.addEventListener('click', () => {
      showModal();
      const user = auth.currentUser;
      if (user) { showSignedIn(user); }
      else { switchTab('login'); }
    });
  }

  /* ── Close ── */
  document.getElementById('authClose').addEventListener('click', hideModal);
  modal.addEventListener('click', e => { if (e.target === modal) hideModal(); });

  /* ── Google sign-in ── */
  document.getElementById('googleLoginBtn').addEventListener('click', async () => {
    clearMsg();
    const btn = document.getElementById('googleLoginBtn');
    setLoading(btn, true);
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
      hideModal();
    } catch (e) {
      showMsg(friendlyError(e), false);
    }
    setLoading(btn, false);
  });

  /* ── Email login ── */
  document.getElementById('loginBtn').addEventListener('click', async () => {
    clearMsg();
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    if (!email || !password) { showMsg('Please fill in both fields.', false); return; }
    const btn = document.getElementById('loginBtn');
    setLoading(btn, true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      hideModal();
    } catch (e) {
      showMsg(friendlyError(e), false);
    }
    setLoading(btn, false);
  });

  /* ── Email register ── */
  document.getElementById('registerBtn').addEventListener('click', async () => {
    clearMsg();
    const name     = document.getElementById('registerName').value.trim();
    const email    = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    if (!name || !email || !password) { showMsg('Please fill in all fields.', false); return; }
    if (password.length < 6) { showMsg('Password must be at least 6 characters.', false); return; }
    const btn = document.getElementById('registerBtn');
    setLoading(btn, true);
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
      hideModal();
    } catch (e) {
      showMsg(friendlyError(e), false);
    }
    setLoading(btn, false);
  });

  /* ── Forgot password ── */
  document.getElementById('forgotBtn').addEventListener('click', async () => {
    clearMsg();
    const email = document.getElementById('loginEmail').value.trim();
    if (!email) { showMsg('Enter your email above first.', false); return; }
    try {
      await auth.sendPasswordResetEmail(email);
      showMsg('Reset email sent — check your inbox.', true);
    } catch (e) {
      showMsg(friendlyError(e), false);
    }
  });

  /* ── Logout ── */
  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await auth.signOut();
    hideModal();
    if (typeof renderAll === 'function') renderAll();
  });

  /* ── Enter key on password → submit ── */
  ['loginPassword', 'registerPassword'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        if (id === 'loginPassword') document.getElementById('loginBtn').click();
        else document.getElementById('registerBtn').click();
      }
    });
  });

  /* ── Friendly Firebase error messages ── */
  function friendlyError(e) {
    const map = {
      'auth/user-not-found':       'No account found with this email.',
      'auth/wrong-password':       'Incorrect password. Try again.',
      'auth/email-already-in-use': 'This email is already registered. Sign in instead.',
      'auth/invalid-email':        'Please enter a valid email address.',
      'auth/weak-password':        'Password must be at least 6 characters.',
      'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
      'auth/network-request-failed': 'Network error — check your connection.',
      'auth/too-many-requests':    'Too many attempts. Please wait a moment.',
      'auth/invalid-credential':   'Invalid email or password.',
    };
    return map[e.code] || e.message || 'Something went wrong. Please try again.';
  }

})();
