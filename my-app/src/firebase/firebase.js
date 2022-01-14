import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import AddBook from "../components/AddBook/AddBook";
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

//initialise db variable
const db = getFirestore();

//collection ref
// const colRef_Books = collection(db, "books");
const colRef_Authors = collection(db, "authors");
// let books = [];
// getDocs(colRef_Books)
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log("Books=", books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// export let AllBooks = books;
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
