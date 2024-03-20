import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, MenuItem, Button, Snackbar } from "@mui/material";
import styles from "./codingPage.module.scss";
import axios from "axios";
import { trimExtraLinesAndSpaces } from "../../utils";

const CodingPage = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");
  const [language, setLanguage] = useState("");
  const [username, setUsername] = useState("");
  const [stderr, setStderr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [isSaveSubmissionLoading, setIsSaveSubmissionLoading] = useState(false);

  const resetToDefault = () => {
    setSourceCode("");
    setStdin("");
    setStdout("");
    setLanguage("");
    setUsername("");
    setStderr("");
  };

  const runTest = async () => {
    setIsLoading(true);
    setStdout("");
    const result = await axios.post("/submission/execute", {
      language_id: language,
      source_code: btoa(trimExtraLinesAndSpaces(sourceCode)),
      stdin: btoa(trimExtraLinesAndSpaces(stdin)),
    });

    if (result.data.stderr) {
      setStderr(atob(result.data.stderr));
    } else setStdout(atob(result.data.stdout));
    setIsLoading(false);
  };

  const saveSubmission = async () => {
    try {
      setIsSaveSubmissionLoading(true);
      const requestBody = {
        username,
        languageId: language,
        sourceCode: btoa(trimExtraLinesAndSpaces(sourceCode)),
      };
      if (stdin) {
        requestBody.stdin = btoa(trimExtraLinesAndSpaces(stdin));
      }
      await axios.post("/submission", requestBody);
      setSnackbarMessage("Submission Saved SuccessFully !");
      setIsSaveSubmissionLoading(false);
      resetToDefault();
    } catch (err) {
      setSnackbarMessage("Error in saving submission !");
    }
  };

  return (
    <Box component="div" className={styles.main_container}>
      <div className={styles.header_input}>
        <TextField
          label="Username"
          className={styles.username_input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          value={language}
          label="Select Language"
          onChange={(e) => setLanguage(e.target.value)}
          className={styles.language_input}
          select
        >
          <MenuItem value="54">C++</MenuItem>
          <MenuItem value="91">JAVA</MenuItem>
          <MenuItem value="93">Javascript</MenuItem>
          <MenuItem value="92">Python</MenuItem>
        </TextField>
      </div>
      <div className={styles.code_container}>
        <TextField
          placeholder="Enter your code here"
          multiline
          rows={15}
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          fullWidth
          className={styles.sourceCode_input}
        />
        <div className={styles.io_container}>
          <TextField
            placeholder="input"
            multiline
            rows={7}
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            className={styles.standard_input}
            fullWidth
          />
          <TextField
            label="output"
            multiline
            rows={6}
            value={stderr ? stderr : stdout}
            className={styles.standard_output}
            fullWidth
            disabled
          />
        </div>
      </div>
      <div className={styles.button_container}>
        <Button
          onClick={runTest}
          variant="outlined"
          className={styles.submit_button}
          disabled={
            !language || !sourceCode || isLoading || isSaveSubmissionLoading
          }
        >
          Run code
        </Button>
        <Button
          onClick={saveSubmission}
          variant="contained"
          className={styles.submit_button}
          disabled={
            !username ||
            !language ||
            !sourceCode ||
            isLoading ||
            isSaveSubmissionLoading
          }
        >
          Submit code
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarMessage !== null}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default CodingPage;
