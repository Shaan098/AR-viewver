const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('./models/Content');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ar-edu-db';

app.use(cors());
app.use(express.json());

// Track database status
let dbConnected = false;

// In-memory fallback data
const fallbackContent = [
    {
        _id: "1",
        title: "Neil Armstrong's Spacesuit",
        description: "A 3D scan of Neil Armstrong's spacesuit from the Apollo 11 mission. Explore the details of the suit that walked on the moon.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
        thumbnailUrl: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=400",
        category: "History"
    },
    {
        _id: "2",
        title: "Astronaut",
        description: "A detailed astronaut model showcasing space exploration equipment. Perfect for learning about space missions and gear.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        thumbnailUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400",
        category: "Space"
    },
    {
        _id: "3",
        title: "Damaged Helmet",
        description: "A battle-damaged sci-fi helmet with realistic textures and PBR materials. Great for studying 3D art and lighting.",
        modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
        thumbnailUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80&w=400",
        category: "Art"
    },
    {
        _id: "4",
        title: "Shishkebab",
        description: "A whimsical animated shish kebab character. Fun interactive model demonstrating 3D animation and rigging.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/shishkebab.glb",
        thumbnailUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400",
        category: "Food"
    },
    {
        _id: "5",
        title: "Horse Statue",
        description: "An elegant horse sculpture showcasing detailed 3D modeling and texturing techniques.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/Horse.glb",
        thumbnailUrl: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400",
        category: "Art"
    },
    {
        _id: "6",
        title: "Alpha Blend Mode Test",
        description: "A colorful geometric model demonstrating transparency and alpha blending in 3D graphics.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/alpha-blend-litmus.glb",
        thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
        category: "Technology"
    }
];

// Connect to MongoDB with fallback
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        dbConnected = true;
        console.log('✅ MongoDB connected');

        // Seed if empty
        const count = await Content.countDocuments();
        if (count === 0) {
            console.log('📦 Seeding database...');
            await Content.insertMany(fallbackContent.map(({ _id, ...rest }) => rest));
            console.log('✅ Database seeded with 6 models');
        }
    })
    .catch(err => {
        console.log('⚠️  MongoDB unavailable - using in-memory mode');
        console.log('   To use MongoDB, start it with: mongod');
    });

// Routes
app.get('/api/content', async (req, res) => {
    try {
        if (dbConnected) {
            const content = await Content.find().sort({ createdAt: -1 });
            res.json(content);
        } else {
            res.json(fallbackContent);
        }
    } catch (err) {
        res.json(fallbackContent);
    }
});

app.get('/api/content/:id', async (req, res) => {
    try {
        if (dbConnected) {
            const content = await Content.findById(req.params.id);
            if (!content) return res.status(404).json({ message: 'Content not found' });
            res.json(content);
        } else {
            const content = fallbackContent.find(c => c._id === req.params.id);
            if (!content) return res.status(404).json({ message: 'Content not found' });
            res.json(content);
        }
    } catch (err) {
        const content = fallbackContent.find(c => c._id === req.params.id);
        if (!content) return res.status(404).json({ message: 'Content not found' });
        res.json(content);
    }
});

app.post('/api/content', async (req, res) => {
    if (!dbConnected) {
        return res.status(503).json({ message: 'MongoDB required for POST. Start MongoDB first.' });
    }
    try {
        const { title, description, modelUrl, thumbnailUrl, category } = req.body;
        const newContent = new Content({ title, description, modelUrl, thumbnailUrl, category });
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (err) {
        res.status(400).json({ message: 'Invalid Data', error: err.message });
    }
});

app.delete('/api/content/:id', async (req, res) => {
    if (!dbConnected) {
        return res.status(503).json({ message: 'MongoDB required for DELETE. Start MongoDB first.' });
    }
    try {
        const content = await Content.findByIdAndDelete(req.params.id);
        if (!content) return res.status(404).json({ message: 'Content not found' });
        res.json({ message: 'Content deleted', content });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

app.get('/', (req, res) => {
    res.json({
        message: 'AR Education Content Viewer API',
        database: dbConnected ? 'MongoDB' : 'In-Memory (MongoDB unavailable)',
        status: 'Running',
        endpoints: ['GET /api/content', 'GET /api/content/:id', 'POST /api/content', 'DELETE /api/content/:id']
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
