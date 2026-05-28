

import { getProfile } from '../controllers/studentController.js'; // Import getProfile from '../controllers/studentController.js';
import { getCourse } from '../controllers/studentController.js'; // Import getCourse from '../controllers/studentController.js';
import express from 'express';

const router = express.Router();

router.post('/profile', getProfile);
router.get('/course', getCourse);

export default router;