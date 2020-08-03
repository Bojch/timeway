import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../assets/icons';

export const TimerOptions = ({ isRunning }) => {
    const [manual, setManual] = useState(false);

    return (
        <div className="options">
            {isRunning ? (
                'X'
            ) : (
                <a href="" onClick={() => console.log('click')}>
                    {manual ? <Icon name="List" width="20" /> : <Icon name="Time" width="20" />}
                </a>
            )}
            {/* {this.state.manual ? (
                <Button onClick={() => console.log('ADD')}>ADD</Button>
            ) : (
                */}
        </div>
    );
};

const propTypes = {
    /**
     * If timer is running
     */
    isRunning: PropTypes.bool,
};

const defaultProps = {
    isRunning: false,
};

TimerOptions.displayName = 'TimerOptions';
TimerOptions.propTypes = propTypes;
TimerOptions.defaultProps = defaultProps;
