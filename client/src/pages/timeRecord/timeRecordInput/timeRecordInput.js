import React from 'react';
import { DurationTimer, DropdownMenuFilter, TimerOptions } from '../timeRecordComponents';
import BillableButton from '../../../components/billableButton';
import NotificationCenter from '../../../components/mixstrap/NotificationCenter/NotificationCenter';

import './timeRecordInput.scss';

export const TimeRecordInput = ({
    isRunning,
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
    const { DispatchNotification } = NotificationCenter();

    return (
        <div className="timerecord-input-field">
            <div className="input-line">
                <input
                    name="description"
                    placeholder="Enter description of your current work"
                    type="text"
                    onChange={(e) => onChange(e, DispatchNotification)}
                    value={description}
                ></input>
            </div>
            <div className="control-line clearfix">
                <TimerOptions isRunning={isRunning} />
                <DurationTimer offset={duration} onStart={insertNewTimeRecord} onStop={updateTimeRecord} />
                <BillableButton isBillable={isBillable} handleButtonClick={handleIsBillableButtonClicked} />
                <DropdownMenuFilter selectedProject={selectedProject} handleSelectedProject={handleSelectedProject} />
            </div>
        </div>
    );
};
