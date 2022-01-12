import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const AddAuthor = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Author
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add an author</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter name of an author below.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Author Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add Author</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAuthor;
