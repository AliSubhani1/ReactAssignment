import { ADD_AUTHOR, FETCH_AUTHORS } from "./AuthorTypes";

export const addAuthor = (author) => {
  return (dispatch) => {
    dispatch({
      type: ADD_AUTHOR,
      payload: author,
    });
  };
};

export const fetchAuthor = (author) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_AUTHORS,
      payload: author,
    });
  };
};
