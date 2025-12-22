const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    modelUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Content', ContentSchema);
