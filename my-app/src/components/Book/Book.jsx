import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React, { useState, useEffect } from "react";
import "./Book.css";
import * as actionCreators from "../../redux/Book/BookAction";
import { useSelector, useDispatch } from "react-redux";

const Book = () => {
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");
  const [booksData, setBooksData] = useState(
    useSelector((state) => state.book)
  );

  const dispatch = useDispatch();

  let booksRedux = useSelector((state) => state.book);
  console.log("redux res in book js=", booksRedux);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const closeNav = () => {
    setShowDetailView(false);
  };

  dispatch(actionCreators.fetchBook());

  useEffect(() => {}, [booksRedux]);

  if (booksRedux) {
    return booksRedux.map((book) => {
      return (
        <div className="Books" key={book.id}>
          <Button
            className="button"
            variant="outlined"
            onClick={() => {
              setShowDetailView(true);
              setSelectedBook(book);
            }}
          >
            {book.title}
          </Button>

          {showDetailView && selectedBook && (
            <div id="mySidenav" className="sidenav">
              <a className="closebtn" onClick={closeNav}>
                &times;
              </a>

              <h2> Book: {selectedBook.title}</h2>
              <h4>Author: {selectedBook.author}</h4>
              <h4>Genre: {selectedBook.genre}</h4>

              <div className="del-btn">
                <Button
                  className="delete-btn"
                  variant="contained"
                  onClick={() => {
                    dispatch(actionCreators.removeBook(selectedBook));

                    const filteredBooks = booksRedux.filter(
                      (book) =>
                        book.author != selectedBook.author &&
                        book.id !== selectedBook.id
                    );

                    booksRedux = filteredBooks;
                    console.log("filtered new=", booksRedux);
                    setOpenAlert(true);
                  }}
                >
                  Delete Book
                </Button>
              </div>
              <p>Other books by same author:</p>
              {booksRedux
                .filter(
                  (book) =>
                    book.author == selectedBook.author &&
                    book.title !== selectedBook.title
                )
                .map((NewBooks) => {
                  return <h4 key={NewBooks.id}>{NewBooks.title}</h4>;
                })}
            </div>
          )}

          {openAlert && (
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Book has been deleted!
                </Alert>
              </Snackbar>
            </Stack>
          )}
        </div>
      );
    });
  } else {
    return null;
  }
};

export default Book;
