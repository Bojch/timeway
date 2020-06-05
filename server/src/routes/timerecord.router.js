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
        const [records, total] = await Promise.all([
            TimeRecordModel.find({
                start: {
                    $gte: SimpleDate().today.start,
                    $lt: SimpleDate().today.stop,
                },
                duration: {
                    $gt: 0,
                },
            })
                .sort({ _id: -1 })
                .populate('project'),

            TimeRecordModel.aggregate()
                .match({
                    start: { $gt: SimpleDate().today.start },
                })
                .group({
                    _id: null,
                    total: { $sum: '$duration' },
                }),
        ]);

        res.send({ records: records, total: total });
    }),
);

// Get the last 10 dates from data record inserted into dB in descending order
// output: [{"date" : "2020-06-04T00:00:00.000Z"}, ...]
TimeRecordRouter.get(
    '/lastinserted',
    asw(async (req, res) => {
        const records = await TimeRecordModel.aggregate([
            {
                $match: {
                    duration: {
                        $gt: 0,
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$start' } },
                    date: { $first: { $dateToString: { format: '%Y-%m-%d', date: '$start' } } },
                },
            },
            {
                $sort: { _id: -1 },
            },
            { $limit: 10 },
        ]);

        res.send(records);
    }),
);

/**
 * Get all finished time trackings for the date passed as parameter
 * @param {String} date - date in format YYYY-MM-DD
 */
TimeRecordRouter.post(
    '/schedule/:date',
    asw(async (req, res) => {
        const [records, total] = await Promise.all([
            TimeRecordModel.find({
                start: {
                    $gte: SimpleDate().getStart(req.params.date),
                    $lt: SimpleDate().getStop(req.params.date),
                },
                duration: {
                    $gt: 0,
                },
            })
                .sort({ _id: -1 })
                .populate('project'),

            TimeRecordModel.aggregate()
                .match({
                    start: { $gt: SimpleDate().getStart(req.params.date) },
                })
                .group({
                    _id: null,
                    total: { $sum: '$duration' },
                }),
        ]);

        res.send({ records: records, total: 0, date: req.params.date });
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
