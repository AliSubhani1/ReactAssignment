import { combineReducers } from "redux";
import loginReducer from "../login/LoginReducer";
import signupReducer from "../signup/signupReducer";

const reducers = combineReducers({
  login: loginReducer,
  signup: signupReducer,
});
export default reducers;
