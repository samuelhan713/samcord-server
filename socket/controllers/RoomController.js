import BaseController from "./BaseController.js";

export default class RoomController extends BaseController {
    joinRoom = ({ roomId }) => {
        /* console.log("ROOM ID: ", roomId); */
        this.socket.join(roomId);
    };
}