import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTzxGwVmgvBi40fHWdEFqh5MmLjF5kUrU",
  authDomain: "testelegal-981c5.firebaseapp.com",
  projectId: "testelegal-981c5",
  storageBucket: "testelegal-981c5.appspot.com",
  messagingSenderId: "945786834205",
  appId: "1:945786834205:web:514428ca653a7155a5e5f4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
