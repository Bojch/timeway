const express = require('express');
const ProjectRouter = express.Router();
const ProjectModel = require('../models/project.model');
const asw = require('express-async-handler');

// Get all Projkects
ProjectRouter.get(
    '/',
    asw(async (req, res) => {
        const projects = await ProjectModel.find();

        res.send({
            err: false,
            data: projects,
        });
    }),
);

module.exports = ProjectRouter;
