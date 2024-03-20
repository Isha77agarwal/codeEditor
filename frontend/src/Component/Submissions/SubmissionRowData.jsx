import React, { useState } from "react";
import axios from "axios";
import { languageIdMapping } from "../../utils";
import { StyledTableCell } from "./SubmissionsTable";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SubmissionRowData = ({ submission }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    setOutput("");
    const result = await axios.post("/submission/execute", {
      language_id: submission.languageId,
      source_code: submission.sourceCode,
      stdin: submission.stdin,
    });

    if (result.data.stderr) {
      setOutput(atob(result.data.stderr));
    } else setOutput(atob(result.data.stdout));
    setIsLoading(false);
  };
  return (
    <StyledTableRow key={submission.username}>
      <StyledTableCell component="th" scope="row">
        {submission.username}
      </StyledTableCell>
      <StyledTableCell align="right">
        {languageIdMapping[submission.languageId]}
      </StyledTableCell>
      <StyledTableCell align="right">
        <TextField
          value={submission.stdin ? atob(submission.stdin) : "No Input"}
          multiline
          rows={5}
          disabled
        />
      </StyledTableCell>
      <StyledTableCell align="right">{submission.createdAt}</StyledTableCell>
      <StyledTableCell align="right">
        <TextField
          value={atob(submission.sourceCode)}
          multiline
          rows={5}
          disabled
        />
      </StyledTableCell>
      <StyledTableCell align="right">
        {output ? (
          <TextField value={output} multiline rows={5} disabled />
        ) : (
          <Button variant="outlined" onClick={runTest} disabled={isLoading}>
            Run code
          </Button>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default SubmissionRowData;
