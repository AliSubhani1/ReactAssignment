import {
  ADD_AUTHOR,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
} from "./AuthorTypes";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

const db = getFirestore();

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
  return (dispatch) => {
    let authors = [];
    useEffect(() => {
      getDocs(colRef_Authors)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            authors.push({ ...doc.data(), id: doc.id });
          });

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
