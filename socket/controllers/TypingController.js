export default class TypingController {
    socket;
    constructor(socket) {
        this.socket = socket;
    }

    typingStarted = ({ roomId }) => {
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt; //if there's a roomId then make the socket NOT broadcast
        skt.emit('typing-started-from-server');
    };


    typingStopped = ({ roomId }) => {
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt; //if there's a roomId then make the socket NOT broadcast
        skt.emit('typing-stopped-from-server');
    };
}



