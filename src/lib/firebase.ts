import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
console.log("Firebase App Initialized:", !!app);
let db;
try {
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    console.log("Firestore Initialized:", !!db);
} catch (e) {
    console.error("Firestore Init Error:", e);
    // fallback
    db = getFirestore(app);
}
export { db };
export const auth = getAuth(app);
console.log("Auth Initialized:", !!auth);
