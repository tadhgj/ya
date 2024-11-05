import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketIOClient(process.env.REACT_APP_SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    newSocket.on('updateCount', (newCount) => {
      setCount(newCount);
    });

    return () => {
      newSocket.off('updateCount');
      newSocket.disconnect();
    };
  }, []);

  const increment = () => {
    if (socket) {
      socket.emit('increment');
    }
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;