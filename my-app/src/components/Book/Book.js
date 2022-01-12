import data from "../BooksData/BooksData";
import "./Book.css";
const Book = () => {
  // [id, img, title, author, genre] = data;
  let titles = data.title;
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  return data.map((book) => {
    return (
      <div className="Books" key={book.id}>
        <img
          className="Image"
          src={book.img}
          alt={book.title}
          onClick={
            () => {
              document.getElementById("mySidenav").style.width = "500px";
            }
            // console.log(
            //   "title=",
            //   book.title,
            //   "Author=",
            //   book.author,
            //   "Genre=",
            //   book.genre
            // )
          }
        />
        <h2 className="title">{book.title}</h2>
        {/* {showDetailView && selectedBook && (
          <div id="mySidenav" className="sidenav">
            <a className="closebtn" onClick={closeNav}>
              &times;
            </a>
            <p>{book.img}</p>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.genre}</p>
          </div>
        )} */}
      </div>
    );
  });
};

export default Book;
