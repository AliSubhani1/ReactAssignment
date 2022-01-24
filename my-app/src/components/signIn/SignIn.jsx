import React, { useState, useEffect } from "./node_modules/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  onAuthStateChanged,
  browserSessionPersistence,
} from "./node_modules/firebase/auth";
import Button from "./node_modules/@mui/material/Button";
import fire from "../../Firebase";
import "./SignIn.css";
import { useDispatch } from "./node_modules/react-redux";
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
  };
  const handleLogin = () => {
    clearErrors();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch(actionCreators.logInSuccess(CurrentUser));

        console.log("Signed in to firebase");
        console.log(user);
        localStorage.setItem("isLoggedin", true);
      })
      .catch((error) => {
        console.log("error section of login");
        localStorage.setItem("isLoggedin", false);

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        dispatch(actionCreators.logInSuccess(CurrentUser));
      } else {
      }
    });
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        CurrentUser.isLogin = true;

        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        CurrentUser.isLogin = false;
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
  return (
    <div className="login">
      <h3>Already have an account? </h3>
      <div className="text-fields">
        <div>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
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
