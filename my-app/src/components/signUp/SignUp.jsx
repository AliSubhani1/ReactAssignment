import React, { useState } from "react";
import Input from "@mui/material/Input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import fire from "../../Firebase";
import "./SignUp.css";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../redux/Signup/SignupAction";

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
      //dispatch here
      dispatch(actionCreators.performSignUp(NewUser, email, password));
    } else {
      setPasswordError("Error: Password Not Matched");
    }
    clearInputs();

    if (email && password && confirmPassword) {
      console.log(email, password, confirmPassword);
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    //console.log(email);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    //console.log(password);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    //console.log(password);
  };

  return (
    <div className="register-user">
      <h3>Register your account! </h3>
      <div className="text-fields">
        <div>
          <input
            onChange={(e) => {
              handleEmail(e);
            }}
            type="email"
            label="Email"
            placeholder="Email Address"
            required
            value={email}
          />
          {/* <p className="error-msg">{emailError}</p> */}
          <div className="error">{emailError}</div>
        </div>
        <div>
          <input
            onChange={(e) => {
              handlePassword(e);
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
              handleConfirmPassword(e);
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
