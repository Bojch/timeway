import React from 'react';
import moment from 'moment';
import sf from '../../../libs/secondsFormater';
import { time_format } from '../../../../config';
import BillableButton from '../../../components/billableButton';
import { DropdownMenuFilter } from '../timeRecordComponents';

import './timeRecordList.scss';

export const TimeRecordList = ({ title, total, timeRecords, handleIsBillableButtonClicked, handleSelectedProject }) => (
    <div className="timerecord-list">
        <div className="trl-hd trl-row">
            <span className="title">{title}</span>
            <span className="total">
                <span className="total-text">Total:</span>
                <span className="total-number">{sf.convert(total).format()}</span>
            </span>
        </div>

        <div className="trl-body">
            {timeRecords.map((tt, i) => (
                <div key={tt._id} className="trl-row clearfix">
                    <span className="description">{tt.description}</span>
                    <span className="options">||||</span>
                    <span className="duration">{sf.convert(tt.duration).format()}</span>
                    <span className="interval">
                        {moment(tt.start).format(time_format)} - {moment(tt.stop).format(time_format)}
                    </span>
                    <BillableButton
                        isBillable={tt.isBillable}
                        handleButtonClick={(isBillable) => handleIsBillableButtonClicked(tt._id, isBillable)}
                    />
                    <DropdownMenuFilter
                        selectedProject={tt.project}
                        handleSelectedProject={(project) => handleSelectedProject(tt._id, project)}
                    />
                </div>
            ))}
        </div>
    </div>
);
