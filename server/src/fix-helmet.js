const mongoose = require('mongoose');
const Content = require('./models/Content');

const MONGO_URI = 'mongodb://127.0.0.1:27017/ar-edu-db';

const fixDamagedHelmet = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const result = await Content.updateOne(
            { title: 'Damaged Helmet' },
            { $set: { modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb' } }
        );

        console.log('Update result:', result);

        if (result.modifiedCount > 0) {
            console.log('✅ Damaged Helmet URL fixed!');
        } else {
            console.log('No document was updated (may already be fixed or not found)');
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
    }
};

fixDamagedHelmet();
