import BaseController from "./BaseController.js";

export default class MessageController extends BaseController {
    sendMessage = ({ message, roomId }) => { //gobal chat will send a chat to ALL channels
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt; //if there's a roomId then make the socket NOT broadcast
        skt.emit('message-from-server', { message });
    };
}   