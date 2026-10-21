import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (prevent re-initialization in dev with HMR)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Connect to emulators in development
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_USE_EMULATORS === 'true') {
  const authPort = parseInt(process.env.NEXT_PUBLIC_EMULATOR_AUTH_PORT || '9099');
  const firestorePort = parseInt(process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_PORT || '8080');
  const storagePort = parseInt(process.env.NEXT_PUBLIC_EMULATOR_STORAGE_PORT || '9199');

  // Only connect if not already connected (prevents HMR double-connect)
  if (!(auth as any)._isInitialized || !(auth as any).emulatorConfig) {
    try {
      connectAuthEmulator(auth, `http://127.0.0.1:${authPort}`, { disableWarnings: true });
    } catch (e) {
      // Already connected
    }
  }

  try {
    connectFirestoreEmulator(db, '127.0.0.1', firestorePort);
  } catch (e) {
    // Already connected
  }

  try {
    connectStorageEmulator(storage, '127.0.0.1', storagePort);
  } catch (e) {
    // Already connected
  }
}

export { app, auth, db, storage };
