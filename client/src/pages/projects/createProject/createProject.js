import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import RandomColorGenerator from '../../../libs/randomColorGenerator';

import './createProject.scss';

export const CreateProject = ({ onCreateNewProject }) => {
    const [show, setShow] = useState(false);

    const [genColor, setGenColor] = useState('');
    const [newProjectName, setNewProjectName] = useState('');

    return (
        <div className="create-project">
            <Button
                variant="outline-primary"
                onClick={() => {
                    setGenColor(RandomColorGenerator().preDefinedRandom());
                    setShow(true);
                }}
            >
                Create Project
            </Button>

            <Modal show={show} onHide={() => setShow(false)} className="modal-dialog-centered">
                <Modal.Header closeButton>
                    <Modal.Title>Create new project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body-content">
                        <div className="project-name-input">
                            <Form.Control
                                type="text"
                                name="newProjectName"
                                onChange={(e) => {
                                    setNewProjectName(e.target.value);
                                }}
                                placeholder="Enter project name"
                            />
                        </div>
                        <div className="color-chooser-container">
                            <div className="color-item" style={{ background: genColor }} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancle
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            onCreateNewProject(newProjectName, genColor);
                            setShow(false);
                        }}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
