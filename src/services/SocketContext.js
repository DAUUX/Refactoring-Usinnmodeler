import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  let userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL, {
      path: '/api/socket.io',
      auth: {userId}
    });
    setSocket(newSocket);

    return () => newSocket.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
