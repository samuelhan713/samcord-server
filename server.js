import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = 4000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
    }
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    //whenever there is a send message event, then do something
    socket.on('send-message', ({ message, roomId }) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt; //if there's a roomId then make the socket NOT broadcast
        skt.emit('message-from-server', { message });
    });

    socket.on('typing-started', ({ roomId }) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt; //if there's a roomId then make the socket NOT broadcast
        skt.emit('typing-started-from-server');
    })

    socket.on('typing-stopped', ({ roomId }) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt; //if there's a roomId then make the socket NOT broadcast
        skt.emit('typing-stopped-from-server');
    })

    socket.on('join-room', ({ roomId }) => {
        console.log("ROOM ID: ", roomId);
        socket.join(roomId);
    })

    socket.on("disconnect", (socket) => {
        console.log("User left.");
    })
})



httpServer.listen(PORT, () => {
    console.log('Server is running...');
})