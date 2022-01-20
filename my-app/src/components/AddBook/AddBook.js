import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as actionCreators from "../../redux/Book/BookAction";
import FormControl from "@mui/material/FormControl";
import "./AddBook.css";
import { useSelector, useDispatch } from "react-redux";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AddBook = () => {
  const [open, setOpen] = React.useState(false);
  const [bookTitle, setBookTitle] = React.useState("");
  const [bookAuthor, setBookAuthor] = React.useState("");
  const [bookGenre, setBookGenre] = React.useState("");

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const currentBooks = useSelector((state) => state.book);
  const currentAuthors = useSelector((state) => state.author);
  console.log("redux authors from add book=", currentAuthors);
  console.log("redux books from add book file=", currentBooks);

  const [openAlert, setOpenAlert] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const db = getFirestore();
  const colRef_Books = collection(db, "books");
  const handleClose = () => {
    setOpen(false);
    let currentBook = {
      author: bookAuthor,
      title: bookTitle,
      genre: bookGenre,
    };
    // let updatedArr = currentBooks.push(currentBook);
    // dispatch(actionCreators.addBook(currentBook));
    addDoc(colRef_Books, {
      author: bookAuthor,
      title: bookTitle,
      genre: bookGenre,
    }).then(() => {
      console.log("new book added to firestore");
      setOpenAlert(true);
      setBookAuthor("");
      setBookTitle("");
      setBookGenre("");
    });
  };
  const CloseDialog = () => {
    setOpen(false);
    setBookAuthor("");
    setBookTitle("");
    setBookGenre("");
  };
  // const [curAuthors] =  ...currentAuthors ;
  // console.log("cur=", curAuthors);
  return (
    <div className="add-book">
      <Button
        className="btn-add-book"
        variant="contained"
        onClick={handleClickOpen}
      >
        Add Book
      </Button>
      <Dialog open={open} onClose={CloseDialog}>
        <DialogTitle>Add new book</DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText>
            Please enter the title, genre and author of book below.
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Book Title"
            type="text"
            fullWidth
            required
            variant="standard"
            onChange={(e) => {
              setBookTitle(e.target.value);
              //console.log(email);
            }}
            value={bookTitle}
          />
          <div className="select-author">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Author</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value=
                label="Author"
                onChange={(e) => {
                  setBookAuthor(e.target.value);
                  //console.log(email);
                }}
              >
                {
                  currentAuthors.map((author) => {
                    return (
                      <MenuItem key={author.id} value={author.name}>
                        {author.name}
                      </MenuItem>
                    );
                  })

                  // {currentAuthors.map((author) => {
                  //   return (
                  //     <div key={author.id}>
                  //       <MenuItem value={author}>{author}</MenuItem>
                  //     </div>
                  //   );
                  // })}
                }
              </Select>
            </FormControl>
          </div>
          {/* <TextField
            margin="dense"
            id="Author"
            label="Author Name"
            type="text"
            fullWidth
            required
            variant="standard"
            onChange={(e) => {
              setBookAuthor(e.target.value);
              //console.log(email);
            }}
            value={bookAuthor}
          /> */}
          <TextField
            margin="dense"
            id="Genre"
            label="Genre"
            type="text"
            fullWidth
            required
            variant="standard"
            onChange={(e) => {
              setBookGenre(e.target.value);
              //console.log(email);
            }}
            value={bookGenre}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add Book</Button>
        </DialogActions>
      </Dialog>
      {openAlert && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity="success"
              sx={{ width: "100%" }}
            >
              Book has been added!
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </div>
  );
};
export default AddBook;
