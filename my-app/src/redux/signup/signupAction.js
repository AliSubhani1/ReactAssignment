import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./SignupTypes";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const performSignUp = (user, email, password) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("firebase user sign up section=", user);
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: user,
        });
        //dispatch(actionCreators.signUpSuccess(NewUser));
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        console.log("firebase sign up error code=", errorCode);
        dispatch({
          type: SIGNUP_FAILURE,
          payload: user,
        });
        //dispatch(actionCreators.signUpSuccess(NewUser));
        var errorMessage = error.message;
        console.log("firebase sign up error msg=", errorMessage);
      });
  };
};
