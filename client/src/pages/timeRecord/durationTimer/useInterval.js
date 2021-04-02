import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const useInterval = (callback, delay) => {
  const ref = useRef(() => {});

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      ref.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const propTypes = {
  /**
   * Callback function
   */
  callback: PropTypes.func,

  /**
   * Time for executing the funciton
   */
  delay: PropTypes.number,
};

const defaultProps = {
  delay: null,
};

useInterval.propTypes = propTypes;
useInterval.defaultProps = defaultProps;

export default useInterval;
