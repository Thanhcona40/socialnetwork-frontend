import { Avatar } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useChatContext } from '../../hooks/useChatContext';
import { api } from '../../config/api';
import { useLocation } from 'react-router-dom';
import { getListFriend } from '../../redux/Auth/action';

const UserList = () => {
    const { selectChatUser, getChatHistory } = useChatContext();

    const location = useLocation()
    const dispatch = useDispatch();
     const auth = useSelector(store => store.auth)

    const getMessage = async (senderId, recipientId) => {
        if (!senderId || !recipientId) {
            console.error("Sender or recipient ID is missing");
            return;
        }

        try {
            const { data } = await api.get(`/api/messages/${senderId}/${recipientId}`);
            console.log("list message:", data);
            getChatHistory(data); // Lưu trữ lịch sử chat vào context
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        dispatch(getListFriend());
    }, []);

    return (
        <div className="p-4">
            {location.pathname === '/messages' ?
                (<div className='pt-3 font-bold text-xl text-gray-800'>
                    {auth.user.fullName}
                </div>) : ''}
            <ul className="mt-4 space-y-4">
                {console.log("list friend cua t dau: ", auth?.listFriend)}
                {Array.isArray(auth?.listFriend) && auth.listFriend.length > 0 ? (
                    auth.listFriend.map((friend) => (
                        <li
                            key={friend?.id}
                            className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors duration-200 ease-in-out"
                            onClick={() => {
                                selectChatUser(friend); // Chọn người dùng để chat
                                getMessage(auth?.user?.id, friend?.id); // nhan tin nhan
                            }}
                        >
                            <div className="relative w-10 h-10">
                                {/* Avatar */}
                                <Avatar src={friend?.image} className="w-10 h-10 rounded-full" />

                                {/* Trạng thái online */}
                                {friend?.status === "ONLINE" && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>
                            <div>
                                <p className="font-medium">{friend?.fullName}</p>
                                <p className='font-normal text-gray-500 text-xs'>{friend?.status === "ONLINE" ? 'Đang hoạt động' : 'Không hoạt động'}</p>  
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No users available</li> 
                )}
            </ul>
        </div>
    );
};


export default UserList;
