import express from 'express';
import {
    addCourse,
    editCourseInfo,
    getCourses,
    removeCourse
} from '../controllers/courseController.js';

// middlewares
// import isAdmin from '../middlewares/isAdmin.js';
import { uploadCourse } from '../middlewares/upload.js';


const router = express.Router();

router.post('/', uploadCourse.single('image_url'), addCourse);

router.get('/', getCourses);

router.patch('/:_id', uploadCourse.single('image_url'), editCourseInfo);

router.delete('/:_id', removeCourse);

export default router;