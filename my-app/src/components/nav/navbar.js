import "./navbar.css";
import { Redirect, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import fire from "../../firebase/firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
const Navbar = () => {
  const loginState = useSelector((state) => state.login);
  console.log("loginState from navabr=", loginState);
  const handleLogout = () => {
    loginState.isLogin = false;
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("firebase user signed out");
      })
      .catch((error) => {
        console.log("Firebase sign out error", error.message);
      });
  };

  if (loginState.isLogin) {
    <Redirect to="/home" />;

    return (
      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
            {/* <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              Logout
            </Link> */}
          </li>
        </ul>
      </nav>
    );
  } else {
    <Redirect to="/signin" />;
    return (
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
    );
  }
};

export default Navbar;
