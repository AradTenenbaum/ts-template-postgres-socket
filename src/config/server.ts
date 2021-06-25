import express, { Application } from "express";
import http from "http";
import { Socket } from "socket.io";
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;

// Run socket server, recive express app
export const runServer = (app: Application) => {
    // Create http server
    const server = http.createServer(app);
    // Create io that listens to connection
    const io = socketio(server, {cors: {origin: "*"}});
    io.on('connect', (socket: Socket) => {
        console.log('User Connected');
        // Join chat action
        socket.on('join', () => {
            console.log('Join')
            // Send the user to all his connected friends
            socket.emit('FriendConnected', {});
        });
        socket.on('sendMessage', ({ message }: {message:string}, callback: Function) => {
            console.log(message);
            // Specific socket id
            io.to("socketId").emit('messageSent', {message: "message"});
        });
        // Disconnect action
        socket.on('disconnect', () => {
            console.log('Disconnect');
        });
    });
    server.listen(PORT, () => console.log(`Server started on ${PORT}`));
};

