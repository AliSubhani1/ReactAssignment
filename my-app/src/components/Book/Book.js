import data from "../BooksData/BooksData";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import React, { useState, useEffect, useCallback } from "react";
// import { AllBooks } from "../../firebase/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./Book.css";
import * as actionCreators from "../../redux/Book/BookAction";
import { useSelector, useDispatch } from "react-redux";

const Book = () => {
  // [id, img, title, author, genre] = data;
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");
  const [booksData, setBooksData] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(true);
  const dispatch = useDispatch();
  let titles = data.title;

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
  //initialise db variable
  const db = getFirestore();
  let PrevBooksData = [];
  //collection ref
  const colRef_Books = collection(db, "books");
  // const currentBooks = useSelector((state) => state.book);

  //const querySnapshot = await getDocs(collection(db, "books"));
  //dispatch(actionCreators.fetchBook(booksData));
  let books = [];

  const fetchData = useCallback(() => {
    getDocs(colRef_Books)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        setBooksData(books);
        setLoadingFlag(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [colRef_Books]);
  useEffect(() => {
    fetchData();
  }, [booksData]);

  // useEffect(() => {
  //   dispatch(actionCreators.fetchBook(booksData));
  // }, []);

  const fetchDataa = useCallback(() => {
    dispatch(actionCreators.fetchBook(booksData));
  }, [colRef_Books]);

  //dispatch(actionCreators.fetchBook(booksData));
  // const reduxBooks = useSelector((state) => state.book);
  // console.log("redux books=", reduxBooks);
  //console.log("Books dataaaa=", booksData);
  return booksData.map((book) => {
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
                  const docref = doc(db, "books", selectedBook.id);
                  deleteDoc(docref).then(() => {
                    console.log("book deleted");
                  });
                  dispatch(actionCreators.removeBook(selectedBook));

                  const filteredBooks = booksData.filter(
                    (book) =>
                      book.author != selectedBook.author &&
                      book.id !== selectedBook.id
                  );
                  setBooksData(filteredBooks);
                  setOpenAlert(true);
                }}
              >
                Delete Book
              </Button>
            </div>
            <p>Other books by same author:</p>
            {booksData
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
};

export default Book;
