const express = require('express');
const ProjectRouter = express.Router();
const ProjectModel = require('../models/project.model');
const asw = require('express-async-handler');

// Get all Projects
ProjectRouter.get(
    '/',
    asw(async (req, res) => {
        const projects = await ProjectModel.find();

        res.send(projects);
    }),
);

// Create new Project
ProjectRouter.post(
    '/',
    asw(async (req, res) => {
        const project = await ProjectModel.create(req.body);

        res.status(201).send(project);
    }),
);

module.exports = ProjectRouter;
