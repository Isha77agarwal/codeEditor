import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import CodeSubmissions from "../models/codeSubmissions.js";

//@desc get output of code
//@route /api/submit
//@access PUBLIC
export const testSubmission = expressAsyncHandler(async (req, res) => {
  const { language_id, source_code, stdin } = req.body;
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      fields: "*",
      wait: true,
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: language_id,
      source_code: source_code,
      stdin: stdin,
    },
  };

  try {
    const { data: response } = await axios.request(options);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
  }
});

export const addSubmission = expressAsyncHandler(async (req, res) => {
  const submissionData = req.body;

  const codeSubmission = new CodeSubmissions(submissionData);
  await codeSubmission.save();

  res.status(201).json(codeSubmission);
});

export const getSubmissions = expressAsyncHandler(async (req, res) => {
  const submissionData = req.query;
  const query = {};

  const limit = submissionData.limit || 10;
  const skip = submissionData.skip || 0;
  if (submissionData.username) {
    if (Array.isArray(submissionData.username)) {
      query.username = { $in: submissionData.username };
    } else {
      query.username = submissionData.username;
    }
  }

  if (submissionData.languageId) {
    if (Array.isArray(submissionData.languageId)) {
      query.languageId = {
        $in: submissionData.languageId.map((id) => parseInt(id)),
      };
    } else {
      query.languageId = parseInt(submissionData.languageId);
    }
  }

  const codeSubmissions = await CodeSubmissions.find(query)
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(201).json(codeSubmissions);
});
