import express from 'express';
import {
    addAccessory,
    editAccessoryInfo,
    getAccessories,
    removeAccessory
} from '../controllers/coffeeAccessoryController.js';
import { uploadAccessory } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', uploadAccessory.single('image_url'), addAccessory);

router.get('/', getAccessories);

router.patch('/:_id', uploadAccessory.single('image_url'), editAccessoryInfo);

router.delete('/:_id', removeAccessory);

export default router;