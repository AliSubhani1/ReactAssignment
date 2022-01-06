import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import fire from "../../firebase/firebase";
import "./SignIn.css";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
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
        console.log("Signed in to firebase");
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log("error section of login");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error code=", errorCode);
        console.log("Error Message=", errorMessage);
        switch (errorCode) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(errorMessage);
            break;
          case "auth/wrong-password":
            setPasswordError(errorMessage);
            break;
        }
      });

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
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
              //console.log(email);
            }}
            placeholder="Email Address"
            label="Email"
            color="primary"
            focused
            type="email"
          />
        </div>
        <div>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
              //console.log(password);
            }}
            placeholder="Password"
            label="Password"
            color="primary"
            focused
            type="password"
          />
        </div>
      </div>
      <div className="login-btn">
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
