import express from "express";
import {
  testSubmission,
  addSubmission,
  getSubmissions,
} from "../controllers/codeSubmitControllers.js";

const router = express.Router();

router.post("/", addSubmission);
router.get("/", getSubmissions);
router.post("/execute", testSubmission);

export default router;
