import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtOGoWyopiPGSjlPX3hkDTpWCzhZrl0gU",
  authDomain: "booklogin-ab8db.firebaseapp.com",
  projectId: "booklogin-ab8db",
  storageBucket: "booklogin-ab8db.appspot.com",
  messagingSenderId: "1015507045633",
  appId: "1:1015507045633:web:cf90b038470992d8859f00",
};

const fire = initializeApp(firebaseConfig);

const db = getFirestore();

const colRef_Authors = collection(db, "authors");

let authors = [];
getDocs(colRef_Authors)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      authors.push({ ...doc.data(), id: doc.id });
    });
    console.log("Authors=", authors);
  })
  .catch((err) => {
    console.log(err.message);
  });
export let allAuthors = authors;
export default fire;
