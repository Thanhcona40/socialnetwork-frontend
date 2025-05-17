import { createContext, useContext, useCallback, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const setNotificationList = useCallback((notificationList = []) => {
        setNotifications(Array.isArray(notificationList) ? notificationList : []);
    }, []);

    const addNewNotification = useCallback((notification) => {
        if (!notification) return;
        setNotifications((prev) => [...prev, notification]);
    }, []);

    return (
        <NotificationContext.Provider 
            value={{ 
                notifications,
                setNotificationList,
                addNewNotification
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotificationContext must be used within a NotificationProvider");
    }
    return context;
};