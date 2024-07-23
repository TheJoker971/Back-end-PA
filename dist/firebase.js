"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDownloadURL = exports.uploadBytes = exports.ref = exports.storage = void 0;
// firebase.ts
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return storage_1.ref; } });
Object.defineProperty(exports, "uploadBytes", { enumerable: true, get: function () { return storage_1.uploadBytes; } });
Object.defineProperty(exports, "getDownloadURL", { enumerable: true, get: function () { return storage_1.getDownloadURL; } });
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
const app = (0, app_1.initializeApp)(firebaseConfig);
// Obtenir une référence au service de stockage
const storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
