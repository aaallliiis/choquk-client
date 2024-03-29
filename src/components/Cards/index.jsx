import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  main: {
    width: "13%",
    margin: 10,
    height: 125,
    position: "relative",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
  title: {
    fontFamily: "vazir-regular",
    fontSize: 18,
    fontWeight: "bold",
    margin: 2,
    userSelect: "none",
  },
  description: {
    fontFamily: "vazir-regular",
    fontSize: 16,
    margin: "7px 10px 0px 0px",
    userSelect: "none",
  },
  type: {
    position: "absolute",
    fontSize: 14,
    marginBottom: 0,
    bottom: 10,
    right: 14,
  },
});

export default function MediaCard({ item: { id, title, type, description } }) {
  const classes = useStyles();
  const { push } = useHistory();

  return (
    <Card className={classes.main} onClick={() => push(`/file/${id}`)}>
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        className={classes.title}
      >
        {title}
      </Typography>
      <Typography
        gutterBottom
        variant="div"
        component="div"
        className={classes.description}
      >
        {description}
      </Typography>
      <Typography
        gutterBottom
        variant="div"
        component="div"
        className={classes.type}
      >
        نوع :{" "}
        {type === "PDF"
          ? "پی دی اف"
          : type === "IMG"
          ? "عکس"
          : type === "VID"
          ? "فیلم"
          : type === "VC"
          ? "صوت"
          : null}
      </Typography>
    </Card>
  );
}
