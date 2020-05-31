import React, { Component } from 'react';
import axios from 'axios';
import { URL_TIMERECORDS } from '../../../config';
import { TimeRecordInput, TimeRecordList } from './timeRecordComponents';

export default class TimeRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            description: '',
            duration: 0,
            isBillable: false,
            project: null,

            total: 0,
            timeRecords: [],
            totalYesterday: 0,
            timeRecordsYesterday: [],
        };

        //     this.initProject = this.initProject.bind(this);
        this.onChange = this.onChange.bind(this);
        this.insertNewTimeRecord = this.insertNewTimeRecord.bind(this);
        this.updateTimeRecord = this.updateTimeRecord.bind(this);
        this.handleIsBillableButtonClicked = this.handleIsBillableButtonClicked.bind(this);
        this.onBillableChangeTimerecordInput = this.onBillableChangeTimerecordInput.bind(this);
        this.handleSelectedProject = this.handleSelectedProject.bind(this);
    }

    async componentDidMount() {
        const reqOne = axios.get(`${URL_TIMERECORDS}/today`);
        const reqTwo = axios.get(`${URL_TIMERECORDS}/yesterday`);
        const reqThree = axios.get(`${URL_TIMERECORDS}/isRunning`);

        try {
            const res = await axios.all([reqOne, reqTwo, reqThree]);
            const today = res[0].data;
            const yesterday = res[1].data;
            const isRunning = res[2].data;

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
                timeRecords: today,
                total: this.countTotal(today),
                timeRecordsYesterday: yesterday,
                totalYesterday: this.countTotal(yesterday),
            });
        } catch (err) {
            console.log(err);
        }
    }

    countTotal = (trackingList) => {
        let total = 0;
        trackingList.map((current, i) => {
            total += current.duration;
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

    // initProject = (projectId) => {
    //     if (!(this.state.id.length > 0)) return;

    //     axios
    //         .patch(`${URL_TIMERECORDS}/${this.state.id}/project`, { project: projectId })
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    async handleSelectedProject(timeRecordId, project) {
        this.setState({ project: project });

        if (timeRecordId.length === 0) {
            return;
        }

        try {
            const res = await axios.patch(`${URL_TIMERECORDS}/${timeRecordId}/project`, {
                project: project === null ? null : project._id,
            });
            console.log(res.data);
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
            this.setState({ id: res.data._id });
        } catch (err) {
            console.log(err);
        }

        return true;
    }

    async updateTimeRecord(duration, id, total, timeRecords, description) {
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
                total: total + duration,
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
                            this.state.total,
                            this.state.timeRecords,
                            this.state.description,
                        )
                    }
                    insertNewTimeRecord={this.insertNewTimeRecord}
                    handleIsBillableButtonClicked={(isBillable) =>
                        this.onBillableChangeTimerecordInput(this.state.id, isBillable)
                    }
                    isBillable={this.state.isBillable}
                    selectedProject={this.state.project}
                    handleSelectedProject={(project) => this.handleSelectedProject(this.state.id, project)}
                />

                <TimeRecordList
                    title="Today"
                    total={this.state.total}
                    timeRecords={this.state.timeRecords}
                    handleIsBillableButtonClicked={this.handleIsBillableButtonClicked}
                />
                <TimeRecordList
                    title="Yesterday"
                    total={this.state.totalYesterday}
                    timeRecords={this.state.timeRecordsYesterday}
                    handleIsBillableButtonClicked={this.handleIsBillableButtonClicked}
                />
            </>
        );
    };
}
