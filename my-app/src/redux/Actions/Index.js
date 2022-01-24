import * as AuthorActions from "../Author/AuthorAction";
import * as BookActions from "../Book/BookAction";
import * as LoginActions from "../Login/LoginAction";
import * as SignupActions from "../Signup/SignupAction";
export const ActionsCreator = Object.assign(
  {},
  AuthorActions,
  BookActions,
  LoginActions,
  SignupActions
);
