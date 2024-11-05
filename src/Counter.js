import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL); // Use environment variable

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Listen for updates from the server
    socket.on('updateCount', (newCount) => {
      setCount(newCount);
    });

    return () => {
      // Clean up the socket connection on unmount
      socket.off('updateCount'); // Remove the specific event listener
      socket.disconnect();
    };
  }, []);

  const increment = () => {
    socket.emit('increment');
  };

  const decrement = () => {
    socket.emit('decrement');
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      {/* <button onClick={decrement}>-</button> */}
    </div>
  );
};

export default Counter;