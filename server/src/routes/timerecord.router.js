const express = require('express');
const TimeRecordRouter = express.Router();
const TimeRecordModel = require('../models/timerecord.model');
const asw = require('express-async-handler');
const SimpleDate = require('../lib/simpleDate');
const Clod = require('clod');

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
        const [records, time] = await Promise.all([
            TimeRecordModel.find({
                start: {
                    $gte: SimpleDate().today.start(),
                    $lt: SimpleDate().today.stop(),
                },
                duration: {
                    $gt: 0,
                },
            })
                .sort({ _id: -1 })
                .populate('project'),

            TimeRecordModel.aggregate()
                .match({
                    start: { $gt: SimpleDate().today.start() },
                })
                .group({
                    _id: null,
                    total: { $sum: '$duration' },
                }),
        ]);

        res.send({
            records: records,
            total: Clod.isEmpty(time) ? 0 : time[0].total,
            date: SimpleDate().now(),
        });
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
                    stop: { $lt: SimpleDate().today.start() },
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
        const [records, time] = await Promise.all([
            TimeRecordModel.find({
                start: {
                    $gte: SimpleDate().getStart(req.params.date),
                    $lt: SimpleDate().getStop(req.params.date),
                },
            })
                .sort({ _id: -1 })
                .populate('project'),

            TimeRecordModel.aggregate([
                {
                    $match: {
                        start: {
                            $gte: SimpleDate().getStart(req.params.date),
                            $lt: SimpleDate().getStop(req.params.date),
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$duration' },
                    },
                },
                {
                    $sort: { _id: -1 },
                },
            ]),
        ]);

        res.send({ records: records, total: time[0].total, date: req.params.date });
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
            stop: SimpleDate().now(),
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
        res.send(`Document is ${req.body.isBillable ? '' : 'not '}Billable.`);
    }),
);

// Update document Project
TimeRecordRouter.patch(
    '/:id/project',
    asw(async (req, res) => {
        await TimeRecordModel.findByIdAndUpdate(req.params.id, {
            $set: {
                project: req.body.project,
            },
        });
        res.send('Time record Project is updated.');
    }),
);

// Update Description of document
TimeRecordRouter.patch(
    '/:id/description',
    asw(async (req, res) => {
        await TimeRecordModel.findByIdAndUpdate(req.params.id, {
            $set: {
                description: req.body.description,
            },
        });
        res.send('Time record description is updated.');
    }),
);

module.exports = TimeRecordRouter;
