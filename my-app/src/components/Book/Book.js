import data from "../BooksData/BooksData";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import "./Book.css";
const Book = () => {
  // [id, img, title, author, genre] = data;
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");
  let titles = data.title;
  const closeNav = () => {
    setShowDetailView(false);
  };
  return data.map((book) => {
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

        {/* <h2 className="title">{book.title}</h2> */}
        {showDetailView && selectedBook && (
          <div id="mySidenav" className="sidenav">
            <a className="closebtn" onClick={closeNav}>
              &times;
            </a>

            <h2> Book: {selectedBook.title}</h2>
            <h4>Author: {selectedBook.author}</h4>
            <h4>Genre: {selectedBook.genre}</h4>
            <p>Other books by same author:</p>
            {data
              .filter(
                (book) =>
                  book.author == selectedBook.author &&
                  book.title !== selectedBook.title
              )
              .map((NewBooks) => {
                return <h4>{NewBooks.title}</h4>;
              })}
          </div>
        )}
      </div>
    );
  });
};

export default Book;
