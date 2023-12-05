const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: [true, 'Level is required!'],
        min: [1, 'The level should be a positive number!'],
        max: [999, 'The level should not be more than 999!'],
    },
    linesCompleted: {
        type: Number,
        required: [true, 'linesCompleted is required!'],
        min: [0, 'linesCompletedl should be at least 0 or above!'],
        max: [999, 'linesCompleted should not be more than 999!'],
    },
    points: {
        type: Number,
        required: [true, 'Points are required!'],
        min: [0, 'The points should be at least 0 or above!'],
        max: [9999, 'The points should not be more than 9999!'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required!'],
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    likes: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }],
});

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;