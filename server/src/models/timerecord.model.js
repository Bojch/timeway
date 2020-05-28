const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeRecordSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        default: Date.now,
    },
    stop: {
        type: Date,
    },
    duration: {
        type: Number,
        default: 0,
    },
    isBillable: {
        type: Boolean,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    member: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
    },
});

module.exports = mongoose.model('TimeRecord', TimeRecordSchema);
