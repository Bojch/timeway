import React, { useState, useEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';
import NotificationCenterContext from './NotificationCenterContext';
import NotificationCenterPanel from './NotificationCenterPanel';

const initialState = {};

const ADD = 'ADD';
const REMOVE = 'REMOVE';
const REMOVE_ALL = 'REMOVE_ALL';

const notificationCenterReducer = (state, action) => {
    switch (action.type) {
        case ADD:
            const id = +new Date();
            return {
                ...state,
                [id]: {
                    content: action.payload.content,
                    type: action.payload.type,
                },
            };
        case REMOVE:
            delete state[action.payload.id];
            return { ...state };
        case REMOVE_ALL:
            return initialState;
        default:
            return state;
    }
};

const NotificationCenterProvider = ({ children, ...props }) => {
    const [notifications, DispatchNotification] = useReducer(notificationCenterReducer, initialState);
    const DispatchNotificationOptions = { notifications, DispatchNotification };
    const [show, setShow] = useState(false);
    const node = useRef(null);

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }

        setShow(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <NotificationCenterContext.Provider value={DispatchNotificationOptions}>
            {children}

            {ReactDOM.createPortal(
                <NotificationCenterPanel
                    ref={node}
                    {...props}
                    show={show}
                    onToggle={setShow}
                    notifications={notifications}
                />,
                document.body,
            )}
        </NotificationCenterContext.Provider>
    );
};

NotificationCenterProvider.displayName = 'NotificationCenterProvider';

NotificationCenterProvider.ADD = ADD;
NotificationCenterProvider.REMOVE = REMOVE;
NotificationCenterProvider.REMOVE_ALL = REMOVE_ALL;

export default NotificationCenterProvider;
