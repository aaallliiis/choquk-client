import React, { useEffect, useState } from "react";
import { Box, Divider, makeStyles, Grid, Button } from "@material-ui/core";
import Nav from "../../../components/NavBar";
import Cards from "../../../components/Cards";
import { getAllFields, getAllFiles, getAllProf } from "../../../api";
import SearchBox from "../../../components/SearchBox";
import ShowMore from "../../../components/ShowMore";
import { titles } from "../../../assets/titles";

const useStyles = makeStyles({
  page: {
    backgroundColor: "rgb(232, 243, 246)",
    overflow: "hidden",
  },
  main: {
    display: "flex",
  },
  tree: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  left_sidebar: {
    overflowX: "hidden",
    overflowY: "auto",
    padding: 10,
    paddingBottom: 50,
    boxSizing: "border-box",
    "&::-webkit-scrollbar": {
      height: "1.2vh",
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      background: "#cccccc",
      borderRadius: 20,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#AAAAAA",
      borderRadius: 20,
    },
  },
  right: {
    backgroundColor: "transparent",
    boxShadow: "-1px -10px 20px 0px #aaaaaa inset",
  },
  active: {
    backgroundColor: "#Dbe0e5",
  },
  fieldBtn: {
    width: "100%",
    margin: "5px 25px 0px 0px",
    border: "1px 0px 1px 0px solid red",
    marginRight: 5,
    marginTop: 10,
  },
  courseBtn: {
    width: "91%",
    margin: "5px 25px 0px 0px",
    border: "1px 0px 1px 0px solid red",
  },
  fieldDiv: {
    width: "100%",
    textAlign: "right",
    fontWeight: "bold",
  },
  courseDiv: {
    width: "100%",
    textAlign: "right",
  },
  cardBox: {
    display: "flex",
    flexWrap: "wrap",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    overflowX: "hidden",
    overflowY: "auto",
    boxSizing: "border-box",
    paddingTop: "1rem",
    paddingBottom: "3rem",
    paddingRight: "6%",
    "&::-webkit-scrollbar": {
      height: "1.2vh",
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      background: "#cccccc",
      borderRadius: 20,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#AAAAAA",
      borderRadius: 20,
    },
  },
  searchbox: {
    backgroundColor: "transparent",
    boxSizing: "border-box",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "white",
    boxSizing: "border-box",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    boxShadow: `-1px -1px 20px 0px #aaaaaa`,
    marginBottom: 20,
  },
  courseBox: {
    maxHeight: "80%",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      height: "1.2vh",
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      background: "#cccccc",
      borderRadius: 20,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#AAAAAA",
      borderRadius: 20,
    },
  },
});

