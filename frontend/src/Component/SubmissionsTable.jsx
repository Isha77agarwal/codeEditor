import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SubmissionsTable = () => {
  function createData(username, language, stdin, timestamp, sourceCode, output) {
    return { username, language, stdin, timestamp, sourceCode, output };
  }

  const rows = [
    createData(
      "isha",
      "JAVA",
      "1 2",
      "11111111111",
      "I am Tamal Mondal, a final-year MTech CSE student from IIT Hyderabad. I enrolled in the 'Complete Interview Preparation' course on the GFG platform to prepare for the 2023-24 placement season. The course is a good value for money. Firstly, the course is very well structured and it covers almost all the topics in Data Structure and Algorithms with solutions of the most popular coding problems from each topic. The interview preparation course also provides materials for core subjects, aptitude questions, and OOPs concepts, making the course comprehensive and a one-stop solution for placement preparation.".substring(
        0,
        100
      ),
      "hello"
    ),
  ];
  return (
    <div>
      <h3 style={{ margin: "3% 40% 0 40%" }}>All Submissions</h3>
      <TableContainer component={Paper} sx={{ margin: 4, maxWidth: "95%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align="right">Language</StyledTableCell>
              <StyledTableCell align="right">Input</StyledTableCell>
              <StyledTableCell align="right">Timestamp</StyledTableCell>
              <StyledTableCell align="right">Source Code</StyledTableCell>
              <StyledTableCell align="right">Output</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.username}>
                <StyledTableCell component="th" scope="row">
                  {row.username}
                </StyledTableCell>
                <StyledTableCell align="right">{row.language}</StyledTableCell>
                <StyledTableCell align="right">
                  <TextField value={row.stdin} multiline rows={5} disabled />
                </StyledTableCell>
                <StyledTableCell align="right">{row.timestamp}</StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    value={row.sourceCode}
                    multiline
                    rows={5}
                    disabled
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                <TextField
                    value={row.output}
                    multiline
                    rows={5}
                    disabled
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SubmissionsTable;
