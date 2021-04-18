import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f50b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#e8eaf6",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 455,
  },
});

const getLable = (type, calculate) => {
  const cfl = type.charAt(0).toUpperCase() + type.slice(1);

  const lable = {
    "daily total": `Daily Total ${cfl}`,
    "monthly total": `Monthly Total ${cfl}`,
    "daily average by month": `Daily Average ${cfl} by Month`,
    "daily max by month": `Daily Maximum ${cfl} by Month`,
    "daily min by month": `Daily Minimum ${cfl} by Month`,
  };

  return lable[calculate];
};

const getName = (type, id, ridePairs, attractionPairs) => {
  if (id === undefined) {
    return "None";
  } else if (type === "ride") {
    return ridePairs[id];
  } else {
    return attractionPairs[id];
  }
};

const getTable = (params, report, ridePairs, attractionPairs) => {
  let rows = [];
  let columns = [];

  // raw data from backend
  // console.log(params, report);

  // 1st report
  if (params.reportType === "visits") {
    if (params.calculate === "daily total") {
      rows = report.map((row) => ({
        visits: row.visits,
        date: `${row.month}/${row.day}/${row.year}`,
      }));
      columns = [
        { id: "visits", label: getLable(params.reportType, params.calculate) },
        { id: "date", label: "Date" },
      ];
    } else {
      rows = report.map((row) => ({
        visits:
          params.calculate === "daily average by month"
            ? Math.round(row.visits)
            : row.visits,
        date: `${row.month}/${row.year}`,
      }));
      columns = [
        { id: "visits", label: getLable(params.reportType, params.calculate) },
        { id: "date", label: "Month" },
      ];
    }
  } // 2nd report
  else if (params.reportType === "usage") {
    const grab = params.type === "ride" ? "usage" : "visit";
    const id = params.type === "ride" ? params.ride_id : params.attraction_id;
    const name = getName(params.type, id, ridePairs, attractionPairs);

    if (params.calculate === "daily total") {
      rows = report.map((row) => ({
        name: params.show === "all" ? row.name : name,
        usage: row[grab],
        date: `${row.month}/${row.day}/${row.year}`,
      }));
      columns = [
        { id: "name", label: "Name" },
        { id: "usage", label: getLable(params.reportType, params.calculate) },
        { id: "date", label: "Date" },
      ];
    } else {
      rows = report.map((row) => ({
        name: params.show === "all" ? row.name : name,
        usage:
          params.calculate === "daily average by month"
            ? Math.round(row[grab])
            : row[grab],
        date: `${row.month}/${row.year}`,
      }));
      columns = [
        { id: "name", label: "Name" },
        { id: "usage", label: getLable(params.reportType, params.calculate) },
        { id: "date", label: "Month" },
      ];
    }
  } // 3rd report
  else if (params.reportType === "breakdowns") {
    const name = getName("ride", params.ride_id, ridePairs, attractionPairs);

    if (params.calculate === "daily total") {
      rows = report.map((row) => ({
        name: params.show === "all" ? row.name : name,
        breakdowns: row.breakdowns,
        date: `${row.month}/${row.day}/${row.year}`,
      }));
      columns = [
        { id: "name", label: "Name" },
        {
          id: "breakdowns",
          label: getLable(params.reportType, params.calculate),
        },
        { id: "date", label: "Date" },
      ];
    } else {
      rows = report.map((row) => ({
        name: params.show === "all" ? row.name : name,
        breakdowns:
          params.calculate === "daily average by month"
            ? Math.round(row.breakdowns)
            : row.breakdowns,
        date: `${row.month}/${row.year}`,
      }));
      columns = [
        { id: "name", label: "Name" },
        {
          id: "breakdowns",
          label: getLable(params.reportType, params.calculate),
        },
        { id: "date", label: "Month" },
      ];
    }
  } else if (params.reportType === "rainouts") {
    const id = params.type === "ride" ? params.ride_id : params.attraction_id;
    const name = getName(params.type, id, ridePairs, attractionPairs);

    if (params.calculate === "daily total") {
      rows = report.map((row) => ({
        name: params.show === "all" ? row.name : name,
        rainouts: row.rainouts,
        date: `${row.month}/${row.day}/${row.year}`,
      }));
      columns = [
        { id: "name", label: "Name" },
        {
          id: "rainouts",
          label: getLable(params.reportType, params.calculate),
        },
        { id: "date", label: "Date" },
      ];
    } else {
      rows = report.map((row) => ({
        name: params.show === "all" ? row.name : name,
        rainouts:
          params.calculate === "daily average by month"
            ? Math.round(row.rainouts)
            : row.rainouts,
        date: `${row.month}/${row.year}`,
      }));
      columns = [
        { id: "name", label: "Name" },
        {
          id: "rainouts",
          label: getLable(params.reportType, params.calculate),
        },
        { id: "date", label: "Month" },
      ];
    }
  }

  return { rows, columns };
};

export default function ManagerTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [table, setTable] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //data
  useEffect(() => {
    const { params, report, ridePairs, attractionPairs } = props;
    const parsedTable = getTable(params, report, ridePairs, attractionPairs);
    console.log(parsedTable);
    setTable(parsedTable);
    props.setExcelData(parsedTable);
  }, [props]);

  return (
    <>
      {table ? (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  {table.columns.map((column) => (
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
                {table.rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <StyledTableRow
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {table.columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 100]}
            component="div"
            count={table.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      ) : null}
    </>
  );
}
