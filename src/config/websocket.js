import { Stomp } from '@stomp/stompjs'; 
import SockJS from 'sockjs-client';

const socketUrl = 'http://localhost:5454/ws';
let stompClient = null;

export const initializeWebSocket = (subscriptions,user) => {
    const socket = new SockJS(socketUrl);
    stompClient = Stomp.over(socket);
    console.log("alo alo alo user: ", user)

    stompClient.connect(
        {}, 
        () => {
        console.log("Connected to WebSocket");
        subscriptions.forEach(({channel,callback}) => {
            stompClient.subscribe(channel,callback)
        })
        if(stompClient.connected) {
            stompClient.send("/app/user.userOnline", {}, JSON.stringify(user)); 
        }
        },
        (error) => {
            console.error("WebSocket connection error:", error);
        }
    );
};

export const disconnectWebSocket = (user) => {
    if (stompClient) {
        stompClient.send("/app/user.userOffline", {}, JSON.stringify(user));
        stompClient.disconnect(() => {
            console.log('Disconnected from WebSocket');
        });
        stompClient = null; // Xóa instance
    }
};

export const sendMessage = (message) => {
    if (stompClient) {
        stompClient.send("/app/chat",{},JSON.stringify(message));
    }
};
