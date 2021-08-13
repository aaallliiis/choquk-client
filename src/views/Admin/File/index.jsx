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
  CircularProgress,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Table from "../../../components/Table";
import { FileColumns } from "../../../assets/columns";
import { titles } from "../../../assets/titles";
import {
  getAllAdminFiles,
  getAllAdminFields,
  editFile,
  addFile,
  deleteFile,
} from "../../../api";
import Snackbar from "../../../components/Snackbar";
import { snackbarTypes } from "../../../assets/snackbarTypes";
import { errorsMessages } from "../../../assets/errorsMessages";
import { useRef } from "react";

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
    justifyContent: "space-between",
  },
  form: {
    direction: "column",
    alignItems: "center",
    justify: "space-around",
  },
});

export default function Files() {
  const classes = useStyles();
  const formRef = useRef();

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [fields, setFields] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
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

  const handleOpen = (item) => {
    setBtnLoading(false);
    setClickedItem(item);
    if (item.id)
      setCourses(fields.find(({ id }) => id === item.fieldId).courses);
    setOpen(true);
  };

  const handleClose = () => {
    setBtnLoading(false);
    setOpen(false);
    setClickedItem({});
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
    if (
      !clickedItem.title ||
      !clickedItem.description ||
      !clickedItem.type ||
      !clickedItem.fieldId ||
      !clickedItem.courseId ||
      !file
    )
      handleOpenSnack(errorsMessages.emptyField, snackbarTypes.error);
    else {
      const formData = new FormData(formRef.current);
      setBtnLoading(true);
      if (clickedItem.id) {
        editFile({ id: clickedItem.id, body: formData })
          .then((res) => handleOpenSnack(res, snackbarTypes.success))
          .then(GetAllAdminFiles)
          .then(handleClose)
          .catch(
            ({
              response: {
                data: { error },
              },
            }) => {
              setBtnLoading(false);
              Array.isArray(error)
                ? handleOpenSnack(error.join(":"), snackbarTypes.error)
                : handleOpenSnack(error, snackbarTypes.error);
            }
          );
      } else
        addFile(formData)
          .then((res) => handleOpenSnack(res, snackbarTypes.success))
          .then(GetAllAdminFiles)
          .then(handleClose)
          .catch(
            ({
              response: {
                data: { error },
              },
            }) => {
              setBtnLoading(false);
              Array.isArray(error)
                ? handleOpenSnack(error.join(":"), snackbarTypes.error)
                : handleOpenSnack(error, snackbarTypes.error);
            }
          );
    }
  };

  const handleFileChange = ({ target: { files } }) => {
    if (
      clickedItem.type === "PDF" &&
      !files[0].type.split("/").includes("pdf")
    ) {
      handleOpenSnack(errorsMessages.file, snackbarTypes.error);
      setFile(null);
      formRef.current.reset();
    } else if (
      clickedItem.type === "IMG" &&
      !files[0].type.split("/").includes("image")
    ) {
      handleOpenSnack(errorsMessages.file, snackbarTypes.error);
      setFile(null);
      formRef.current.reset();
    } else if (
      clickedItem.type === "VID" &&
      !files[0].type.split("/").includes("video")
    ) {
      handleOpenSnack(errorsMessages.file, snackbarTypes.error);
      setFile(null);
      formRef.current.reset();
    } else if (
      clickedItem.type === "VC" &&
      !files[0].type.split("/").includes("audio")
    ) {
      handleOpenSnack(errorsMessages.file, snackbarTypes.error);
      setFile(null);
      formRef.current.reset();
    } else if (!clickedItem.type)
      handleOpenSnack(errorsMessages.emptyField, snackbarTypes.error);
    else setFile(files[0]);
  };

  const handleDelete = () =>
    deleteFile(clickedItem.id)
      .then((res) => handleOpenSnack(res, snackbarTypes.success))
      .then(GetAllAdminFiles)
      .then(handleDeleteClose)
      .catch(
        ({
          response: {
            data: { error },
          },
        }) => handleOpenSnack(error, snackbarTypes.error)
      );

  const GetAllAdminFiles = () => {
    setLoading(true);
    getAllAdminFiles()
      .then(setFiles)
      .then(() => getAllAdminFields().then(setFields))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  useEffect(GetAllAdminFiles, []);

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
          <h2>{titles.files}</h2>
          <Button onClick={() => handleOpen({})}>
            {titles.add}
            <Add />
          </Button>
        </Grid>
      </Box>
      {loading ? (
        <LinearProgress />
      ) : files.length === 0 ? (
        <h3 style={{ color: "red", textAlign: "center" }}>{titles.notFound}</h3>
      ) : (
        <Table
          columns={FileColumns}
          data={files}
          handleCellClick={handleOpen}
          handleDelete={handleDeleteOpen}
        />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{ style: { borderRadius: "0.7rem" } }}
      >
        <DialogTitle id="form-dialog-title">
          {clickedItem.id ? titles.edit : titles.add}
        </DialogTitle>
        <DialogContent style={{ minWidth: 400, minHeight: 100 }}>
          <DialogContentText>
            <form ref={formRef} className={classes.form}>
              <div className={classes.inputDiv}>
                <label>{`${titles.name} ${titles.file}`} : </label>
                <input
                  className={classes.input}
                  name="title"
                  value={clickedItem.title ? clickedItem.title : ""}
                  onChange={({ target: { value } }) => {
                    setClickedItem((old) => ({ ...old, title: value }));
                  }}
                />
              </div>
              <div className={classes.inputDiv}>
                <label>{titles.description} : </label>
                <input
                  className={classes.input}
                  name="description"
                  value={clickedItem.description ? clickedItem.description : ""}
                  onChange={({ target: { value } }) => {
                    setClickedItem((old) => ({ ...old, description: value }));
                  }}
                />
              </div>
              <div className={classes.inputDiv}>
                <label>{titles.type} : </label>
                <Select
                  className={classes.select}
                  name="type"
                  value={clickedItem.type}
                  onChange={({ target: { value } }) =>
                    setClickedItem((old) => ({ ...old, type: value }))
                  }
                >
                  {titles.types.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className={classes.inputDiv}>
                <label>{`${titles.name} ${titles.field}`} : </label>
                <Select
                  className={classes.select}
                  name="fieldId"
                  value={clickedItem.fieldId}
                  onChange={({ target: { value } }) => {
                    setClickedItem((old) => ({ ...old, fieldId: value }));
                    setCourses(fields.find(({ id }) => id === value).courses);
                  }}
                >
                  {fields.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className={classes.inputDiv}>
                <label>{`${titles.name} ${titles.course}`} : </label>
                <Select
                  className={classes.select}
                  name="courseId"
                  value={clickedItem.courseId}
                  onChange={({ target: { value } }) =>
                    setClickedItem((old) => ({ ...old, courseId: value }))
                  }
                >
                  {courses.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className={classes.inputDiv}>
                <label>{titles.fileInput} : </label>
                <input
                  name="file"
                  type="file"
                  className={classes.input}
                  onChange={handleFileChange}
                />
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginBottom: 15 }}>
          {btnLoading ? (
            <CircularProgress size={25} style={{ marginLeft: 10 }} />
          ) : (
            <>
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
            </>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{ style: { borderRadius: "0.7rem" } }}
      >
        <DialogTitle id="form-dialog-title">تایید</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`آيا از پاک کردن ${clickedItem.title} مطمئن هستید؟`}
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
