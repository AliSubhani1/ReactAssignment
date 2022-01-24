import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import { createTheme } from "@mui/material/styles";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Book from "./Components/Book/Book";
import Navbar from "./Components/Nav/Navbar";
import AddBook from "./Components/AddBook/AddBook";
import AddAuthor from "./Components/AddAuthor/AddAuthor";
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
