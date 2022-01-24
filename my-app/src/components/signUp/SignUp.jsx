import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Button from "@mui/material/Button";
import "./SignUp.css";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../../redux/signup/signupAction";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupState = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const NewUser = {
    isRegistered: false,
  };
  const handleSubmit = () => {
    clearErrors();
    const auth = getAuth();
    console.log("redux register value=", signupState);
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("firebase user sign up section=", user);
          NewUser.isRegistered = true;
          dispatch(actionCreators.signUpSuccess(NewUser));
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          console.log("firebase sign up error code=", errorCode);
          NewUser.isRegistered = false;
          dispatch(actionCreators.signUpSuccess(NewUser));
          var errorMessage = error.message;
          console.log("firebase sign up error msg=", errorMessage);
          switch (errorCode) {
            case "auth/email-already-in-use":
              setEmailError("Error: Email already in use");
              break;
            case "auth/invalid-email":
              setEmailError("Error: Invalid Email");
              break;
            case "auth/weak-password":
              setPasswordError("Error: Weak Password");
              break;
          }
        });
    } else {
      setPasswordError("Error: Password Not Matched");
    }
    clearInputs();

    if (email && password && confirmPassword) {
      console.log(email, password, confirmPassword);
    }
  };
  return (
    <div className="register-user">
      <h3>Register your account! </h3>
      <div className="text-fields">
        <div>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            label="Email"
            placeholder="Email Address"
            required
            value={email}
          />

          <div className="error">{emailError}</div>
        </div>
        <div>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            label="Password"
            type="password"
            value={password}
          />
          <div className="error">{passwordError}</div>
        </div>
        <div>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm Password"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
          />
          <div className="error">{passwordError}</div>
        </div>
      </div>
      <div className="login-btn">
        <Button variant="contained" onClick={handleSubmit}>
          Register User
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
