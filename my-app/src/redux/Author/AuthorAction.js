import {
  ADD_AUTHOR,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
} from "./AuthorTypes";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const db = getFirestore();

const colRef_Authors = collection(db, "authors");
export const addAuthor = (authorName, author) => {
  return (dispatch) => {
    const db = getFirestore();

    const collectionAuthors = collection(db, "authors");
    addDoc(collectionAuthors, {
      name: authorName,
    }).then(() => {
      console.log("new author to firestore");
    });
    dispatch({
      type: ADD_AUTHOR,
      payload: author,
    });
  };
};

export const fetchAuthor = () => {
  return (dispatch) => {
    let authors = [];

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
        });
      });
  };
};
