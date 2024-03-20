import expressAsyncHandler from "express-async-handler";
import axios from "axios";

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
      "X-RapidAPI-Key": "f714aa826amsh84e320423bc7082p18261bjsnf14fc7cafe5a",
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
