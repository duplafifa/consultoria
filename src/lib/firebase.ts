import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
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

async function testConnection() {
  try {
    // Testing connection by trying to fetch a dummy document
    await getDocFromServer(doc(db, 'users', 'test-connection'));
  } catch (error: any) {
    console.log("Firebase connection check:", error.message);
  }
}
testConnection();
