import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Divider, Avatar } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { api, API_BASE_URL } from '../../config/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatTimeDifference } from '../../Utils/formatTimeDifferent';
import { useNotificationContext } from '../../hooks/useNotificationContext';

const Notification = () => {
    const auth = useSelector(store => store.auth)
    const { setNotificationList, notifications } = useNotificationContext()
    const navigate = useNavigate()

    const getNotify = async () => {
        const {data} = await api.get(`${API_BASE_URL}/api/notification/listNotify/${auth?.user?.id}`)
        setNotificationList(data)
    }

    useEffect(() => {
        getNotify() 
    },[])
    return (
        <div className="max-w-lg mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl ml-3 font-semibold text-gray-800">Notifications</h2>
                <NotificationsNoneIcon fontSize="large" className="text-gray-500" />
            </div>
            <Divider />
            <div className="space-y-4 mt-4">
                {notifications.map((notification) => (
                    <Card 
                        key={notification.id} 
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => navigate(`/postDetail/${notification.idPosts}`)}
                    >
                        <CardContent className="flex items-center">
                            <Avatar className="mr-4 bg-blue-500" src={notification.sender.image} />
                            <div>
                                <Typography variant="subtitle1" className="text-gray-900 font-medium">
                                    {notification.title}
                                </Typography>
                                <p className='text-sm text-gray-400'>{formatTimeDifference(notification.timestamp)}</p>
                            </div>       
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Notification;
