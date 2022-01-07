import { LOGIN_SUCCESS, LOGIN_FAIL } from "./LoginTypes";
export const logInFail = (user) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_FAIL,
      payload: user,
    });
  };
};

export const logInSuccess = (user) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  };
};