export default function Home() {
  const classes = useStyles();
  const [firstTime, setFirstTime] = useState(true);
  const [finished, setFinished] = useState(false);
  const [fields, setFields] = useState([]);
  const [profs, setProfs] = useState([]);
  const [files, setFiles] = useState([]);
  const [number, setNumber] = useState(10);

  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedProf, setSelectedProf] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const Search = () => {
    getAllFiles({
      number,
      fieldId: selectedFields,
      courseId: selectedCourses,
      profId: selectedProf,
      type: selectedTypes,
      search: searchText,
    })
      .then((res) => {
        setFiles((old) => [...old, ...res]);
        setFinished(res.length < 10);
      })
      .catch(({ response }) => console.log(response));
  };

  useEffect(() => {
    setFirstTime(false);
    getAllFields()
      .then(setFields)
      .then(() => getAllProf().then(setProfs))
      .catch(({ response: { status } }) => {
        if (status === 401) {
          localStorage.clear();
          window.location.reload();
        }
      });
  }, []);

  useEffect(Search, [number]);

  useEffect(() => {
    if (!firstTime) {
      setFiles([]);
      if (number === 10) Search();
      else setNumber(10);
    }
  }, [
    selectedFields,
    selectedCourses,
    selectedProf,
    searchText,
    selectedTypes,
  ]);

  return (
    <Box className={classes.page} height="100%" width="100%">
      <Box height="8%" width="100%">
        <Nav />
      </Box>
      <Box className={classes.main} height="92%" width="100%">
        {/* //? side bar section */}
        <Box className={classes.left_sidebar} height="100%" width="17%">
          <div
            style={{
              textAlign: "center",
              marginBottom: 10,
              fontWeight: "bolder",
            }}
          >
            {`${titles.field} و ${titles.course}`}
          </div>
          <Divider />
          {fields.map(({ name, id, courses }) => (
            <Box
              className={classes.box}
              padding="0.2rem"
              marginTop="1rem"
              width="100%"
              height={250}
            >
              <Button
                onClick={() => {
                  if (selectedFields.includes(id))
                    setSelectedFields((old) =>
                      old.filter((item) => item !== id)
                    );
                  else setSelectedFields((old) => [...old, id]);
                }}
                className={`${
                  selectedFields.includes(id) ? classes.active : ""
                } ${classes.fieldBtn}`}
              >
                <div className={classes.fieldDiv}>{name}</div>
              </Button>
              <Box className={classes.courseBox}>
                {courses.map(({ name, id }) => (
                  <Button
                    onClick={() => {
                      if (selectedCourses.includes(id))
                        setSelectedCourses((old) =>
                          old.filter((item) => item !== id)
                        );
                      else setSelectedCourses((old) => [...old, id]);
                    }}
                    className={`${
                      selectedCourses.includes(id) ? classes.active : ""
                    } ${classes.courseBtn}`}
                  >
                    <div className={classes.courseDiv}>{name}</div>
                  </Button>
                ))}
              </Box>
            </Box>
          ))}
          <div
            style={{
              textAlign: "center",
              marginBottom: 10,
              fontWeight: "bolder",
              marginTop: 10,
            }}
          >
            {`${titles.type} ${titles.file}`}
          </div>
          <Divider />
          <Box
            className={classes.box}
            padding="0.2rem"
            marginTop="1rem"
            width="100%"
            height={200}
          >
            {titles.types.map(({ id, name }) => (
              <Button
                onClick={() => {
                  if (selectedTypes.includes(id))
                    setSelectedTypes((old) =>
                      old.filter((item) => item !== id)
                    );
                  else setSelectedTypes((old) => [...old, id]);
                }}
                className={`${
                  selectedTypes.includes(id) ? classes.active : ""
                } ${classes.fieldBtn}`}
              >
                <div className={classes.fieldDiv}>{name}</div>
              </Button>
            ))}
          </Box>
          <div
            style={{
              textAlign: "center",
              marginBottom: 10,
              fontWeight: "bolder",
              marginTop: 10,
            }}
          >
            {`${titles.prof} ${titles.course}`}
          </div>
          <Divider />
          <Box
            className={classes.box}
            padding="0.2rem"
            marginTop="1rem"
            width="100%"
            height={200}
          >
            {profs.map(({ id, name }) => (
              <Button
                onClick={() => {
                  if (selectedProf.includes(id))
                    setSelectedProf((old) => old.filter((item) => item !== id));
                  else setSelectedProf((old) => [...old, id]);
                }}
                className={`${
                  selectedProf.includes(id) ? classes.active : ""
                } ${classes.fieldBtn}`}
              >
                <div className={classes.fieldDiv}>{name}</div>
              </Button>
            ))}
          </Box>
        </Box>
        {/*//?  show cards and tables and a button to change  */}
        <Box className={classes.right} height="100%" width="83%">
          {/* //? search bar section */}
          <Box className={classes.searchbox} height="15%" width="100%">
            <Box width="95%" height="100%">
              <SearchBox handleSearch={setSearchText} />
            </Box>
          </Box>
          {/* //? materail table and card section */}
          <Box className={classes.content} height="85%" width="100%">
            <Box className={classes.cardBox} width="100%" height="fit-content%">
              {files.length > 0 ? (
                files.map((item) => <Cards item={item} />)
              ) : (
                <h3
                  style={{ textAlign: "center", width: "100%", color: "red" }}
                >
                  {titles.notFound}
                </h3>
              )}
            </Box>
            {!firstTime && !finished && (
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  left: 35,
                  justifyContent: "center",
                }}
              >
                <ShowMore onClick={() => setNumber((old) => old + 10)} />
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
