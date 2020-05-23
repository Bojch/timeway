const express = require('express');
const TrackingRouter = express.Router();
const TrackingModel = require('../models/tracking.model');
const asw = require('express-async-handler');

TrackingRouter.get(
    '/',
    asw(async (req, res) => {
        const trackings = await TrackingModel.find();

        res.send({
            err: false,
            data: trackings,
        });
    }),
);

module.exports = TrackingRouter;
