import express from 'express';
import { uploadItem } from '../middlewares/upload.js';
import {
    addItem,
    editItemInfo,
    getItems,
    removeItem
} from '../controllers/itemController.js';

const router = express.Router();

router.post('/', uploadItem.single('image_url'), addItem);

router.get('/', getItems);

router.patch('/:_id', uploadItem.single('image_url'), editItemInfo);

router.delete('/:_id', removeItem)

export default router;