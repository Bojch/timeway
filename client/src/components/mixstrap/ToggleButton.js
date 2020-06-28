import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';

const ToggleButton = ({ children, label, onToggle, className, ...props }) => {
    return (
        <Button {...props} label={label} className={classNames('toggle', className)} onClick={onToggle}>
            {children}
        </Button>
    );
};

const propTypes = {
    /**
     * Sets the text for the toggle button.
     */
    label: PropTypes.string,

    /**
     * A Callback fired when the toggle button is clicked.
     */
    onClose: PropTypes.func,
};

const defaultProps = {
    label: 'Toggle',
};

ToggleButton.displayName = 'ToggleButton';
ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;

export default ToggleButton;
