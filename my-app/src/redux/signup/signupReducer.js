import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./SignupTypes";

const registerUser = {
  isRegistered: false,
};

const signupReducer = (state = registerUser, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        isRegistered: true,
      };
    case SIGNUP_FAILURE:
      return {
        isRegistered: false,
      };
    default:
      return state;
  }
};

export default signupReducer;
