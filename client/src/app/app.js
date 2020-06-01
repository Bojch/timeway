import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SidePanel from '../components/sidePanel';
import MainPanel from '../components/mainPanel';

class App extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <SidePanel />
                    <MainPanel />
                </Row>
            </Container>
        );
    }
}

export default withRouter(App);
