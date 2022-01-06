import React, { useState } from "react";
import Input from "@mui/material/Input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import fire from "../../firebase/firebase";
import "./SignUp.css";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const handleSubmit = () => {
    clearErrors();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("firebase user sign up section=", user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        console.log("firebase sign up error code=", errorCode);
        var errorMessage = error.message;
        console.log("firebase sign up error msg=", errorMessage);
        switch (errorCode) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(errorMessage);
            break;
          case "auth/weak-password":
            setPasswordError(errorMessage);
            break;
        }
      });

    if (email && password && confirmPassword) {
      console.log(email, password, confirmPassword);
    }
  };
  return (
    <div className="register-user">
      <h3>Register your account! </h3>
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
        <div>
          <TextField
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              //console.log(password);
            }}
            placeholder="Confirm Password"
            label="Confirm Password"
            color="primary"
            focused
            type="password"
          />
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
