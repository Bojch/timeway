import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import Icon from '../../../assets/icons';
import axios from 'axios';
import { URL_PROJECTS } from '../../../../config';

import './dropdownMenuFilter.scss';

export const DropdownMenuFilter = ({ selectedProject, handleSelectedProject, ...props }) => {
    const [projects, setProjects] = useState([]);
    const [newSelectedProject, setNewSelectedProject] = useState(null);

    React.useEffect(() => {
        setNewSelectedProject(selectedProject);
        fetchData();
    }, [selectedProject]);

    async function fetchData() {
        try {
            const res = await axios.get(URL_PROJECTS);
            setProjects(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    function onClick(project) {
        setNewSelectedProject(project);
        handleSelectedProject(project);
    }

    return (
        <Dropdown className={`dropdown-menu-filter ${props.className}`}>
            <Dropdown.Toggle
                as={CustomToggle}
                style={{ color: newSelectedProject === null ? '' : newSelectedProject.color }}
            >
                {newSelectedProject === null ? (
                    <>
                        <Icon name="Plus" width="19px" />
                        Add Project
                    </>
                ) : (
                    <>
                        <Icon name="Dots2" width="12px" style={{ fill: `${newSelectedProject.color}66` }} />
                        {newSelectedProject.name}
                    </>
                )}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu} onClick={onClick}>
                {projects.map((project, i) => {
                    return (
                        <Dropdown.Item
                            eventKey={i}
                            key={project._id}
                            style={{ color: project.color }}
                            onClick={() => onClick(project)}
                        >
                            {project.name}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

const CustomToggle = React.forwardRef(({ children, onClick, style }, ref) => {
    return (
        <a
            href=""
            ref={ref}
            style={style}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    );
});
CustomToggle.displayName = 'CustomToggle';

const CustomMenu = React.forwardRef(({ children, onClick, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
        <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
            <div className="filter-input-field">
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Filter project ..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
            </div>

            <Dropdown.Divider />
            <ul className="list-unstyled">
                <Dropdown.Item eventKey="-2" className="no-project" onClick={() => onClick(null)}>
                    No project
                </Dropdown.Item>
                {React.Children.toArray(children).length ? <Dropdown.Divider /> : ''}
                <div className="filter-from">
                    {React.Children.toArray(children).filter(
                        (child) => !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </div>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="-1" className="create-project">
                    <Icon name="Plus" width="21px" />
                    Create new project
                </Dropdown.Item>
            </ul>
        </div>
    );
});
CustomMenu.displayName = 'CustomMenu';
