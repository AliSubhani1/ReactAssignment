import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./LoginTypes";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  onAuthStateChanged,
  browserSessionPersistence,
} from "firebase/auth";

// export const logInFail = (user) => {
//   return (dispatch) => {
//     dispatch({
//       type: LOGIN_FAILURE,
//       payload: user,
//     });
//   };
// };

export const performLogin = (user, email, password) => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        //dispatch(actionCreators.logInSuccess(CurrentUser));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
        console.log("Signed in to firebase");
        console.log(user);
        localStorage.setItem("isLoggedin", true);
      })
      .catch((error) => {
        console.log("error section of login");
        localStorage.setItem("isLoggedin", false);
        dispatch({
          type: LOGIN_FAILURE,
          payload: user,
        });
        //dispatch(actionCreators.logInFail(CurrentUser));
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error code=", errorCode);
        console.log("Error Message=", errorMessage);
      });
  };
};
