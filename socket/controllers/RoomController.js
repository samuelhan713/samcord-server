import BaseController from "./BaseController.js";
import RoomSchema from "../../models/RoomSchema.js";

export default class RoomController extends BaseController {
    joinRoom = ({ roomId }) => {
        /* console.log("ROOM ID: ", roomId); */
        this.socket.join(roomId);
    };

    newRoomCreated = ({ roomId }) => {
        const room = new RoomSchema({
            name: "Test",
            roomId,
        })
        room.save();
        this.socket.broadcast.emit("new-room-created", { roomId });
    };
}