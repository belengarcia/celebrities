const mongoose = require('mongoose');

module.exports = mongoose.model ('Comment', new mongoose.Schema({
    Title: {
        Type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    celebrity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Celebrity',
        required: true
    }
}, {timestamps: true}));