const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('./models/Content');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ar-edu-db';

const sampleContent = [
    {
        title: "Neil Armstrong's Spacesuit",
        description: "A 3D scan of Neil Armstrong's spacesuit from the Apollo 11 mission. Explore the details of the suit that walked on the moon.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
        thumbnailUrl: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.png", // Placeholder or derived
        category: "History"
    },
    {
        title: "Robot Expressive",
        description: "An interactive robot model demonstrating animation and emotion in 3D characters. Great for learning about robotics and rigging.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
        thumbnailUrl: "https://modelviewer.dev/assets/ShopifyModels/RobotExpressive.png",
        category: "Technology"
    },
    {
        title: "Astronaut",
        description: "A standard astronaut model. Learn about the equipment used in space exploration.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
        thumbnailUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.png",
        category: "Space"
    },
    {
        title: "Damaged Helmet",
        description: "A battle-damaged sci-fi helmet. Observe the realistic textures and lighting effects.",
        modelUrl: "https://modelviewer.dev/shared-assets/models/DamagedHelmet.glb",
        thumbnailUrl: "https://modelviewer.dev/shared-assets/models/DamagedHelmet.png",
        category: "Art"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected for seeding');

        await Content.deleteMany({});
        console.log('Cleared existing content');

        await Content.insertMany(sampleContent);
        console.log('Seeded database with sample content');

        mongoose.disconnect();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
