import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./LoginTypes";

const user = {
  isLogin: false,
};

const loginReducer = (state = user, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLogin: true,
      };
    case LOGIN_FAILURE:
      return {
        isLogin: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
