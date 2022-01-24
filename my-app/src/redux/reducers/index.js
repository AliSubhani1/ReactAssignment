import { combineReducers } from "redux";
import loginReducer from "../Login/LoginReducer";
import signupReducer from "../Signup/SignupReducer";
import bookReducer from "../Book/BookReducer";
import authorReducer from "../Author/AuthorReducer";

const reducers = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  book: bookReducer,
  author: authorReducer,
});
export default reducers;
