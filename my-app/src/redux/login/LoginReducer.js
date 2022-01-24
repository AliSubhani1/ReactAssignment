import { LOGIN_SUCCESS, LOGIN_FAIL } from "./LoginTypes";

const user = {
  isLogin: false,
};

const loginReducer = (state = user, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLogin: true,
      };
    case LOGIN_FAIL:
      return {
        isLogin: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
