import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NotificationCenterProvider from './NotificationCenterProvider';
import NotificationCenter from './NotificationCenter';
import Notification from './Notification';
import ToggleButton from '../ToggleButton';
import Icon from '../../../assets/icons';

const NotificationCenterPanel = React.forwardRef(
    ({ stylePrefix, className, dismissible, onToggle, toggleLabel, show, notifications, children, ...props }, ref) => {
        const { DispatchNotification } = NotificationCenter();

        if (ref) {
            props.ref = ref;
        }

        return (
            <div {...props} className={classNames(stylePrefix, className, show ? 'show' : 'hide')}>
                <div className={classNames('ncp-container')}>
                    <ToggleButton
                        onToggle={() => onToggle(!show)}
                        label={toggleLabel}
                        className={classNames('ncp-togglebutton')}
                    >
                        <Icon name="FourDots" width="18px" />
                    </ToggleButton>

                    <div className={classNames('ncp-notifications')}>
                        {Object.entries(notifications).map(([k, v]) => (
                            <Notification
                                key={k}
                                dismissible={true}
                                variant={v.type}
                                timeout={200}
                                onClose={() =>
                                    DispatchNotification({
                                        type: NotificationCenterProvider.REMOVE,
                                        payload: { id: k },
                                    })
                                }
                            >
                                {v.content.message}
                            </Notification>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
);

const propTypes = {
    /**
     * @default 'notification'
     */
    stylePrefix: PropTypes.string,

    /**
     * When `true` The modal will show itself.
     */
    show: PropTypes.bool,

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
    toggleLabel: PropTypes.string,

    /**
     * Object of Notifications to show
     */
    notifications: PropTypes.object,
};

const defaultProps = {
    stylePrefix: 'notification-center-panel',
    show: false,
    toggleLabel: 'X',
    dismissible: true,
    notifications: {},
};

NotificationCenterPanel.propTypes = propTypes;
NotificationCenterPanel.defaultProps = defaultProps;
NotificationCenterPanel.displayName = 'NotificationCenterPanel';

export default NotificationCenterPanel;
