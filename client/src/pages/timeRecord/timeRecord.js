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
            id: '',
            description: '',
            duration: 0,
            isBillable: false,
            project: null,

            timeRecords: [],
            timeRecordsSchedule: [],
        };

        this.onChange = this.onChange.bind(this);
        this.insertNewTimeRecord = this.insertNewTimeRecord.bind(this);
        this.updateTimeRecord = this.updateTimeRecord.bind(this);
        this.handleIsBillableButtonClicked = this.handleIsBillableButtonClicked.bind(this);
        this.onBillableChangeTimerecordInput = this.onBillableChangeTimerecordInput.bind(this);
        this.handleSelectedProject = this.handleSelectedProject.bind(this);
        this.onSelectedProjectChanged = this.onSelectedProjectChanged.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
    }

    async componentDidMount() {
        const reqOne = axios.get(`${URL_TIMERECORDS}/isRunning`);
        const reqTwo = axios.get(`${URL_TIMERECORDS}/today`);
        const requests = [];

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
                    duration: Math.floor((Date.now() - Date.parse(isRunning.start)) / 1000),
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
    };

    onBillableChangeTimerecordInput = (id, isBillable) => {
        if (this.state.id.toString().length <= 0) {
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

        if (timeRecordId.length === 0) {
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

            Notify.Error(disppatchNotification, res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async insertNewTimeRecord() {
        if (this.state.description.length === 0) {
            console.log('Description should not be empty!!!');
            return false;
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
            console.log(err);
        }

        return true;
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
                    updateTimeRecord={(duration) =>
                        this.updateTimeRecord(duration, this.state.id, this.state.timeRecords, this.state.description)
                    }
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
