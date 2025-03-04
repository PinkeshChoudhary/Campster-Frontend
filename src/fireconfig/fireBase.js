import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC1lym_bBPAddzvb9YYb4XLgBGoPVCjsi8",
  authDomain: "campster-d5fd6.firebaseapp.com",
  projectId: "campster-d5fd6",
  storageBucket: "campster-d5fd6.firebasestorage.app",
  messagingSenderId: "19932685434",
  appId: "1:19932685434:web:6219214be9be1cecf447c3",
  measurementId: "G-8WLJN95D43"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth, RecaptchaVerifier, signInWithPhoneNumber };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC1lym_bBPAddzvb9YYb4XLgBGoPVCjsi8",
//   authDomain: "campster-d5fd6.firebaseapp.com",
//   projectId: "campster-d5fd6",
//   storageBucket: "campster-d5fd6.firebasestorage.app",
//   messagingSenderId: "19932685434",
//   appId: "1:19932685434:web:6219214be9be1cecf447c3",
//   measurementId: "G-8WLJN95D43"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
