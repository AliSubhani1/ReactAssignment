import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "./SignupTypes";

export const signUpFail = (user) => {
  return (dispatch) => {
    dispatch({
      type: SIGNUP_FAIL,
      payload: user,
    });
  };
};

export const signUpSuccess = (user) => {
  return (dispatch) => {
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: user,
    });
  };
};
