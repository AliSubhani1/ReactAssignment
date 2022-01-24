import {
  ADD_AUTHOR,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
} from "./AuthorTypes";
const initialState = {
  authors: [],
};

const authorReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_AUTHOR:
      return [...state, Object.assign({}, action.payload)];
    case FETCH_AUTHORS_SUCCESS:
      return (state = [...action.payload]);
    case FETCH_AUTHORS_FAILURE:
      return (state = [...action.payload]);
    default:
      return state;
  }
};

export default authorReducer;
