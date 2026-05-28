


import express from "express";
import { getProfile } from "../controllers/studentController.js"; // Import getProfile from "../controllers/studentController.js";
import { getCourse } from "../controllers/studentController.js"; // Import getCourse from "../controllers/studentController.js";

const router = express.Router();

router.get('/profile', getProfile);
router.get('/course', getCourse);

export default router;