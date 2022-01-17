import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as actionCreators from "../../redux/Author/AuthorAction";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
const AddAuthor = () => {
  const [open, setOpen] = React.useState(false);
  const [AuthorsData, setAuthorsData] = useState([]);
  const [AuthorName, setAuthorName] = useState([]);
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

  //initialise db variable
  const db = getFirestore();

  //collection ref
  const colRef_Authors = collection(db, "authors");
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    addDoc(colRef_Authors, {
      name: AuthorName,
    }).then(() => {
      console.log("new author to firestore");
      setOpenAlert(true);
    });
    AuthorsData.push(AuthorName);
    dispatch(actionCreators.fetchAuthor(AuthorsData));
    setAuthorName("");
  };
  const CloseDialog = () => {
    setOpen(false);
    setAuthorName("");
  };
  //const querySnapshot = await getDocs(collection(db, "books"));
  let authors = [];
  useEffect(() => {
    getDocs(colRef_Authors)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          authors.push({ ...doc.data(), id: doc.id });
        });
        setAuthorsData(authors);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log("latest authors=", AuthorsData);
  dispatch(actionCreators.fetchAuthor(AuthorsData));
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
            onChange={(e) => {
              setAuthorName(e.target.value);
              //console.log(email);
            }}
            value={AuthorName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add Author</Button>
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
