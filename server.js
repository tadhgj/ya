const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"]
  }
});

let count = 0;

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send the initial count to the client
  socket.emit('updateCount', count);

  // Handle increment event
  socket.on('increment', () => {
    count += 1;
    io.emit('updateCount', count); // Broadcast the updated count to all clients
  });

  // Handle decrement event
  socket.on('decrement', () => {
    count -= 1;
    io.emit('updateCount', count); // Broadcast the updated count to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = 3001;
server.listen(port, () => console.log(`Listening on port ${port}`));