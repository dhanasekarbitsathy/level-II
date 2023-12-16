// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    //change these to your own firebase config
    apiKey: "AIzaSyCcgUiUxkMpeKbBChA6h-xQYqgh--zmSDw",
    authDomain: "work-place-project.firebaseapp.com",
    projectId: "work-place-project",
    storageBucket: "work-place-project.appspot.com",
    messagingSenderId: "28397130987",
    appId: "1:28397130987:web:013023a6967f0a16b61aae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
