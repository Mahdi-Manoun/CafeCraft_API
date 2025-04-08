import express from 'express';
import {
    addTeammate,
    editTeammateInfo,
    getTeammates,
    removeTeammate
} from '../controllers/teammateController.js';
import { uploadTeammate } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', uploadTeammate.single('image_url'), addTeammate);

router.get('/', getTeammates);

router.patch('/:_id', uploadTeammate.single('image_url'), editTeammateInfo);

router.delete('/:_id', removeTeammate);

export default router;