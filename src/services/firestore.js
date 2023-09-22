import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const save = (path, payload) => set(ref(db, path), payload);

export const userRef = ref(db, 'users');
