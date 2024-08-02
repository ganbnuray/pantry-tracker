// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCb8y9xbAdgn3sHTNrMsWLXG0N1utsk4M",
  authDomain: "pantryapp-19360.firebaseapp.com",
  projectId: "pantryapp-19360",
  storageBucket: "pantryapp-19360.appspot.com",
  messagingSenderId: "508214670209",
  appId: "1:508214670209:web:d2e4581f1fa75347a0ae80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
