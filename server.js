import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import sockets from './socket/sockets.js';
import mongoose from 'mongoose';

//await mongoose.connect("mongodb+srv://samuelhan:bmKNJInbozs7hBiD@samcord.fj7cs3k.mongodb.net/test");

await mongoose.connect("mongodb+srv://samuelhan:5Aq7Wsi9YQd4y7J5@cluster0.s5zy9q9.mongodb.net/users");


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

io.on("connection", sockets);



httpServer.listen(PORT, () => {
    console.log('Server is running...');
})