import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const buttonStyle = {
    cursor: 'pointer',
};

const BillableButton = ({ isBillable, handleButtonClick, stylePrefix, className, ...props }) => {
    const [change, setChange] = useState(false);

    function onClick() {
        if (!handleButtonClick) return;

        setChange(!change);
        handleButtonClick(!change);
    }

    useEffect(() => {
        setChange(isBillable);
    }, [isBillable]);

    return (
        <span
            {...props}
            className={classNames(stylePrefix, className, change ? 'billable' : '')}
            onClick={onClick}
            style={buttonStyle}
        >
            $
        </span>
    );
};

const propTypes = {
    /**
     * Default style of the component
     */
    stylePrefix: PropTypes.string,

    /**
     * When `true` The modal will show itself.
     */
    isBillable: PropTypes.bool,
};

const defaultProps = {
    stylePrefix: 'billable-button',
    isBillable: false,
};

BillableButton.propTypes = propTypes;
BillableButton.defaultProps = defaultProps;
BillableButton.displayName = 'BillableButton';

export default BillableButton;
