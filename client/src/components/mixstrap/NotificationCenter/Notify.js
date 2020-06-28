import NotificationCenterProvider from './NotificationCenterProvider';
import Notification from './Notification';

const Notify = (disppatchNotification, msg, type) => {
    disppatchNotification({
        type: NotificationCenterProvider.ADD,
        payload: {
            content: { message: msg },
            type: type || Notification.INFO,
        },
    });
};

Notify.Info = (disppatchNotification, msg) => {
    Notify(disppatchNotification, msg);
};

Notify.Primary = (disppatchNotification, msg) => {
    Notify(disppatchNotification, msg, Notification.PRIMARY);
};

Notify.Success = (disppatchNotification, msg) => {
    Notify(disppatchNotification, msg, Notification.SUCCESS);
};

Notify.Error = (disppatchNotification, msg) => {
    Notify(disppatchNotification, msg, Notification.ERROR);
};

Notify.Warning = (disppatchNotification, msg) => {
    Notify(disppatchNotification, msg, Notification.WARNING);
};

export default Notify;
