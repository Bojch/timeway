import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseButton from '../CloseButton';
import Icon from '../../../assets/icons';

const Notification = ({
    stylePrefix,
    variant,
    className,
    dismissible,
    children,
    closeLabel,
    onClose,
    timeout,
    ...props
}) => {
    const [show, setShow] = React.useState(true);
    const handleClose = (e) => {
        setShow(false);
        timeout ? setTimeout(onClose, timeout) : onClose();
    };

    return (
        <div {...props} className={classNames(stylePrefix, variant, className, show ? 'show' : 'hide')}>
            {children}

            {dismissible && (
                <CloseButton onClose={handleClose} label={closeLabel}>
                    <Icon name="Close" width="14px" />
                </CloseButton>
            )}
        </div>
    );
};

const propTypes = {
    /**
     * @default 'notification'
     */
    stylePrefix: PropTypes.string,

    /**
     * The Notification visual variant
     *
     * @type {'primary' | 'success' | 'error' | 'warning' | 'info'}
     */
    variant: PropTypes.string,

    /**
     * Renders a properly aligned dismiss button, as well as
     * adding extra horizontal padding to the Notification.
     */
    dismissible: PropTypes.bool,

    /**
     * A Callback fired when the close button is clicked.
     */
    onClose: PropTypes.func,

    /**
     * Sets the text for notification close button.
     */
    closeLabel: PropTypes.string,

    /**
     * After timeout the notification is removed.
     * For animation purposes
     */
    timeout: PropTypes.number,
};

const defaultProps = {
    stylePrefix: 'notification',
    variant: 'primary',
    closeLabel: 'X',
    timeout: 0,
};

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;
Notification.displayName = 'Notification';

Notification.PRIMARY = 'primary';
Notification.SUCCESS = 'success';
Notification.ERROR = 'error';
Notification.WARNING = 'warning';
Notification.INFO = 'info';

export default Notification;
