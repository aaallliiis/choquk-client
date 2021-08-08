import React, { useState, useEffect } from "react";
import { makeStyles, Box, Grid, LinearProgress } from "@material-ui/core";
import Table from "../../../components/Table";
import { FieldColumns } from "../../../assets/columns";
import { titles } from "../../../assets/titles";
import { getAllAdminFields } from "../../../api";
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
    boxShadow: `1px 1px 40px 3px #aaaaaa`,
    textAlign: "center",
  },
});

export default function Home() {
  const classes = useStyles();

  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      getAllAdminFields()
        .then(setFields)
        .then(() => setLoading(false))
        .catch((err) => console.log(err)),
    []
  );

  return (
    <Box className={classes.tables} height="100%" width="100%">
      <Box padding="2rem">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.header}
        >
          <h2>{titles.fields}</h2>
          {/* <Button className={classes.add} onClick={handleOpenAddModal}>
            {sideBarContentPersian.add}
            <Add />
          </Button> */}
        </Grid>
      </Box>
      {loading ? (
        <LinearProgress />
      ) : fields.length === 0 ? (
        <h3 style={{ color: "red", textAlign: "center" }}>{titles.notFound}</h3>
      ) : (
        <Table columns={FieldColumns} data={fields} />
      )}
    </Box>
  );
}
