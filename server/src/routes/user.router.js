const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../models/user.model');
const asw = require('express-async-handler');

// Get all Users
UserRouter.get(
    '/',
    asw(async (req, res) => {
        const users = await UserModel.find();

        res.send({
            err: false,
            data: users,
        });
    }),
);

module.exports = UserRouter;
