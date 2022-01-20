import {
  ADD_BOOK,
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
import { useState, useEffect } from "react";

export const removeBook = (book) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_BOOK,
      payload: book,
    });
  };
};

export const addBook = (book) => {
  return (dispatch) => {
    dispatch({
      type: ADD_BOOK,
      payload: book,
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
