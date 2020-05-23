const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserModel = Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
});

module.exports = Mongoose.model('User', UserModel);
