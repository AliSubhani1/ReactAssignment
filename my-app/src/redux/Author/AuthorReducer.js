import { ADD_AUTHOR, FETCH_AUTHORS } from "./AuthorTypes";
const books = {
  author: "",
  genre: "",
  title: "",
};
const authorReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_AUTHOR:
      return [...state, { ...action.payload }];
    case FETCH_AUTHORS:
      return (state = [...action.payload]);
    default:
      return state;
  }
};

export default authorReducer;
