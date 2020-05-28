import React, { useState, Component } from 'react';
import Icon from '../../../assets/icons';
import { DurationTimer } from '../timeRecordComponents';
import BillableButton from '../../../components/billableButton';
// import { CreateProject } from '../../projects/createProject';

import './timeRecordInput.scss';

export const TimeRecordInput = ({
    duration,
    updateTimeRecord,
    insertNewTimeRecord,
    description,
    onChange,
    handleIsBillableButtonClicked,
    isBillable,
}) => {
    return (
        <div className="timerecord-input-field">
            <div className="input-line">
                <input
                    name="description"
                    placeholder="Enter description of your current work"
                    type="text"
                    onChange={onChange}
                    value={description}
                ></input>
            </div>
            <div className="control-line clearfix">
                <div className="options">
                    <Icon name="Time" width="20" />
                </div>
                <DurationTimer
                    duration={duration}
                    updateTimeRecord={updateTimeRecord}
                    insertNewTimeRecord={insertNewTimeRecord}
                />
                <BillableButton isBillable={isBillable} handleButtonClick={handleIsBillableButtonClicked} />
                {/* <CreateProject initProject={initProject} project={project} /> */}
            </div>
        </div>
    );
};
