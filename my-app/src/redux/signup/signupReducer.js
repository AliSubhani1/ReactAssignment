import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "./SignupTypes";

const registerUser = {
  isRegistered: false,
};

const signupReducer = (state = registerUser, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        // ...state,
        // numOfCakes: state.numOfCakes - 1,
        isRegistered: true,
      };
    case SIGNUP_FAIL:
      return {
        isRegistered: false,
      };
    default:
      return state;
  }
};

export default signupReducer;
