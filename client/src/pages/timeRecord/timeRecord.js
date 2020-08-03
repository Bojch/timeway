import React, { Component } from 'react';
import axios from 'axios';
import { URL_TIMERECORDS } from '../../../config';
import { TimeRecordInput, TimeRecordList } from './timeRecordComponents';
import NotificationCenter from '../../components/mixstrap/NotificationCenter/NotificationCenter';
import NotificationCenterProvider from '../../components/mixstrap/NotificationCenter/NotificationCenterProvider';
import Notification from '../../components/mixstrap/NotificationCenter/Notification';
import Notify from '../../components/mixstrap/NotificationCenter/Notify';

export default class TimeRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRunning: false,
            id: null,
            description: '',
            duration: 0,
            start: 0,
            isBillable: false,
            project: null,

            timeRecords: [],
            timeRecordsSchedule: [],
        };

        this.insertNewTimeRecord = this.insertNewTimeRecord.bind(this);
        this.updateTimeRecord = this.updateTimeRecord.bind(this);
        this.handleIsBillableButtonClicked = this.handleIsBillableButtonClicked.bind(this);
        this.handleSelectedProject = this.handleSelectedProject.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
    }

    /**
     * Returns seconds how long is timer running
     * @param {Number} start in timestamp
     */
    getDuration = (start) => {
        return ((Date.now() - start) / 1000) | 0;
    };

    onVisibilitychange = () => {
        if (document.visibilityState === 'visible' && this.state.start > 0) {
            this.setState({ duration: this.getDuration(this.state.start) });
        }
    };

    async componentDidMount() {
        const reqOne = axios.get(`${URL_TIMERECORDS}/isRunning`);
        const reqTwo = axios.get(`${URL_TIMERECORDS}/today`);
        const requests = [];

        window.addEventListener('visibilitychange', this.onVisibilitychange);

        try {
            const lastInserted = await axios.get(`${URL_TIMERECORDS}/lastinserted`);
            lastInserted.data.map((curr, i) => {
                requests[i] = axios.post(`${URL_TIMERECORDS}/schedule/${curr.date}`);
            });
            const schedule = await axios.all(requests);

            const res = await axios.all([reqOne, reqTwo]);
            const isRunning = res[0].data;
            const today = res[1].data;

            if (Object.keys(isRunning).length > 0) {
                this.setState({
                    isRunning: true,
                    project: typeof isRunning.project === 'object' ? isRunning.project : null,
                    id: isRunning._id,
                    description: isRunning.description,
                    duration: this.getDuration(Date.parse(isRunning.start)),
                    start: Date.parse(isRunning.start),
                    isBillable: isRunning.isBillable,
                });
            }

            this.setState({
                timeRecords: today,
                timeRecordsSchedule: schedule,
            });
        } catch (err) {
            console.log(err);
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.timeoutID);
        window.removeEventListener('visibilitychange', this.onVisibilitychange);
    };

    onBillableChangeTimerecordInput = (id, isBillable) => {
        if (this.state.id === null) {
            this.setState({ isBillable: isBillable });
            return;
        }

        this.handleIsBillableButtonClicked(id, isBillable);
    };

    async handleIsBillableButtonClicked(id, isBillable) {
        try {
            const res = await axios.patch(`${URL_TIMERECORDS}/${id}/isbillable`, {
                isBillable: isBillable,
            });
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    onSelectedProjectChanged = (timeRecordId, project) => {
        this.setState({ project: project });

        if (timeRecordId === null) {
            return;
        }

        this.handleSelectedProject(timeRecordId, project);
    };

    async handleSelectedProject(timeRecordId, project) {
        try {
            const res = await axios.patch(`${URL_TIMERECORDS}/${timeRecordId}/project`, {
                project: project === null ? null : project._id,
            });
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    onChange = (e, disppatchNotification) => {
        this.setState({ [e.target.name]: e.target.value });

        if (this.state.isRunning) {
            clearTimeout(this.timeoutID);
            this.timeoutID = setTimeout(
                () => this.updateDescription(this.state.id, this.state.description, disppatchNotification),
                2000,
            );
        }
    };

    async updateDescription(id, description, disppatchNotification) {
        try {
            const res = await axios.patch(`${URL_TIMERECORDS}/${id}/description`, {
                description: description,
            });

            Notify.Info(disppatchNotification, res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async insertNewTimeRecord() {
        if (this.state.description.length === 0) {
            throw 'Description should not be empty!!!';
        }

        const data = {
            description: this.state.description,
            isBillable: this.state.isBillable,
            project: this.state.project === null ? null : this.state.project._id,
        };

        try {
            const res = await axios.post(`${URL_TIMERECORDS}`, data);
            this.setState({ id: res.data._id, isRunning: true });
        } catch (err) {
            throw 'The record was not inserted into Database.';
        }
    }

    async updateTimeRecord(duration, id, timeRecords, description) {
        try {
            const res = await axios.patch(`${URL_TIMERECORDS}/${id}`, {
                duration: duration,
                description: description,
            });
            timeRecords.records.unshift(res.data);
            timeRecords.total += duration;

            this.setState({
                timeRecords: timeRecords,
                id: '',
                isRunning: false,
                description: '',
                duration: 0,
                project: null,
            });
        } catch (err) {
            console.log(err);
        }
    }

    render = () => {
        return (
            <>
                <Home />

                <TimeRecordInput
                    onChange={this.onChange}
                    description={this.state.description}
                    duration={this.state.duration}
                    isRunning={this.state.isRunning}
                    updateTimeRecord={(duration) => {
                        if (this.state.id !== null && duration > 0)
                            this.updateTimeRecord(
                                duration,
                                this.state.id,
                                this.state.timeRecords,
                                this.state.description,
                            );
                    }}
                    insertNewTimeRecord={this.insertNewTimeRecord}
                    handleIsBillableButtonClicked={(isBillable) =>
                        this.onBillableChangeTimerecordInput(this.state.id, isBillable)
                    }
                    isBillable={this.state.isBillable}
                    selectedProject={this.state.project}
                    handleSelectedProject={(project) => this.onSelectedProjectChanged(this.state.id, project)}
                />

                <TimeRecordList
                    timeRecords={this.state.timeRecords}
                    handleIsBillableButtonClicked={this.handleIsBillableButtonClicked}
                    handleSelectedProject={this.handleSelectedProject}
                />

                {this.state.timeRecordsSchedule.map((trs, i) => {
                    return (
                        <TimeRecordList
                            timeRecords={trs.data}
                            handleIsBillableButtonClicked={this.handleIsBillableButtonClicked}
                            handleSelectedProject={this.handleSelectedProject}
                            key={i}
                        />
                    );
                })}
            </>
        );
    };
}

const Home = () => {
    const { DispatchNotification } = NotificationCenter();

    return (
        <div>
            <button
                onClick={() =>
                    DispatchNotification({
                        type: NotificationCenterProvider.ADD,
                        payload: {
                            content: { message: 'Info message' },
                            type: Notification.INFO,
                        },
                    })
                }
            >
                ADD
            </button>
            <button
                onClick={() =>
                    DispatchNotification({
                        type: NotificationCenterProvider.REMOVE_ALL,
                    })
                }
            >
                REMOVE ALL
            </button>
        </div>
    );
};
