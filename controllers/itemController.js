import mongoose from 'mongoose';
import Item from '../models/itemModel.js';

const addItem = async (req, res) => {
    let { category_id, title, description, additional_info } = req.body;
    const imageUrl = req.file ? `http://localhost:5000/uploads/item/${req.file.filename}` : null;

    title = title?.trim();
    description = description?.trim();
    try {
        let errorList = [];
        if (!category_id || !mongoose.Types.ObjectId.isValid(category_id)) errorList.push('Invalid item ID.');
        if (!title) errorList.push('title should not be empty or invalid.');
        if (errorList.length > 0) {
            return res.status(400).json({ errors: errorList });
        }

        const newItem = new Item({
            category_id,
            title,
            description,
            additional_info,
            image_url: imageUrl
        });

        await newItem.save();

        return res.status(201).json({ message: 'Item added successfully!', item: newItem });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error.' });
    }
}


const getItems = async (req, res) => {
    try {
        const items = await Item.find();

        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


const editItemInfo = async (req, res) => {
    const { _id } = req.params;
    const { category_id, title, description, additional_info } = req.body;

    try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({
                error: 'Invalid ID format.',
                message: 'The provided item ID is not valid.'
            });
        }

        const item = await Item.findById(_id);
        if (!item) {
            return res.status(404).json({
                error: 'Not found.',
                message: `Item with ID ${_id} doesn't exist.`
            });
        }

        if (category_id && !mongoose.Types.ObjectId.isValid(category_id)) {
            return res.status(400).json({
                error: 'Invalid ID format.',
                message: 'The provided item ID is not valid.'
            });
        }

        if (req.file) {
            item.image_url = `http://localhost:5000/uploads/item/${req.file.filename}`;
            console.log('New image path set:', item.image_url);
        }

        if (category_id) item.category_id = category_id.trim();
        if (title) item.title = title.trim();
        if (description) item.description = description.trim();
        if (additional_info) item.additional_info = additional_info.trim();

        const updatedItem = await item.save();

        console.log('Uploaded file:', req.file);

        return res.status(200).json({
            success: true,
            message: 'Item updated successfully!',
            data: updatedItem
        });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


const removeItem = async (req, res) => {
    const { _id } = req.params;

    try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid item ID.' });
        }

        const item = await Item.findById(_id);

        if (!item) {
            return res.status(404).json({
                error: 'Item not found.',
                message: `Item with ID ${_id} was not found.`
            });
        }

        await Item.findByIdAndDelete(_id);

        return res.status(200).json({ message: `"${item._id}" deleted successfully!` });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


export {
    addItem,
    getItems,
    editItemInfo,
    removeItem
};