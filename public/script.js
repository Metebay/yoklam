// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDtw3dBVcjhftDX7KqGdpdfAH7rCZuSGM4",
  authDomain: "yoklama-sistss.firebaseapp.com",
  projectId: "yoklama-sistss",
  storageBucket: "yoklama-sistss.firebasestorage.app",
  messagingSenderId: "648200322291",
  appId: "1:648200322291:web:5cbc32a11ca69caeb98b86",
  measurementId: "G-13FDPVPXQW"
};

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Firebase initialization
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Teacher login function
async function teacherLogin() {
    const username = document.getElementById('teacherUsername').value;
    const password = document.getElementById('teacherPassword').value;
    const loginError = document.getElementById('loginError');

    try {
        await signInWithEmailAndPassword(auth, username, password);
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('teacherPanel').style.display = 'block';
        loginError.textContent = '';
    } catch (error) {
        loginError.textContent = 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
    }
}

// Show sections based on the button clicked
function showSection(sectionId) {
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => section.style.display = 'none');

    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
}

// Create class function
async function createClass() {
    const className = document.getElementById('className').value;
    if (!className) return;

    await addDoc(collection(db, "classes"), {
        name: className
    });

    alert('Sınıf başarıyla oluşturuldu!');
}
