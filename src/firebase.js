import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAxgLL1N-Uqj0gn3g0S0JYg-a-GyKFl008",
  authDomain: "react-2022-4e8cf.firebaseapp.com",
  projectId: "react-2022-4e8cf",
  storageBucket: "react-2022-4e8cf.appspot.com",
  messagingSenderId: "1061490830364",
  appId: "1:1061490830364:web:d9ada90aa3e7f12ea3c3d9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};