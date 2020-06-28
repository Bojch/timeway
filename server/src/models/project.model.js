const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const Project = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        required: true,
    },
    billableByDefault: {
        type: Boolean,
        default: true,
    },
});

module.exports = Mongoose.model('Project', Project);
