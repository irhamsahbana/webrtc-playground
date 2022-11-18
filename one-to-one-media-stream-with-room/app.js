const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const protocol = process.env.PROTOCOL || 'http';
const domain = process.env.DOMAIN || 'localhost';
const port = process.env.PORT || 3001;

app.use(express.static('public'));

http.listen(port, () => {
    console.log(`listening on ${protocol}://${domain}:${port}`);
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('create or join', room => {
        // console.log('Received request to create or join room ', room);
        const myRoom = io.sockets.adapter.rooms.get(room)|| { size: 0 };
        // console.log('current room: ', myRoom);
        const numClients = myRoom.size;

        if (numClients === 0) {
            socket.join(room);
            socket.emit('created', room, socket.id);
            console.log('================== creating room ========================');
            console.log(`Client ID ${socket.id} created room ${room}`);
            console.log(`Created: Room ${room} now has ${io.sockets.adapter.rooms.get(room).size} client(s)`, io.sockets.adapter.rooms.get(room));
        } else if (numClients === 1) {
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.sockets.in(room).emit('ready');
            console.log('================== joining room ========================');
            console.log(`Client ID ${socket.id} joined room ${room}`);
            console.log(`joined: Room ${room} now has ${io.sockets.adapter.rooms.get(room).size} client(s) :`, io.sockets.adapter.rooms.get(room));
        } else {
            socket.emit('full', room);
        }
    });

    socket.on('ready', (room) => {
        socket.broadcast.to(room).emit('ready');
        console.log(`Client ID ${socket.id} is ready in room ${room}`);
    })

    socket.on('candidate', (event) => {
        socket.broadcast.to(event.room).emit('candidate', event);
        console.log(`Client ID ${socket.id} sent candidate to room ${event.room}`);
    });

    socket.on('offer', (event) => {
        socket.broadcast.to(event.room).emit('offer', event.sdp);
        console.log(`Client ID ${socket.id} sent offer to room ${event.room}`);
    });

    socket.on('answer', (event) => {
        socket.broadcast.to(event.room).emit('answer', event.sdp);
        console.log(`Client ID ${socket.id} sent answer to room ${event.room}`);
    });

    socket.on('disconnect', () => {
        console.log(`Client ID ${socket.id} disconnected`);
        console.log('================== leaving room ========================');
    });
})