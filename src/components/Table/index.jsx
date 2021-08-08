import React from "react";
import {
  withStyles,
  makeStyles,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "transparent",
    color: theme.palette.common.white,
    fontSize: "1.3vw",
    // fontSize:20,
    fontFamily: "vazir-regular",
  },
  body: {
    fontSize: "1vw",
    fontFamily: "vazir-regular",
    cursor: "pointer",
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    width: "98%",
    marginTop: "0.5%",
    marginBottom: "4%",
    direction: "rtl",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow: `1px 1px 10px 3px #aaaaaa`,
  },
  container: {
    maxHeight: 500000,
  },
  main: {
    direction: "initial",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "1rem",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  header: {
    backgroundColor: "rgba(128, 182, 202, 80%)",
  },
  tableRow: {
    margin: "1rem 0",
  },
  colorPicker: {
    width: "2rem",
    height: "2rem",
    border: "none",
    "&::-webkit-color-swatch-wrapper": {
      padding: 0,
    },
    "&::-webkit-color-swatch": {
      borderRadius: "50%",
    },
  },
});

export default function Tables({
  columns,
  data,
  // setPage,
  // setDeleteOpen,
}) {
  const classes = useStyles();
  console.log(data);
  // const handleCellClick = ({ target: { tagName } }, item) =>
  //   tagName === "BUTTON" ||
  //   tagName === "svg" ||
  //   tagName === "path" ||
  //   tagName === "INPUT" ||
  //   tagName === "SPAN"
  //     ? null
  //     : item.views_count !== undefined
  //     ? history.push(
  //         `/material/${item.id ? item.id : item._id.$oid}/${
  //           tabsContentPersian.default.tags
  //         }${searchedText ? `?${query}` : ""}`
  //       )
  //     : setPage(item);

  return (
    <div className={classes.main}>
      <Paper className={classes.root}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.header}>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                className={classes.tableRow}
              >
                {columns.map((column) => {
                  const value = item[column.id];
                  return (
                    <StyledTableCell
                      // onClick={(e) => handleCellClick(e, item)}
                      align={column.align}
                      key={column.id}
                    >
                      {column.id === "btn" ? (
                        <Button
                        // onClick={() => setDeleteOpen(item)}
                        >
                          <Close style={{ color: "red" }} />
                        </Button>
                      ) : Array.isArray(value) ? (
                        value.length
                      ) : (
                        value
                      )}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
