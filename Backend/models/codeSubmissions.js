import mongoose from "mongoose";

const codeSubmissionsSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    sourceCode: {
      type: String,
      required: true,
    },
    languageId: {
      type: Number,
      required: true,
    },
    stdin: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CodeSubmissions = mongoose.model(
  "CodeSubmissions",
  codeSubmissionsSchema
);
export default CodeSubmissions;
