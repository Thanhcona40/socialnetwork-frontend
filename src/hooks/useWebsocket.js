// hooks/useWebSocket.js
import { useCallback, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export const useWebSocket = (params = {}) => {  // Thêm giá trị mặc định
  // Destructure với giá trị mặc định
  const { user = null, channels = [] } = params || {};
  const stompClient = useRef(null);

  const connect = useCallback(() => {
    if (!user) return;

    const socket = new SockJS('http://localhost:5454/ws');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      channels.forEach(({ channel, callback }) => {
        stompClient.current.subscribe(channel, callback);
      });
      stompClient.current.send("/app/user.userOnline", {}, JSON.stringify(user));
    });
  }, [user, channels]);

  const disconnect = useCallback((user) => {
    if (stompClient.current?.connected) {
      stompClient.current.send("/app/user.userOffline", {}, JSON.stringify(user));
      stompClient.current.disconnect();
    }
    stompClient.current = null;
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect(user);
  }, [connect, disconnect, user]);

  return { 
    disconnect,
    sendMessage: (message) => {
      if (stompClient.current?.connected) {
        stompClient.current.send("/app/chat", {}, JSON.stringify(message));
      }
    }
  };
};