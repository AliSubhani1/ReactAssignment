import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AuthorsData from "../../components/AuthorsData/AuthorsData";
import data from "../BooksData/BooksData";
import "./AddBook.css";
const AddBook = () => {
  const addBook = () => {
    //store the new book details to data list and then clear the values
    setBookName("");
    setGenre("");
    setAuthor("");
  };
  const addAuthor = () => {
    setNewAuthor("");
  };
  const openAuthorForm = () => {
    document.getElementById("Author-form").style.display = "block";
    document.getElementById("open-author-btn").style.display = "none";
    document.getElementById("add-author").scrollIntoView();
  };
  const closeAuthorForm = () => {
    document.getElementById("Author-form").style.display = "none";
    document.getElementById("open-author-btn").style.display = "block";
  };
  const closeForm = () => {
    document.getElementById("book-form").style.display = "none";
    document.getElementById("open-form-btn").style.display = "block";
  };
  const openForm = () => {
    document.getElementById("book-form").style.display = "block";
    document.getElementById("open-form-btn").style.display = "none";
    document.getElementById("add-book").scrollIntoView();
  };
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  return (
    <div className="main">
      <form id="book-form">
        <div className="add-book">
          <h3>Add New Book </h3>
          <div className="text-fields">
            <div>
              <input
                onChange={(e) => {
                  setBookName(e.target.value);
                  console.log(bookName);
                }}
                type="text"
                label="Book Name"
                placeholder="Book Name"
                value={bookName}
                required
              />
              {/* <div className="error">{emailError}</div> */}
            </div>
            <div>
              <input
                onChange={(e) => {
                  setGenre(e.target.value);
                  console.log(genre);
                }}
                placeholder="Genre"
                label="Genre"
                type="text"
                value={genre}
              />
              {/* <div className="error">{passwordError}</div> */}
            </div>
            <div>
              <input
                onChange={(e) => {
                  setAuthor(e.target.value);
                  console.log(author);
                }}
                placeholder="Author"
                label="Author"
                type="Author"
                value={author}
              />
              {/* <div className="error">{passwordError}</div> */}
            </div>
          </div>
          <div className="login-btn" id="add-book">
            <Button variant="contained" onClick={addBook}>
              Add Book
            </Button>
          </div>
          <div className="login-btn">
            <Button variant="contained" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </div>
      </form>

      <form id="Author-form">
        <div className="add-author">
          <h3>Add New Author </h3>
          <div className="text-fields">
            <div>
              <input
                onChange={(e) => {
                  setNewAuthor(e.target.value);
                  console.log(newAuthor);
                }}
                type="text"
                label="Author Name"
                placeholder="Author Name"
                value={newAuthor}
                required
              />
            </div>
          </div>
          <div className="login-btn" id="add-author">
            <Button variant="contained" onClick={addAuthor}>
              Add Author
            </Button>
          </div>
          <div className="login-btn">
            <Button variant="contained" onClick={closeAuthorForm}>
              Cancel
            </Button>
          </div>
        </div>
      </form>

      <div className="login-btn" id="open-form-btn">
        <Button
          className="w3-button w3-xlarge w3-circle w3-blue w3-card-4"
          variant="contained"
          onClick={openForm}
        >
          +
        </Button>
      </div>
      <div className="login-btn" id="open-author-btn">
        <Button variant="contained" onClick={openAuthorForm}>
          Add Author
        </Button>
      </div>
    </div>
  );
};

export default AddBook;
