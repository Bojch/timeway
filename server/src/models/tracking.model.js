const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const TrackingSchema = new Schema({
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
        type: Number, // multiple and dived with 100 => 2.60
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

module.exports = Mongoose.model('Tracking', TrackingSchema);
