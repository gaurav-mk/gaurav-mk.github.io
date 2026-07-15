import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc, arrayUnion }
  from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';

const app = initializeApp({
  apiKey: 'AIzaSyCv4ttjCV0EZZ8j5-ZpljTF03ephWFISIQ',
  authDomain: 'gaurav-mk.firebaseapp.com',
  projectId: 'gaurav-mk',
  storageBucket: 'gaurav-mk.firebasestorage.app',
  messagingSenderId: '279801707825',
  appId: '1:279801707825:web:78804309acb10bac29c410',
});

window._GK = { db: getFirestore(app), doc, getDoc, setDoc, arrayUnion };
document.dispatchEvent(new Event('gk-firebase-ready'));
