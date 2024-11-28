import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTzxGwVmgvBi40fHWdEFqh5MmLjF5kUrU",
  authDomain: "testelegal-981c5.firebaseapp.com",
  projectId: "testelegal-981c5",
  storageBucket: "testelegal-981c5.firebasestorage.app",
  messagingSenderId: "945786834205",
  appId: "1:945786834205:web:8b6d98585a347bd0a5e5f4",
  measurementId: "G-YJ6CQD98R6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
