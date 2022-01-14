import { combineReducers } from "redux";
import loginReducer from "../login/LoginReducer";
import signupReducer from "../signup/signupReducer";
import bookReducer from "../Book/BookReducer";
import authorReducer from "../Author/AuthorReducer";

const reducers = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  book: bookReducer,
  author: authorReducer,
});
export default reducers;
