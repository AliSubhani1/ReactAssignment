import {
  ADD_AUTHOR,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
} from "./AuthorTypes";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
//initialise db variable
const db = getFirestore();

//collection ref
const colRef_Authors = collection(db, "authors");
export const addAuthor = (author) => {
  return (dispatch) => {
    dispatch({
      type: ADD_AUTHOR,
      payload: author,
    });
  };
};

export const fetchAuthor = () => {
  // const [AuthorsData, setAuthorsData] = useState([]);
  return (dispatch) => {
    let authors = [];
    useEffect(() => {
      getDocs(colRef_Authors)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            authors.push({ ...doc.data(), id: doc.id });
          });
          // setAuthorsData(authors);
          dispatch({
            type: FETCH_AUTHORS_SUCCESS,
            payload: authors,
          });
        })
        .catch((err) => {
          console.log(err.message);
          dispatch({
            type: FETCH_AUTHORS_FAILURE,
            payload: authors,
          });
        });
    }, []);
  };
};
