import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Grid,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Table from "../../../components/Table";
import { FieldColumns } from "../../../assets/columns";
import { titles } from "../../../assets/titles";
import { getAllAdminFields, deleteField } from "../../../api";
import Snackbar from "../../../components/Snackbar";
import { snackbarTypes } from "../../../assets/snackbarTypes";

const useStyles = makeStyles({
  tables: {
    overflowY: "auto",
    position: "relative",
  },
  header: {
    padding: "0 2rem",
    marginTop: 0,
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    boxShadow: `1px 1px 10px 3px #aaaaaa`,
    textAlign: "center",
  },
});

export default function Home() {
  const classes = useStyles();

  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({});
  const [snack, setSnack] = useState({
    status: false,
    message: "",
    type: "",
  });

  const handleOpenSnack = (message, type) =>
    setSnack({
      status: true,
      message,
      type,
    });

  const handleCloseSnack = () =>
    setSnack({
      status: false,
      message: "",
      type: "",
    });

  const handleDeleteOpen = () => setDeleteOpen(true);

  const handleDeleteClose = () => {
    setClickedItem({});
    setDeleteOpen(false);
  };

  const handleDelete = () =>
    deleteField(clickedItem.id)
      .then((res) => handleOpenSnack(res, snackbarTypes.success))
      .then(GetAllAdminFields)
      .then(handleDeleteClose)
      .catch(
        ({
          response: {
            data: { error },
          },
        }) => handleOpenSnack(error, snackbarTypes.error)
      );

  const GetAllAdminFields = () => {
    setLoading(true);
    getAllAdminFields()
      .then(setFields)
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  useEffect(GetAllAdminFields, []);

  useEffect(() => (clickedItem.id ? handleDeleteOpen() : null), [clickedItem]);

  return (
    <Box className={classes.tables} height="100%" width="100%">
      <Snackbar
        message={snack.message}
        type={snack.type}
        handleClose={handleCloseSnack}
        open={snack.status}
      />
      <Box padding="2rem">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.header}
        >
          <h2>{titles.fields}</h2>
          <Button>
            {titles.add}
            <Add />
          </Button>
        </Grid>
      </Box>
      {loading ? (
        <LinearProgress />
      ) : fields.length === 0 ? (
        <h3 style={{ color: "red", textAlign: "center" }}>{titles.notFound}</h3>
      ) : (
        <Table
          columns={FieldColumns}
          data={fields}
          handleDelete={setClickedItem}
        />
      )}
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">تایید</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`آيا از پاک کردن ${clickedItem.name} مطمئن هستید؟`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteClose}
            style={{ marginRight: 10 }}
            variant="contained"
            color="secondary"
          >
            {titles.cancel}
          </Button>
          <Button
            onClick={handleDelete}
            style={{ marginRight: 10 }}
            variant="contained"
            color="primary"
          >
            {titles.accept}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
