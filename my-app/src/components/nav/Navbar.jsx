import "./navbar.css";
import React, { useState, useEffect } from "./node_modules/react";
import { Redirect, Link } from "./node_modules/react-router-dom";
import { useSelector } from "./node_modules/react-redux";
import { getAuth, signOut } from "./node_modules/firebase/auth";
const Navbar = () => {
  const loginState = useSelector((state) => state.login);
  console.log("loginState from navabr=", loginState);

  let [loginFlag, setLoginFlag] = useState(loginState.isLogin);
  const handleLogout = () => {
    setLoginFlag(false);
    loginState.isLogin = false;

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("firebase user signed out");
        localStorage.setItem("isLoggedin", false);
      })
      .catch((error) => {
        console.log("Firebase sign out error", error.message);
      });
  };
  if (loginState.isLogin) {
    loginFlag = true;
  }
  useEffect(() => {
    setLoginFlag(localStorage.getItem("isLoggedin"));
    if (loginFlag) {
      <Redirect to="/home" />;
    } else {
      <Redirect to="/signin" />;
    }
  }, []);

  console.log("login local storage", loginFlag);
  if (loginFlag) {
    return (
      <>
        {loginFlag && <Redirect to="/home" />}
        <Redirect to="/home" />;
        <nav className="main-menu">
          <ul>
            <li>
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "white" }}
              >
                Home
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
              {}
            </li>
          </ul>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <Redirect to="/signin" />;
        <nav className="main-menu">
          <ul>
            <li>
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
};

export default Navbar;
