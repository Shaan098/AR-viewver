const express = require('express');
const Content = require('../models/Content');

const router = express.Router();

// GET all content
router.get('/', async (req, res) => {
    try {
        const content = await Content.find().sort({ createdAt: -1 });
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET single content
router.get('/:id', async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) return res.status(404).json({ message: 'Content not found' });
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST new content (for seeding or admin)
router.post('/', async (req, res) => {
    try {
        const { title, description, modelUrl, thumbnailUrl, category } = req.body;
        const newContent = new Content({
            title,
            description,
            modelUrl,
            thumbnailUrl,
            category
        });
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (err) {
        res.status(400).json({ message: 'Invalid Data' });
    }
});

module.exports = router;
