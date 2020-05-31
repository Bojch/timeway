import React from 'react';
import Icon from '../../../assets/icons';
import { DurationTimer, DropdownMenuFilter } from '../timeRecordComponents';
import BillableButton from '../../../components/billableButton';

import './timeRecordInput.scss';

export const TimeRecordInput = ({
    duration,
    updateTimeRecord,
    insertNewTimeRecord,
    description,
    onChange,
    handleIsBillableButtonClicked,
    isBillable,
    selectedProject,
    handleSelectedProject,
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
                <DropdownMenuFilter selectedProject={selectedProject} handleSelectedProject={handleSelectedProject} />
            </div>
        </div>
    );
};
