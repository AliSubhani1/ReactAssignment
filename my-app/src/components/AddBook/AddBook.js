import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./AddBook.css";

const AddBook = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title, genre and author of book below.
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Book Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="Author"
            label="Author Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="Genre"
            label="Genre"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add Book</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddBook;
