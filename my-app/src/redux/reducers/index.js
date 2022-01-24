import { combineReducers } from "./node_modules/redux";
import loginReducer from "../login/LoginReducer";
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
