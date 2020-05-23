const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const Project = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = Mongoose.model('Project', Project);
