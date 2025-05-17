import React from 'react';
import UserList from './UserList';
import ChatWindow from './ChatWindow';

const Message = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Danh sách người dùng */}
            <div className=" w-1/4 border-r bg-white overflow-y-auto">
                <UserList/>
            </div>

            {/* Khu vực chat */}
            <div className="flex-1 flex flex-col">
                {/* Phần hiển thị tin nhắn */}
                <div className="flex-1 overflow-y-auto bg-white p-4 border-b">
                    <ChatWindow/>
                </div>
            </div>
        </div>
    );
};

export default Message;