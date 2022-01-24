import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as actionCreators from "../../redux/Author/AuthorAction";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AddAuthor = () => {
  const [open, setOpen] = React.useState(false);
  const [AuthorName, setAuthorName] = useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const AuthorsData = useSelector((state) => state.author);
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
  const colRef_Authors = collection(db, "authors");
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddAuthor = () => {
    setOpen(false);
    addDoc(colRef_Authors, {
      name: AuthorName,
    }).then(() => {
      console.log("new author to firestore");
      setOpenAlert(true);
    });
    AuthorsData.push({ name: AuthorName });
    setAuthorName("");
  };
  const CloseDialog = () => {
    setOpen(false);
    setAuthorName("");
  };

  dispatch(actionCreators.fetchAuthor());
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Author
      </Button>
      <Dialog open={open} onClose={CloseDialog}>
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
            onChange={(e) => {
              setAuthorName(e.target.value);
            }}
            value={AuthorName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddAuthor}>Add Author</Button>
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
              Author has been added!
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </>
  );
};

export default AddAuthor;
