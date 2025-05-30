
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBI3uViAAqnfKl-k9oqmt9yWIMuCu7bx-U",
  authDomain: "journal-app-b12c0.firebaseapp.com",
  projectId: "journal-app-b12c0",
  storageBucket: "journal-app-b12c0.firebasestorage.app",
  messagingSenderId: "235100548554",
  appId: "1:235100548554:web:8b14e84714570fffe37333",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
