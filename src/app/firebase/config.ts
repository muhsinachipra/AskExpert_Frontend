// frontend\src\app\firebase\config.ts

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyDIjA4dfSk1uqRr-1F4lVqDTN1Il7A9nYE",
//     authDomain: "askexpert-1716207437810.firebaseapp.com",
//     projectId: "askexpert-1716207437810",
//     storageBucket: "askexpert-1716207437810.appspot.com",
//     messagingSenderId: "614409014364",
//     appId: "1:614409014364:web:1133f18b14b5fea1cd2a99"
// };
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
