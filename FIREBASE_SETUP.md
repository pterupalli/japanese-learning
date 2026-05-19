# Firebase Setup Guide

## Step-by-Step Firebase Configuration

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `japanese-learning-app` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Select "Email/Password" under Sign-in providers
4. Toggle "Enable" and click "Save"

**Optional: Enable Google Sign-In**
5. Click "Add new provider" > Google
6. Toggle "Enable"
7. Select a support email
8. Click "Save"

### 3. Create Firestore Database

1. Go to **Build > Firestore Database**
2. Click "Create database"
3. Select a location (choose closest to your users)
4. Start in **test mode** for development
5. Click "Enable"

**Important**: Update security rules before going to production (see below)

### 4. Get Firebase Configuration

1. Go to **Project Overview** (gear icon) > **Project settings**
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register app with nickname: `japanese-learning-web`
5. Copy the `firebaseConfig` object

Example output:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 5. Update Your Application

Open `js/firebase-config.js` and replace the placeholder config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",           // Replace with your values
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 6. Set Up Firestore Security Rules

**For Development** (Current test mode):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

**For Production** (Recommended):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User data - only owner can read/write
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Lesson content - read-only for authenticated users
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins via Firebase Console
    }
    
    // Flashcard progress - per user
    match /flashcardProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User study sessions
    match /studySessions/{userId}/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 7. Firestore Data Structure

Create these collections manually or they'll be created automatically:

#### `users` collection:
```json
{
  "userId": {
    "displayName": "Joe",
    "email": "joe@example.com",
    "createdAt": "timestamp",
    "level": 1,
    "xp": 0,
    "streak": 0,
    "dailyGoal": 30,
    "theme": "light",
    "achievements": [],
    "totalStudyTime": 0
  }
}
```

#### `lessons` collection (optional - for admin):
```json
{
  "lesson1": {
    "title": "Hiragana Basics",
    "description": "Master all 46 Hiragana characters",
    "totalUnits": 12,
    "xpReward": 500,
    "status": "published"
  }
}
```

### 8. Optional: Firebase Hosting

Deploy your app to Firebase Hosting:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Hosting
# - Use existing project (select your project)
# - Public directory: . (current directory)
# - Single-page app: No
# - GitHub Actions: No

# Deploy
firebase deploy --only hosting
```

Your app will be live at: `https://your-project-id.web.app`

### 9. Test Authentication

1. Open your app (locally or deployed)
2. Click "Start Learning" or "Login"
3. Register with email/password
4. Check Firebase Console > Authentication > Users
5. You should see your new user

### 10. Monitor Usage

**Firebase Console Tabs to Monitor:**
- **Authentication > Users**: See registered users
- **Firestore Database > Data**: View stored user data
- **Usage**: Monitor reads/writes (free tier limits)

### Free Tier Limits (Spark Plan)

- **Authentication**: Unlimited users
- **Firestore**:
  - 1 GB storage
  - 50,000 reads/day
  - 20,000 writes/day
  - 20,000 deletes/day
- **Hosting**: 10 GB storage, 360 MB/day bandwidth

For most personal projects, this is more than enough!

### Troubleshooting

**Error: "Firebase: Error (auth/api-key-not-valid)"**
- Double-check your API key in firebase-config.js
- Ensure you copied the entire config object

**Error: "Firebase: Error (auth/unauthorized-domain)"**
- Go to Firebase Console > Authentication > Settings > Authorized domains
- Add your domain (e.g., yourusername.github.io)

**Firestore Permission Denied**
- Check your security rules
- Ensure user is authenticated
- Verify rule syntax in Firebase Console

**CORS Issues**
- Must serve app via HTTP, not file://
- Use local server: `python -m http.server`

### Security Best Practices

1. **Never commit firebase-config.js with real credentials to public repos**
   - Use environment variables in production
   - Create `.env` file and add to `.gitignore`

2. **Update Firestore rules before going live**
   - Test mode expires after 30 days
   - Use production rules shown above

3. **Enable App Check** (optional, for production):
   - Protects against abuse
   - Go to Build > App Check
   - Register your web app

4. **Monitor usage regularly**
   - Set up budget alerts
   - Review authentication logs

### Next Steps

Once Firebase is configured:
1. Test user registration
2. Test login/logout
3. Verify data is saving to Firestore
4. Test on mobile devices
5. Deploy to production

### Support

If you encounter issues:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)

---

**Firebase Setup Complete! 🎉**

You're now ready to use the Japanese Learning Platform with full backend functionality.
