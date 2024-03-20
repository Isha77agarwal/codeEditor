import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, MenuItem, Button } from "@mui/material";
import styles from "./codingPage.module.scss";
import axios from "axios";

const CodingPage = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");
  const [language, setLanguage] = useState("");
  const [username, setUsername] = useState("");
  const [stderr, setStderr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // replace the multiple white spaces with single white space from the string e.g '2  3  5 6' -> '2 3 5 6'
  const trimExtraSpaces = (text) => text.replace(/ {2,}/g, " ");

  // replace the multiple lines or lines with spaces at the end with single line e.g '2\n\n 3' -> '2\n3' ,'2\n 3' -> '2\n3'
  const trimExtraLines = (text) => text.replace(/\n{1,} {0,}/g, "\n");

  const trimExtraLinesAndSpaces = (text) =>
    trimExtraSpaces(trimExtraLines(text));

  const runTest = async () => {
    setIsLoading(true);
    const result = await axios.post("http://localhost:5000/api/submit", {
        language_id: language,
        source_code: btoa(trimExtraLinesAndSpaces(sourceCode)),
        stdin: btoa(trimExtraLinesAndSpaces(stdin)),
    });

    if(result.data.stderr) {
      setStderr(atob(result.data.stderr));
    }else
      setStdout(atob(result.data.stdout))
    setIsLoading(false);
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
          disabled={!username || !language || !sourceCode || isLoading}
        >
          Run code
        </Button>
        <Button
          onClick={runTest}
          variant="contained"
          className={styles.submit_button}
          disabled={!username || !language || !sourceCode || isLoading}
        >
          Submit code
        </Button>
      </div>
    </Box>
  );
};

export default CodingPage;
