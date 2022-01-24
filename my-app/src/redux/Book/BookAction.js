import {
  ADD_BOOK_SUCCESS,
  REMOVE_BOOK,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_SUCCESS,
} from "./BookTypes";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect } from "react";

export const removeBook = (book) => {
  return (dispatch) => {
    const db = getFirestore();
    const docref = doc(db, "books", book.id);
    deleteDoc(docref).then(() => {
      console.log("book deleted");
    });
    dispatch({
      type: REMOVE_BOOK,
      payload: book,
    });
  };
};

export const addBook = (book) => {
  const db = getFirestore();
  const colRef_Books = collection(db, "books");

  return (dispatch) => {
    addDoc(colRef_Books, {
      author: book.author,
      title: book.title,
      genre: book.genre,
    }).then(() => {
      console.log("new book added to firestore");
      dispatch({
        type: ADD_BOOK_SUCCESS,
        payload: book,
      });
    });
  };
};

export const fetchBook = () => {
  let books = [];
  return (dispatch) => {
    const db = getFirestore();
    const colRef_Books = collection(db, "books");

    useEffect(() => {
      getDocs(colRef_Books)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
          });
          dispatch({
            type: FETCH_BOOKS_SUCCESS,
            payload: books,
          });
        })
        .catch((err) => {
          console.log(err.message);
          dispatch({
            type: FETCH_BOOKS_FAILURE,
            payload: books,
          });
        });
    }, []);
  };
};
fetchBook();
