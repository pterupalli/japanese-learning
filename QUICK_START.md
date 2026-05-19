# 🎌 Japanese Learning App - Quick Setup Guide

## Step 1: Download Your Files ⬇️

You have all your files ready! Download the entire `japanese-learning-app` folder to your computer.

Your folder structure looks like this:
```
japanese-learning-app/
├── index.html              ← Landing page with Mount Fuji landscape
├── dashboard.html          ← Learning dashboard
├── css/
│   ├── main.css           ← Main styles
│   ├── dashboard.css      ← Dashboard styles
│   └── landscape.css      ← Mount Fuji landscape styles
├── js/
│   ├── firebase-config.js ← Firebase setup (needs editing)
│   ├── auth.js            ← Login/Register logic
│   ├── dashboard.js       ← Dashboard functionality
│   └── animations.js      ← Landscape animations
├── lessons/
│   └── lessons-data.json  ← Lesson content
├── README.md              ← Documentation
└── FIREBASE_SETUP.md      ← Firebase instructions
```

## Step 2: Set Up Firebase (5 minutes) 🔥

### A. Create Firebase Project

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"**
3. Enter project name: `japanese-learning` (or any name you like)
4. Click **"Continue"**
5. Disable Google Analytics (you can skip it for now)
6. Click **"Create project"**
7. Wait 30 seconds for it to finish
8. Click **"Continue"**

### B. Enable Authentication

1. In the left sidebar, click **"Build"** → **"Authentication"**
2. Click **"Get started"**
3. Click on **"Email/Password"**
4. Toggle **"Enable"** to ON
5. Click **"Save"**

*Optional: You can also enable Google Sign-In if you want*

### C. Create Firestore Database

1. In the left sidebar, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose a location (pick the one closest to you)
5. Click **"Enable"**
6. Wait 30 seconds for it to finish

### D. Get Your Firebase Configuration

1. Click the **gear icon** (⚙️) in the top left → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click the **web icon** `</>`
4. Enter app nickname: `japanese-learning-web`
5. **DON'T** check "Firebase Hosting" (we'll use GitHub Pages)
6. Click **"Register app"**
7. You'll see a code block with `firebaseConfig` - **COPY THIS!**

It looks like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456:web:abc123"
};
```

## Step 3: Update Your App with Firebase Config 📝

1. Open your downloaded folder `japanese-learning-app`
2. Open the file: `js/firebase-config.js` in any text editor (Notepad, VS Code, etc.)
3. Find this section:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```
4. **Replace** the placeholder values with your actual values from Step 2D
5. **Save** the file

## Step 4: Test Locally (1 minute) 💻

You need to run a local server (you can't just open index.html directly because of Firebase security).

### Option A: Using Python (if you have Python installed)

1. Open Terminal/Command Prompt
2. Navigate to your app folder:
   ```bash
   cd path/to/japanese-learning-app
   ```
3. Run this command:
   ```bash
   python -m http.server 8000
   ```
   Or if you have Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```
4. Open your browser and go to: `http://localhost:8000`

### Option B: Using VS Code Live Server

1. Install **VS Code** (free): https://code.visualstudio.com/
2. Open VS Code
3. Click **"Extensions"** (left sidebar, looks like blocks)
4. Search for **"Live Server"**
5. Click **"Install"**
6. In VS Code, click **File** → **Open Folder** → Select your `japanese-learning-app` folder
7. Right-click on `index.html`
8. Click **"Open with Live Server"**
9. Your browser will automatically open!

### Option C: Using Node.js

If you have Node.js installed:
```bash
npx http-server
```

## Step 5: Test Your App! ✅

1. You should see the beautiful **Mount Fuji landscape** with moving clouds!
2. Click **"Start Learning"** or **"Login"**
3. Try creating an account with email/password
4. You should be redirected to the dashboard

### Test Checklist:
- [ ] Landing page loads with Mount Fuji
- [ ] Clouds are moving
- [ ] Cherry blossom petals falling
- [ ] Navigation is transparent
- [ ] "Start Learning" button opens modal
- [ ] You can register with email/password
- [ ] After registration, you're redirected to dashboard
- [ ] Dashboard shows your name

## Step 6: Deploy to GitHub Pages (Make it Live!) 🚀

### A. Create GitHub Account
1. Go to: https://github.com
2. Click **"Sign up"** (if you don't have an account)
3. Follow the steps to create your account

### B. Create a New Repository

1. Click the **"+"** icon in top right → **"New repository"**
2. Repository name: `japanese-learning` (or any name)
3. Make it **Public**
4. **DON'T** check "Add README"
5. Click **"Create repository"**

### C. Upload Your Files

**Easy Way (using GitHub website):**
1. On your repository page, click **"uploading an existing file"**
2. Drag ALL files from your `japanese-learning-app` folder
3. Scroll down and click **"Commit changes"**

**Or using Git (if you know Git):**
```bash
cd path/to/japanese-learning-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/japanese-learning.git
git push -u origin main
```

### D. Enable GitHub Pages

1. In your repository, click **"Settings"** tab
2. Click **"Pages"** in left sidebar
3. Under "Source", select **"main"** branch
4. Click **"Save"**
5. Wait 1-2 minutes
6. You'll see: **"Your site is live at https://YOUR_USERNAME.github.io/japanese-learning/"**

### E. Update Firebase Settings

1. Go back to Firebase Console: https://console.firebase.google.com
2. Click your project
3. Click **"Authentication"** → **"Settings"** tab
4. Scroll to **"Authorized domains"**
5. Click **"Add domain"**
6. Add: `YOUR_USERNAME.github.io`
7. Click **"Add"**

## Step 7: Share Your App! 🎉

Your app is now live at:
```
https://YOUR_USERNAME.github.io/japanese-learning/
```

Share it with friends and start learning Japanese!

---

## Troubleshooting 🔧

### Problem: "Firebase: Error (auth/api-key-not-valid)"
**Solution:** Double-check that you copied the entire Firebase config correctly in `firebase-config.js`

### Problem: "Firebase: Error (auth/unauthorized-domain)"
**Solution:** Add your domain to Firebase Console → Authentication → Settings → Authorized domains

### Problem: "Cannot read properties of undefined"
**Solution:** Make sure you're running a local server (not opening index.html directly)

### Problem: Landscape doesn't show
**Solution:** 
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Check that `landscape.css` file exists in the css folder
3. Check browser console for errors (F12)

### Problem: Page is blank
**Solution:**
1. Open browser console (F12)
2. Look for errors
3. Make sure all CSS and JS files are in the correct folders

---

## Need Help? 💬

1. Check the browser console (F12) for error messages
2. Read `README.md` for more details
3. Read `FIREBASE_SETUP.md` for Firebase-specific help

---

## What You Have:

✅ Beautiful Mount Fuji landscape homepage with animated clouds
✅ Glass morphism hero section
✅ Firebase authentication (email/password + Google)
✅ User dashboard with progress tracking
✅ XP and level system
✅ Flashcard system
✅ Pomodoro timer
✅ Achievement badges
✅ Learning roadmap
✅ Dark/light theme toggle
✅ Mobile responsive

**Enjoy learning Japanese! がんばって！ (Ganbatte - Good luck!)**
