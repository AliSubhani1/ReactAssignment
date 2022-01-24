import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import { createTheme } from "@mui/material/styles";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Book from "./components/Book/Book";
import Navbar from "./components/nav/navbar";
import AddBook from "./components/AddBook/AddBook";
import AddAuthor from "./components/AddAuthor/AddAuthor";
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
  const loginState = useSelector((state) => state.login);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/home">
              <div className="book-list">
                <Book />
                <div className="add-data">
                  <AddBook />
                  <AddAuthor />
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
