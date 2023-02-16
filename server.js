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
    /* console.log("connection is ready!"); */
    //whenever there is a send message event, then do something
    socket.on('send-message', (data) => {
        socket.emit('message-from-server', data); //sending data from the client to the server side
        console.log('message received on SERVER side', data);
    })
})

httpServer.listen(PORT, () => {
    console.log('Server is running...');
})