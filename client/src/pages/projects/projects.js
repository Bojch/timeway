import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { URL_PROJECTS } from '../../../config';
import { CreateProject } from './createProject';

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.get(URL_PROJECTS);
            this.setState({ projects: res.data });
        } catch (err) {
            console.log(err);
        }
    }

    async onCreateNewProject(name, color) {
        try {
            if (name.length === 0) throw 'Don`t forget to enter project name!';

            const res = await axios.post(`${URL_PROJECTS}`, { name: name, color: color });
            let projects = this.state.projects;
            projects.unshift(res.data);
            this.setState({ projects: projects });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <>
                <Row className="tr-page-header-wrapper">
                    <Col>
                        <h1>Projects</h1>
                    </Col>
                    <Col>
                        <div className="tr-flex tr-justify-content-end">
                            <CreateProject onCreateNewProject={(name, color) => this.onCreateNewProject(name, color)} />
                        </div>
                    </Col>
                </Row>

                <div className="tr-card">
                    <div className="tr-card-header">
                        <span>Projects</span>
                    </div>
                </div>

                <table className="tr-project-table tr-table-bordered tr-replace-cell-borders light tr-table-hover">
                    <ProjectsTableHeader />
                    <ProjectsTableBody projects={this.state.projects} />
                </table>
            </>
        );
    }
}

const ProjectsTableHeader = () => (
    <thead>
        <tr>
            <th>Name</th>
            <th>Status</th>
            <th></th>
        </tr>
    </thead>
);

const ProjectsTableBody = ({ projects }) => (
    <tbody>
        {projects.map((currentProject, i) => (
            <tr key={i}>
                <td style={{ color: currentProject.color }}>{currentProject.name}</td>
                <td>time</td>
                <td className="tr-table-td-last">|||</td>
            </tr>
        ))}
    </tbody>
);
