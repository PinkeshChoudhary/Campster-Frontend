import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAl9dbCRNpY4N-1gU43a_g4zoXd-rAfQ6s",
  authDomain: "campster-efe13.firebaseapp.com",
  projectId: "campster-efe13",
  storageBucket: "campster-efe13.firebasestorage.app",
  messagingSenderId: "612277307756",
  appId: "1:612277307756:web:51281af306826759468b49",
  measurementId: "G-56BPLNF7DG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
