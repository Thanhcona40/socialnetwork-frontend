import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { useChatContext } from '../../hooks/useChatContext';

const ChatWindow = () => {
    const { messages, activeUser, sendNewMessage } = useChatContext();
    const [content, setContent] = useState('');
     const auth = useSelector(store => store.auth)

    const handleSend = () => {
        if (activeUser && content.trim()) {
            sendNewMessage({ sender: auth?.user, receiver: activeUser, content });
            setContent('');
        }
    };

    return (
        <div className="chat-window flex flex-col h-full border rounded shadow-lg">
        {/* Header hiển thị Avatar và Tên người nhận */}
                {activeUser ?
                    (<div className='flex items-center p-4rounded-t-lg shadow p-4 space-x-3'>
                        <Avatar
                            src={activeUser?.image}
                            className="w-10 h-10 rounded-full"
                        />
                        <h2 className="text-lg font-bold">{activeUser?.fullName}</h2>
                    </div>) : (
                        <p className='font-semibold text-2xl'>Xin mời chọn người dùng để nhắn tin</p>
                    )
                }
        {/* Danh sách tin nhắn */}
        <div className={`flex-1 overflow-y-auto p-4 bg-gray-50`}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg?.receiver?.id === activeUser?.id ? 'justify-start' : 'justify-end'
                            } mb-2`}
                    >
                        <div
                            className={`${msg?.receiver?.id === activeUser?.id
                                    ? 'bg-gray-200 text-black'
                                    : 'bg-blue-500 text-white'
                                } p-2 rounded-lg max-w-xs`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
        </div>

        {/* Input nhập tin nhắn */}
        <div className="chat-input p-4 bg-gray-100 border-t flex items-center space-x-2">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded"
            />
            <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    </div>
    );
}

export default ChatWindow;
