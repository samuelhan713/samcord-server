import TypingController from "./controllers/TypingController.js";
import RoomController from "./controllers/RoomController.js";

const sockets = (socket) => {
    const typingController = new TypingController(socket);
    const roomController = new RoomController(socket);

    socket.on('send-message', ({ message, roomId }) => { //gobal chat will send a chat to ALL channels
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt; //if there's a roomId then make the socket NOT broadcast
        skt.emit('message-from-server', { message });
    });

    socket.on('typing-started', typingController.typingStarted);

    socket.on('typing-stopped', typingController.typingStopped);

    socket.on('join-room', roomController.joinRoom);

    socket.on("disconnect", (socket) => {
        console.log("User left.");
    })

}

export default sockets;