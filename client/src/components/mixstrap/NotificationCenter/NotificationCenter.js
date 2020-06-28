import { useContext } from 'react';
import NotificationCenterContext from './NotificationCenterContext';

const NotificationCenter = () => {
    return useContext(NotificationCenterContext);
};

NotificationCenter.displayName = 'NotificationCenter';

export default NotificationCenter;
