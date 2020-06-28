import React, { useState } from 'react';
import { DurationTimer, DropdownMenuFilter } from '../timeRecordComponents';
import BillableButton from '../../../components/billableButton';
import NotificationCenter from '../../../components/mixstrap/NotificationCenter/NotificationCenter';

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
