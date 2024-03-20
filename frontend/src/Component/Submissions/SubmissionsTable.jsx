import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SubmissionRowData from "./SubmissionRowData";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const SubmissionsTable = () => {
  const [submissionsData, setSubmissionsData] = useState([]);

  const getSubmissions = async () => {
    const { data: submissions } = await axios.get("/submission?limit=1000");
    console.log(submissions);
    setSubmissionsData(submissions);
  };

  useEffect(() => {
    getSubmissions();
  }, []);
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
            {submissionsData.map((submission) => (
              <SubmissionRowData key={submission._id} submission={submission} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SubmissionsTable;
