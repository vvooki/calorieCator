// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAPSQ5__GOv6vDzjPc8SOZwXiVAaum96C4',
  authDomain: 'caloriecator.firebaseapp.com',
  projectId: 'caloriecator',
  storageBucket: 'caloriecator.appspot.com',
  messagingSenderId: '637654673006',
  appId: '1:637654673006:web:6c3d6043295fea8b1b287f',
};

let app = '';
// Initialize Firebase
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = getFirestore(app);
export { auth, db };
