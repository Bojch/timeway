import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import sf from '../../../utils/secondsFormater';

import './durationTimer.scss';

export class DurationTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 0,
            isActive: false,
            startWithButton: false,
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

    render() {
        return (
            <div className="duration-timer clearfix">
                <div className="timer">{sf.convert(this.state.time).format()}</div>
                <Button onClick={this.onClick}>{this.state.isActive ? 'STOP' : 'START'}</Button>
            </div>
        );
    }
}
