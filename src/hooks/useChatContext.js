import { createContext, useCallback, useContext, useState } from "react";
import { useWebSocket } from "./useWebsocket";

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {

    const {sendMessage} = useWebSocket()

    const [messages, setMessages] = useState([])
    const [activeUser, setActiveUser] = useState(null)
    
    const sendNewMessage = useCallback((message) => {
        setMessages((prev) => [...prev, message]);
        sendMessage(message); // Gửi qua WebSocket
    }, []);

    const receiveMessage = useCallback((message) => {
        setMessages((prev) => [...prev, message]);
    }, []);


    const getChatHistory = useCallback((messageList = []) => {
        setMessages(Array.isArray(messageList) ? messageList : []);
    }, [])

    const selectChatUser = useCallback((user) => {
        setActiveUser(user || null);
    }, []);

    const resetChat = useCallback(() => {
        setMessages([]);
        setActiveUser(null);
    }, []);

    return (
        <ChatContext.Provider 
            value={{ 
                messages, 
                activeUser,
                sendNewMessage,
                receiveMessage, 
                getChatHistory, 
                selectChatUser, 
                resetChat
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    return useContext(ChatContext);
};
