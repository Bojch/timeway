import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
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
