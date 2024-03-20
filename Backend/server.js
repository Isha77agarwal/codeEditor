import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./Config/dbConfig.js";
import codeSubmitRoutes from "./routes/codeSubmitRoutes.js";
// import connection from "./Config/dbConfig.js";

import cors from "cors";
const app = express();

dotenv.config();
connectDB();
// connection.connect();

// connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
//   if (err) console.log(`Error: ${err.message}`.red.underline);
//   else console.log(`The solution is: ${rows[0].solution}`.cyan.bold);
// });

app.use(express.json());
app.use(cors());

app.use("/api/submission", codeSubmitRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server runnning....".yellow.bold));
