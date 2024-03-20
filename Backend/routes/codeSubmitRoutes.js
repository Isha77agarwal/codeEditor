import express from "express";
import { testSubmission } from "../controllers/codeSubmitControllers.js";

const router = express.Router();

router.post("/submit", testSubmission);

export default router;