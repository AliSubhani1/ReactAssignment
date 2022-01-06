import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import { createTheme } from "@mui/material/styles";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: {
      light: "#4dabf5",
      main: "#2196f3",
      dark: "#1769aa",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <nav className="main-menu">
            <ul>
              <li>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </li>
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

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/"></Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
