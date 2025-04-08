import express from 'express';
import { uploadGrinder } from '../middlewares/upload.js';
import {
    addGrinder,
    editGrinderInfo,
    getGrinders,
    removeGrinder
} from '../controllers/coffeeGrinderController.js';

const router = express.Router();

router.post('/', uploadGrinder.single('image_url'), addGrinder);

router.get('/', getGrinders);

router.patch('/:_id', uploadGrinder.single('image_url'), editGrinderInfo);

router.delete('/:_id', removeGrinder);

export default router;