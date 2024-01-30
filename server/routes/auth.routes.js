import express from "express";
import {
  signup,
  signin,
  accessUsingGoogle,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", accessUsingGoogle);
export default router;
