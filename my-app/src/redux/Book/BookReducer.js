import { ADD_BOOK, REMOVE_BOOK, FETCH_BOOKS } from "./BookTypes";
const books = {
  author: "",
  genre: "",
  title: "",
};
const bookReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return state.push(action.payload);

    case REMOVE_BOOK:
      return state.filter((item) => item.id !== action.payload.id);
    case FETCH_BOOKS:
      return [(state = action.payload)];
    default:
      return state;
  }
};

export default bookReducer;
