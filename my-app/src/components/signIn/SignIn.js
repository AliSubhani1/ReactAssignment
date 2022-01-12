import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import fire from "../../firebase/firebase";
import { Route, Redirect, useHistory } from "react-router-dom";
import "./SignIn.css";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../redux/login/LoginAction";

const SignIn = () => {
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();
  // const [hasAccount, setHasAccount] = useState(false);
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
  };
  const handleLogin = () => {
    clearErrors();

    const auth = getAuth();

    // fire
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        CurrentUser.isLogin = true;
        dispatch(actionCreators.logInSuccess(CurrentUser));

        console.log("Signed in to firebase");
        console.log(user);
        <Redirect to="/home" />;
        // ...
      })
      .catch((error) => {
        console.log("error section of login");
        CurrentUser.isLogin = false;
        dispatch(actionCreators.logInFail(CurrentUser));
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error code=", errorCode);
        console.log("Error Message=", errorMessage);
        switch (errorCode) {
          case "auth/invalid-email":
            setEmailError("Error: Invalid Email");
            break;
          case "auth/user-disabled":
            setUserError("Error: User Disabled");
            break;
          case "auth/user-not-found":
            setUserError("Error: User not found");
            break;
          case "auth/wrong-password":
            setPasswordError("Error: Wrong Password");
            break;
        }
      });
    if (CurrentUser.isLogin) {
      <Redirect to="/home" />;
    }
    clearInputs();
    if (email && password) {
      console.log(email, password);
    }
  };

  const handleLogout = () => {
    fire.auth().signout();
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
  return (
    <div className="login">
      <h3>Already have an account? </h3>
      <div className="text-fields">
        <div>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              //console.log(email);
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
              setPassword(e.target.value);
              //console.log(password);
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
