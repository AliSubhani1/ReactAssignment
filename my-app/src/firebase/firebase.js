import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtOGoWyopiPGSjlPX3hkDTpWCzhZrl0gU",
  authDomain: "booklogin-ab8db.firebaseapp.com",
  projectId: "booklogin-ab8db",
  storageBucket: "booklogin-ab8db.appspot.com",
  messagingSenderId: "1015507045633",
  appId: "1:1015507045633:web:cf90b038470992d8859f00",
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export default fire;
