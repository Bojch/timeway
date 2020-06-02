import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Icon from '../../../assets/icons';
import sf from 'seconds-formater';

import './durationTimer.scss';

export class DurationTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 0,
            isActive: false,
            startWithButton: false,
            manual: false,
        };

        this.onClick = this.onClick.bind(this);
    }

    componentDidUpdate() {
        if (!this.state.startWithButton)
            if (this.state.isActive && this.props.duration > 0 && this.state.time === 0) {
                this.setState({ time: this.props.duration });
            } else if (this.state.isActive && this.props.duration === 0) {
                this.stop(false);
            } else if (!this.state.isActive && this.props.duration > 0) {
                this.setState({ isActive: true, time: this.props.duration });
                this.startTimerInterval();
            }
    }

    componentDidMount() {
        this.startTimerInterval();
        this.setState({ isActive: true });
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    startTimerInterval = () => {
        this.intervalID = setInterval(() => {
            this.setState({ time: this.state.time + 1 });
        }, 1000);
    };

    onClick = () => {
        this.state.isActive ? this.stop(true) : this.start();
    };

    stop = (sendData) => {
        clearInterval(this.intervalID);
        const duration = this.state.time;

        this.setState({ isActive: false, time: 0 });

        if (sendData) this.props.updateTimeRecord(duration);
    };

    start = () => {
        this.props.insertNewTimeRecord().then((resolve) => {
            if (resolve) {
                this.startTimerInterval();
                this.setState({ isActive: true, startWithButton: true, time: 0 });
            }
        });
    };

    onManualClick = (e) => {
        e.preventDefault();
        this.setState({ manual: !this.state.manual });
    };

    render() {
        return (
            <div className="duration-timer">
                <div className="timer">{sf.convert(this.state.time).format()}</div>
                {this.state.manual ? (
                    <Button onClick={() => console.log('ADD')}>ADD</Button>
                ) : (
                    <Button onClick={this.onClick} variant={this.state.isActive ? 'danger' : 'primary'}>
                        {this.state.isActive ? 'STOP' : 'START'}
                    </Button>
                )}
                <div className="options">
                    {this.state.isActive ? (
                        'X'
                    ) : (
                        <a href="" onClick={this.onManualClick}>
                            {this.state.manual ? <Icon name="List" width="20" /> : <Icon name="Time" width="20" />}
                        </a>
                    )}
                </div>
            </div>
        );
    }
}
