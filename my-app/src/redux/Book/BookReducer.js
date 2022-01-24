import {
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  REMOVE_BOOK,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_SUCCESS,
} from "./BookTypes";
const initialState = {
  books: [],
};
const bookReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_BOOK_SUCCESS:
      return [...state, Object.assign({}, action.payload)];
    case ADD_BOOK_FAILURE:
      return [...state, Object.assign({}, action.payload)];

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
