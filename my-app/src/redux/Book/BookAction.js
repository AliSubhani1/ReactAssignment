import { ADD_BOOK, REMOVE_BOOK, FETCH_BOOKS } from "./BookTypes";
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

export const fetchBook = (book) => {
  console.log("redux books action=", book);
  return (dispatch) => {
    dispatch({
      type: FETCH_BOOKS,
      payload: book,
    });
  };
};
