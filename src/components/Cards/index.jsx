import React,{useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  main: {
    width:'13%',
    margin:10,
    height:125,
    position:"relative",
    padding:'1.5rem',
    borderRadius:'2rem',
    cursor:'pointer',
  },
});

export default function MediaCard(){
  const classes = useStyles();

  return (
    <Card className={classes.main}>
      <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
        das
      </Typography>
    </Card>
  );
}
