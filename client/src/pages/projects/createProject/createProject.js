import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Icon from '../../../assets/icons';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import RandomColorGenerator from '../../../libs/randomColorGenerator';
import { URL_PROJECTS } from '../../../../config';
import axios from 'axios';

import './createProject.scss';

export const CreateProject = ({ initProject, project }) => {
    const [show, setShow] = useState(false);

    const [color, setColor] = useState(project.color);
    const [genColor, setGenColor] = useState('');

    const [newProjectName, setNewProjectName] = useState('');
    const [projectName, setProjectName] = useState('Add Project');

    const onChange = (e) => {
        setNewProjectName(e.target.value);
    };
    const handleShow = () => {
        setGenColor(RandomColorGenerator().preDefinedRandom());
        setShow(true);
    };
    const handleClose = () => setShow(false);
    const handleCreate = () => {
        if (projectName.length === 0) throw 'Don`t forget to enter project name!';

        axios
            .post(`${URL_PROJECTS}`, { name: newProjectName, color: genColor })
            .then((res) => {
                initProject(res.data._id);
            })
            .catch((err) => {
                console.log(err);
            });

        setProjectName(newProjectName);
        setColor(genColor);
        setShow(false);
    };

    // useEffect(() => {
    //     if (props.onChange) {
    //         props.onChange(formData);
    //     }
    // }, [formData.username, formData.password]);

    console.log(project.color);
    return (
        <div className="bLeft add-project">
            <a className="btn-add-project" onClick={handleShow} style={{ color: color }}>
                <Icon name="Change" width="21" style={{ fill: color }} />
                <span style={{ color: color }}>{projectName}</span>
            </a>

            <Modal show={show} onHide={handleClose} className="modal-dialog-centered">
                <Modal.Header closeButton>
                    <Modal.Title>Create new project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body-content">
                        <div className="project-name-input">
                            <Form.Control
                                type="text"
                                name="projectName"
                                onChange={onChange}
                                placeholder="Enter project name"
                            />
                        </div>
                        <div className="color-chooser-container">
                            <div className="color-item" style={{ background: genColor }} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
