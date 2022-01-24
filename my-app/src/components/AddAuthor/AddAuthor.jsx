import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as actionCreators from "../../redux/Author/AuthorAction";
//import { actionCreators } from "../../redux/Actions/Index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AddAuthor = () => {
  const [open, setOpen] = React.useState(false);
  const [authorName, setAuthorName] = useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const authorsData = useSelector((state) => state.author);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const db = getFirestore();

  const collectionAuthors = collection(db, "authors");
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const addAuthorAndCloseDialog = () => {
    setOpen(false);

    setOpenAlert(true);
    authorsData.push({ name: authorName });
    dispatch(actionCreators.addAuthor(authorName, authorsData));
    console.log("new authors=", authorsData);
    setAuthorName("");
  };
  const CloseDialog = () => {
    setOpen(false);
    setAuthorName("");
  };
  useEffect(() => {
    dispatch(actionCreators.fetchAuthor());
  }, [authorName]);
  const handleChange = (e) => {
    setAuthorName(e.target.value);
    //console.log(email);
  };
  return (
    <div>
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
            onChange={(e) => handleChange(e)}
            value={authorName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addAuthorAndCloseDialog}>Add Author</Button>
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
    </div>
  );
};

export default AddAuthor;
