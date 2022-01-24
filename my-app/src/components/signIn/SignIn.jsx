import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Button from "@mui/material/Button";

import "./SignIn.css";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../redux/Login/LoginAction";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();

  const [userError, setUserError] = useState("");
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const CurrentUser = {
    isLogin: false,
    email: email,
    password: password,
  };
  const handleLogin = () => {
    clearErrors();

    const auth = getAuth();
    dispatch(actionCreators.performLogin(CurrentUser, email, password));
    clearInputs();
    if (email && password) {
      console.log(email, password);
    }
  };

  const authListener = () => {
    if (user) {
      clearInputs();
      setUser(user);
    } else {
      setUser("");
    }
  };
  useEffect(() => {
    authListener();
  }, []);
  const handleEmail = (e) => {
    {
      setEmail(e.target.value);
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {}, []);
  return (
    <div className="login">
      <h3>Already have an account? </h3>
      <div className="text-fields">
        <div>
          <input
            onChange={(e) => {
              handleEmail(e);
            }}
            type="email"
            label="Email"
            placeholder="Email Address"
            value={email}
            required
          />
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
      </div>
      <div className="login-btn">
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <div className="error">{userError}</div>
      </div>
    </div>
  );
};

export default SignIn;
