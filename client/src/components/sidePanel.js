import React from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Icon from '../assets/icons';

import './sidePanel.scss';

export default () => (
    <Col xl={2} md={3} className="side-panel col col-12">
        TimeWay <br />
        Time is Ticking Away
        <Nav defaultActiveKey="1" className="main-navbar flex-column">
            <NavLink to="/record" className="nav-link" activekey="1">
                <Icon name="Time2" width="24px" />
                Record Time
            </NavLink>
            <NavLink to="/projects" className="nav-link" activekey="2">
                <Icon name="Project2" width="24px" />
                Projects
            </NavLink>
        </Nav>
    </Col>
);
