import React, { Component } from 'react';
import axios from 'axios';
import { URL_TIMERECORDS } from '../../../config';
import { TimeRecordInput, TimeRecordList } from './timeRecordComponents';
import moment from 'moment';

export default class TimeRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            description: '',
            duration: 0,
            isBillable: false,
            project: null,

            totalTime: 0,
            timeRecords: [],
            timeRecordsYesterday: [],
            timeRecordsBeforeYesterday: [],
        };

        this.onChange = this.onChange.bind(this);
        this.insertNewTimeRecord = this.insertNewTimeRecord.bind(this);
        this.updateTimeRecord = this.updateTimeRecord.bind(this);
        this.handleIsBillableButtonClicked = this.handleIsBillableButtonClicked.bind(this);
        this.onBillableChangeTimerecordInput = this.onBillableChangeTimerecordInput.bind(this);
        this.handleSelectedProject = this.handleSelectedProject.bind(this);
        this.onSelectedProjectChanged = this.onSelectedProjectChanged.bind(this);
    }

    async componentDidMount() {
        const reqOne = axios.get(`${URL_TIMERECORDS}/isRunning`);
        const reqTwo = axios.get(`${URL_TIMERECORDS}/today`);
        const reqThree = axios.get(`${URL_TIMERECORDS}/yesterday`);
        const reqFour = axios.get(`${URL_TIMERECORDS}/beforeyesterday`);

        try {
            const res = await axios.all([reqOne, reqTwo, reqThree, reqFour]);
            const isRunning = res[0].data;
            const today = res[1].data;
            const yesterday = res[2].data;
            const beforeyesterday = res[3].data;

            if (Object.keys(isRunning).length > 0) {
                this.setState({
                    project: typeof isRunning.project === 'object' ? isRunning.project : null,
                    id: isRunning._id,
                    description: isRunning.description,
                    duration: Math.floor((Date.now() - Date.parse(isRunning.start)) / 1000),
                    isBillable: isRunning.isBillable,
                });
            }

            this.setState({
                totalTime: this.countTotal(today),
                timeRecords: today,
                timeRecordsYesterday: yesterday,
                timeRecordsBeforeYesterday: beforeyesterday,
            });
        } catch (err) {
            console.log(err);
        }
    }

    countTotal = (records) => {
        let total = 0;
        records.map((current, i) => {
            return (total += current.duration);
        });

        return total;
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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

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
            this.setState({ id: res.data._id });
        } catch (err) {
            console.log(err);
        }

        return true;
    }

    async updateTimeRecord(duration, id, timeRecords, description, totalTime) {
        try {
            const res = await axios.patch(`${URL_TIMERECORDS}/${id}`, {
                duration: duration,
                description: description,
            });
            timeRecords.unshift(res.data);

            this.setState({
                timeRecords: timeRecords,
                id: '',
                description: '',
                totalTime: totalTime + duration,
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
                <TimeRecordInput
                    onChange={this.onChange}
                    description={this.state.description}
                    duration={this.state.duration}
                    updateTimeRecord={(duration) =>
                        this.updateTimeRecord(
                            duration,
                            this.state.id,
                            this.state.timeRecords,
                            this.state.description,
                            this.state.totalTime,
                        )
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
                    title="Today"
                    timeRecords={this.state.timeRecords}
                    handleIsBillableButtonClicked={this.handleIsBillableButtonClicked}
                    handleSelectedProject={this.handleSelectedProject}
                    totalTime={this.state.totalTime}
                />
                <TimeRecordList
                    title="Yesterday"
                    timeRecords={this.state.timeRecordsYesterday}
                    handleIsBillableButtonClicked={this.handleIsBillableButtonClicked}
                    handleSelectedProject={this.handleSelectedProject}
                />

                <TimeRecordList
                    title={moment().subtract(2, 'days').format('MMMM Do YYYY')}
                    timeRecords={this.state.timeRecordsBeforeYesterday}
                    handleIsBillableButtonClicked={this.handleIsBillableButtonClicked}
                    handleSelectedProject={this.handleSelectedProject}
                />
            </>
        );
    };
}
