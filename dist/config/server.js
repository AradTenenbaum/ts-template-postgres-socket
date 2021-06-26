"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runServer = void 0;
const http_1 = __importDefault(require("http"));
const socketio = require('socket.io');
const PORT = process.env.PORT || 5000;
// Run socket server, recive express app
const runServer = (app) => {
    // Create http server
    const server = http_1.default.createServer(app);
    // Create io that listens to connection
    const io = socketio(server, { cors: { origin: "*" } });
    io.on('connect', (socket) => {
        console.log('User Connected');
        // Join chat action
        socket.on('join', (data) => {
            console.log('Join', data);
            // Send the user to all his connected friends
            socket.emit('FriendConnected', {});
        });
        socket.on('sendMessage', ({ message }, callback) => {
            console.log(message);
            // Specific socket id
            io.to("socketId").emit('messageSent', { message: "message" });
        });
        // Disconnect action
        socket.on('disconnect', () => {
            console.log('Disconnect');
        });
    });
    server.listen(PORT, () => console.log(`Server started on ${PORT}`));
};
exports.runServer = runServer;
