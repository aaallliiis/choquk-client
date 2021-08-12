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
  Select,
  MenuItem,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Table from "../../../components/Table";
import { CourseColumns } from "../../../assets/columns";
import { titles } from "../../../assets/titles";
import {
  getAllAdminFields,
  getAllCourses,
  addCourse,
  editCourse,
  deleteCourse,
  getAllProfs,
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
  select: {
    position: "relative",
    backgroundColor: "transparent",
    width: "80%",
    borderBottom: 0,
    fontSize: "1.3rem",
    height: "2.7rem",
    "& svg": {
      fontSize: "1.8rem",
      top: "20%",
      right: "100% !important",
      transform: "translateX(100%)",
    },
  },
  inputDiv: {
    width: "100%",
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default function Courses() {
  const classes = useStyles();

  const [fields, setFields] = useState([]);
  const [profs, setProfs] = useState([]);
  const [courses, setCourses] = useState([]);
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
    if (!clickedItem.name || !clickedItem.fieldId || !clickedItem.profId)
      handleOpenSnack(errorsMessages.emptyField, snackbarTypes.error);
    else {
      if (clickedItem.id) {
        editCourse({ id: clickedItem.id, body: clickedItem })
          .then((res) => handleOpenSnack(res, snackbarTypes.success))
          .then(GetAllAdminCourses)
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
      } else
        addCourse(clickedItem)
          .then((res) => handleOpenSnack(res, snackbarTypes.success))
          .then(GetAllAdminCourses)
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
    deleteCourse(clickedItem.id)
      .then((res) => handleOpenSnack(res, snackbarTypes.success))
      .then(GetAllAdminCourses)
      .then(handleDeleteClose)
      .catch(
        ({
          response: {
            data: { error },
          },
        }) => handleOpenSnack(error, snackbarTypes.error)
      );

  const GetAllAdminCourses = () => {
    setLoading(true);
    getAllCourses()
      .then(setCourses)
      .then(() =>
        getAllAdminFields()
          .then(setFields)
          .then(() => getAllProfs().then(setProfs))
      )
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  useEffect(GetAllAdminCourses, []);

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
          <h2>{titles.courses}</h2>
          <Button onClick={() => handleOpen({})}>
            {titles.add}
            <Add />
          </Button>
        </Grid>
      </Box>
      {loading ? (
        <LinearProgress />
      ) : courses.length === 0 ? (
        <h3 style={{ color: "red", textAlign: "center" }}>{titles.notFound}</h3>
      ) : (
        <Table
          columns={CourseColumns}
          data={courses}
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
        <DialogContent style={{ minWidth: 400, minHeight: 100 }}>
          <DialogContentText>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="space-around"
            >
              <div className={classes.inputDiv}>
                <label>{`${titles.name} ${titles.course}`} : </label>
                <input
                  autoFocus
                  className={classes.input}
                  value={clickedItem.name ? clickedItem.name : ""}
                  onChange={({ target: { value } }) => {
                    setClickedItem((old) => ({ ...old, name: value }));
                  }}
                />
              </div>
              <div className={classes.inputDiv}>
                <label>{`${titles.name} ${titles.field}`} : </label>
                <Select
                  className={classes.select}
                  value={clickedItem.fieldId}
                  onChange={({ target: { value } }) =>
                    setClickedItem((old) => ({ ...old, fieldId: value }))
                  }
                >
                  {fields.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className={classes.inputDiv}>
                <label>{`${titles.name} ${titles.prof}`} : </label>
                <Select
                  className={classes.select}
                  value={clickedItem.profId}
                  onChange={({ target: { value } }) =>
                    setClickedItem((old) => ({ ...old, profId: value }))
                  }
                >
                  {profs.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
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
