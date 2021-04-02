import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useInterval from './useInterval';
import sf from 'seconds-formater';
import Button from 'react-bootstrap/Button';
import clod from 'clod';

import './durationTimer.scss';

export const DurationTimer = ({offset, onStop, onStart}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const delay = 1000;

  useEffect(() => {
    if (offset > 0) {
      setIsRunning(true);
      setTime(offset);
    }
  }, [offset]);

  useInterval(
    () => {
      setTime(time + 1);
    },
    isRunning ? delay : null,
  );

  function start() {
    clod.isFunction(onStart) &&
      onStart()
        .then(() => {
          setIsRunning(true);
        })
        .catch(err => {
          setIsRunning(false);
          console.log(err);
        });
  }

  function stop() {
    clod.isFunction(onStop) && onStop(time);
    setIsRunning(false);
    setTime(0);
  }

  function onClick() {
    isRunning ? stop() : start();
  }

  return (
    <div className="duration-timer">
      <div className="timer">{sf.convert(time).format()}</div>
      <Button onClick={onClick} variant={isRunning ? 'danger' : 'primary'}>
        {isRunning ? 'STOP' : 'START'}
      </Button>
    </div>
  );
};

const propTypes = {
  /**
   * Sets the offset of the timer
   */
  offset: PropTypes.number,

  /**
   * Callback function on start the timer
   */
  onStart: PropTypes.func,

  /**
   * Callback function on stop the timer
   */
  onStop: PropTypes.func,
};

const defaultProps = {
  offset: 0,
};

DurationTimer.displayName = 'DurationTimer';
DurationTimer.propTypes = propTypes;
DurationTimer.defaultProps = defaultProps;

DurationTimer;
