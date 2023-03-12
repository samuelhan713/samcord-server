export default class RoomController {
    socket;
    constructor(socket) {
        this.socket = socket;
    }

    joinRoom = ({ roomId }) => {
        /* console.log("ROOM ID: ", roomId); */
        this.socket.join(roomId);
    };
}