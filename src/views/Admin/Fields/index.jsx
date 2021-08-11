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
import {
  getAllAdminFields,
  deleteField,
  addField,
  editField,
} from "../../../api";
import Snackbar from "../../../components/Snackbar";
import { snackbarTypes } from "../../../assets/snackbarTypes";
import { errorsMessages } from "../../../assets/errorsMessages";
import "./style.css";

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
  input: {
    outline: "none",
    padding: "2%",
    borderRadius: "0.5rem",
    width: "75%",
    border: `1px solid #333333`,
    fontSize: "1rem",
    "&:focus": {
      border: `1px solid #555555`,
    },
  },
});

export default function Fields() {
  const classes = useStyles();

  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({ name: "asdf" });
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

  const handleOpen = (item) => {
    setClickedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setClickedItem({});
    setOpen(false);
  };

  const handleDeleteOpen = (item) => {
    setClickedItem(item);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setClickedItem({});
    setDeleteOpen(false);
  };

  const handleAdd = () => {
    if (!clickedItem.name)
      handleOpenSnack(errorsMessages.emptyField, snackbarTypes.error);
    else {
      if (clickedItem.id)
        editField({ id: clickedItem.id, body: clickedItem })
          .then((res) => handleOpenSnack(res, snackbarTypes.success))
          .then(GetAllAdminFields)
          .then(handleClose)
          .catch(
            ({
              response: {
                data: { error },
              },
            }) =>
              Array.isArray(error)
                ? handleOpenSnack(error.join(":"), snackbarTypes.error)
                : handleOpenSnack(error, snackbarTypes.error)
          );
      else
        addField(clickedItem)
          .then((res) => handleOpenSnack(res, snackbarTypes.success))
          .then(GetAllAdminFields)
          .then(handleClose)
          .catch(
            ({
              response: {
                data: { error },
              },
            }) =>
              Array.isArray(error)
                ? handleOpenSnack(error.join(":"), snackbarTypes.error)
                : handleOpenSnack(error, snackbarTypes.error)
          );
    }
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
          <Button onClick={() => handleOpen({})}>
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
          handleCellClick={handleOpen}
          handleDelete={handleDeleteOpen}
        />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {clickedItem.id ? titles.edit : titles.add}
        </DialogTitle>
        <DialogContent style={{ minWidth: 300, minHeight: 70 }}>
          <DialogContentText>
            <Grid container alignItems="center" justify="space-around">
              <label>{titles.name} : </label>
              <input
                autoFocus
                className={classes.input}
                value={clickedItem.name ? clickedItem.name : ""}
                onChange={({ target: { value } }) => {
                  setClickedItem((old) => ({ ...old, name: value }));
                }}
              />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginBottom: 15 }}>
          <Button
            onClick={handleClose}
            style={{ marginRight: 10 }}
            variant="contained"
            color="secondary"
          >
            {titles.cancel}
          </Button>
          <Button
            onClick={handleAdd}
            style={{ marginRight: 10 }}
            variant="contained"
            color="primary"
          >
            {titles.accept}
          </Button>
        </DialogActions>
      </Dialog>
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
        <DialogActions style={{ marginBottom: 15 }}>
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
