import * as React from "./node_modules/react";
import Button from "./node_modules/@mui/material/Button";
import TextField from "./node_modules/@mui/material/TextField";
import Dialog from "./node_modules/@mui/material/Dialog";
import DialogActions from "./node_modules/@mui/material/DialogActions";
import DialogContent from "./node_modules/@mui/material/DialogContent";
import DialogContentText from "./node_modules/@mui/material/DialogContentText";
import DialogTitle from "./node_modules/@mui/material/DialogTitle";
import * as actionCreators from "../../redux/Book/BookAction";
import FormControl from "./node_modules/@mui/material/FormControl";
import "./AddBook.css";
import { useSelector, useDispatch } from "./node_modules/react-redux";
import Select from "./node_modules/@mui/material/Select";
import InputLabel from "./node_modules/@mui/material/InputLabel";
import MenuItem from "./node_modules/@mui/material/MenuItem";
import Stack from "./node_modules/@mui/material/Stack";
import Snackbar from "./node_modules/@mui/material/Snackbar";
import MuiAlert from "./node_modules/@mui/material/Alert";

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

  console.log("redux books from add book file=", currentBooks);

  const currentAuthors = useSelector((state) => state.author);
  console.log("redux authors from add book=", currentAuthors);

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

  const handleClose = () => {
    setOpen(false);
    let currentBook = {
      author: bookAuthor,
      title: bookTitle,
      genre: bookGenre,
    };

    dispatch(actionCreators.addBook(currentBook));

    setOpenAlert(true);
    setBookAuthor("");
    setBookTitle("");
    setBookGenre("");
  };
  const CloseDialog = () => {
    setOpen(false);
    setBookAuthor("");
    setBookTitle("");
    setBookGenre("");
  };

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
            }}
            value={bookTitle}
          />
          <div className="select-author">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Author</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Author"
                onChange={(e) => {
                  setBookAuthor(e.target.value);
                }}
              >
                {currentAuthors.map((author) => {
                  return (
                    <MenuItem key={author.id} value={author.name}>
                      {author.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

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
