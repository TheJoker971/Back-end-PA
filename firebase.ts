// firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCq1Cn0iuoWwPAaTgu-VrIywF1cA8YJQ-0",
    authDomain: "spicy-donut.firebaseapp.com",
    projectId: "spicy-donut",
    storageBucket: "spicy-donut.appspot.com",
    messagingSenderId: "945969455597",
    appId: "1:945969455597:web:698029af66033b9f5f47e4"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Obtenir une référence au service de stockage
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
