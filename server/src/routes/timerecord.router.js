const express = require('express');
const TimeRecordRouter = express.Router();
const TimeRecordModel = require('../models/timerecord.model');
const asw = require('express-async-handler');
const SimpleDate = require('../lib/simpleDate');

// Get all finished time trackings
TimeRecordRouter.get(
    '/',
    asw(async (req, res) => {
        const trackings = await TimeRecordModel.find({ duration: { $gt: 0 } }).sort({ _id: -1 });

        res.send(trackings);
    }),
);

// Get all finished time trackings
TimeRecordRouter.get(
    '/today',
    asw(async (req, res) => {
        const trackings = await TimeRecordModel.find({
            stop: {
                $gte: SimpleDate().today.start,
                $lt: SimpleDate().today.stop,
            },
            // duration: { $gt: 0 },
        })
            .sort({ _id: -1 })
            .populate('project');

        res.send(trackings);
    }),
);

// Get all finished time trackings
TimeRecordRouter.get(
    '/yesterday',
    asw(async (req, res) => {
        const trackings = await TimeRecordModel.find({
            stop: {
                $gte: SimpleDate().yesterday.start,
                $lt: SimpleDate().yesterday.stop,
            },
        })
            .sort({ _id: -1 })
            .populate('project');

        res.send(trackings);
    }),
);

// Get all finished time trackings
TimeRecordRouter.get(
    '/beforeyesterday',
    asw(async (req, res) => {
        const trackings = await TimeRecordModel.find({
            stop: {
                $gte: SimpleDate().beforeYesterday.start,
                $lt: SimpleDate().beforeYesterday.stop,
            },
        })
            .sort({ _id: -1 })
            .populate('project');

        res.send(trackings);
    }),
);

// Get last one not terminated
TimeRecordRouter.get(
    '/isRunning',
    asw(async (req, res) => {
        const tracking = await TimeRecordModel.findOne({ stop: { $eq: '' } }).populate('project');

        res.send(tracking);
    }),
);

// Create new Tracking document
TimeRecordRouter.post(
    '/',
    asw(async (req, res) => {
        const tracking = await TimeRecordModel.create(req.body);

        res.status(201).send(tracking);
    }),
);

// Update tracking time
TimeRecordRouter.patch(
    '/:id',
    asw(async (req, res) => {
        const fieldsToUpdate = {
            duration: req.body.duration,
            stop: SimpleDate().now,
            description: req.body.description,
        };
        const tracking = await TimeRecordModel.findByIdAndUpdate(
            req.params.id,
            { $set: fieldsToUpdate },
            { new: true },
        ).populate('project');
        res.status(200).send(tracking);
    }),
);

// Update isBillable of document
TimeRecordRouter.patch(
    '/:id/isbillable',
    asw(async (req, res) => {
        await TimeRecordModel.findByIdAndUpdate(req.params.id, {
            $set: {
                isBillable: req.body.isBillable,
            },
        });
        res.status(200).send('Billable in document is updated.');
    }),
);

// Update Project of document
TimeRecordRouter.patch(
    '/:id/project',
    asw(async (req, res) => {
        await TimeRecordModel.findByIdAndUpdate(req.params.id, {
            $set: {
                project: req.body.project,
            },
        });
        res.status(200).send('Project in document is updated.');
    }),
);

module.exports = TimeRecordRouter;
