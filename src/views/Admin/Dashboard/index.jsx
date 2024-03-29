import React, { useEffect, useState } from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  Redirect,
  Link,
  useLocation,
} from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core";
import Nav from "../../../components/AdminNavBar";
import Fields from "../Fields";
import Courses from "../Courses";
import Profs from "../Profs";
import File from "../File";
import Orientation from "../Orientation";
import { titles } from "../../../assets/titles";

const useStyles = makeStyles({
  page: {
    overflow: "hidden",
    backgroundColor: "#E8F3F6",
  },
  main: {
    display: "flex",
  },
  sidebar: {
    marginTop: 20,
    backgroundColor: "transparent",
    overflowX: "hidden",
    overflowY: "auto",
    padding: "10px 0px 10px 10px",
    paddingBottom: 50,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  left_box: {
    backgroundColor: "transparent",
  },
  links: {
    width: "80%",
    height: "10%",
    padding: 5,
    backgroundColor: "#FCFCFC",
    borderRadius: "30px 0 0 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    textDecoration: "none",
  },
  active: {
    boxShadow: "0px 0px 20px -3px #aaaaaa ",
  },
});

export default function Home() {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const classes = useStyles();

  const [active, setActive] = useState();

  useEffect(() => setActive(pathname.split("/")[3]), [pathname]);

  return (
    <Box className={classes.page} height="100%" width="100%">
      <Box className={classes.navbar} height="8%" width="100%">
        <Nav />
      </Box>
      <Box className={classes.main} height="92%" width="100%">
        <Box className={classes.sidebar} height="100%" width="14%">
          <Link
            to={`${path}/field`}
            className={`${classes.links} ${
              active === "field" && classes.active
            }`}
          >
            {titles.fields}
          </Link>
          <Link
            to={`${path}/orientation`}
            className={`${classes.links} ${
              active === "orientation" && classes.active
            }`}
          >
            {titles.orientations}
          </Link>
          <Link
            to={`${path}/prof`}
            className={`${classes.links} ${
              active === "prof" && classes.active
            }`}
          >
            {titles.profs}
          </Link>
          <Link
            to={`${path}/course`}
            className={`${classes.links} ${
              active === "course" && classes.active
            }`}
          >
            {titles.courses}
          </Link>
          <Link
            to={`${path}/file`}
            className={`${classes.links} ${
              active === "file" && classes.active
            }`}
          >
            {titles.files}
          </Link>
        </Box>
        <Box className={classes.left_box} height="100%" width="86%">
          <Switch>
            <Route exact path={`${path}`}>
              <Redirect to={`${path}/field`} />
            </Route>
            <Route path={`${path}/field`}>
              <Fields />
            </Route>
            <Route path={`${path}/orientation`}>
              <Orientation />
            </Route>
            <Route path={`${path}/prof`}>
              <Profs />
            </Route>
            <Route path={`${path}/course`}>
              <Courses />
            </Route>
            <Route path={`${path}/file`}>
              <File />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Box>
  );
}
