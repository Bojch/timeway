import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';

const CloseButton = ({ children, label, onClose, className, ...props }) => {
    return (
        <Button {...props} label={label} className={classNames('close', className)} onClick={onClose}>
            {children}
        </Button>
    );
};

const propTypes = {
    /**
     * Sets the text for the close button.
     */
    label: PropTypes.string,

    /**
     * A Callback fired when the close button is clicked.
     */
    onClose: PropTypes.func,
};

const defaultProps = {
    label: 'Close',
};

CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
