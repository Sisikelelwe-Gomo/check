const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS with specific origins
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests only from localhost:3000
  methods: ['GET', 'POST'],
  credentials: true // Optional: If you're using cookies or authorization headers
}));

// Listen for client connections
io.on('connection', (socket) => {
    console.log('Client connected');

    // Handle ride request event
    socket.on('ride:request', (data) => {
        console.log('Ride request received:', data);
        // Emit event to all connected drivers
        io.emit('ride:request', data);
    });

    // Handle driver accept event
    socket.on('ride:accept', (data) => {
        console.log('Driver accepted ride request:', data);
        // Emit event to all connected clients (riders)
        io.emit('ride:accepted', data);
    });
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
    console.log(`Driver server running on port ${port}`);
});
