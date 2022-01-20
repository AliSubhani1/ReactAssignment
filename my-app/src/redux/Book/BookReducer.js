import {
  ADD_BOOK,
  REMOVE_BOOK,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
} from "./BookTypes";
const books = {
  author: "",
  genre: "",
  title: "",
};
const bookReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [(state = action.payload)];

    case REMOVE_BOOK:
      return state.filter((item) => item.id !== action.payload.id);
    case FETCH_BOOKS_SUCCESS:
      return (state = [...action.payload]);
    case FETCH_BOOKS_FAILURE:
      return (state = [...action.payload]);
    default:
      return state;
  }
};

export default bookReducer;
