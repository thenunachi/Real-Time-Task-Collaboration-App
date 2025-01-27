const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const app = express(); //Initializes Express application
app.use(cors());
const httpServer = createServer(app); //Wraps Express app in HTTP server
const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
 });

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on('message', (data) => {
        console.log(data);
        io.emit('message', data);
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });


});

httpServer.listen(4000, () => {
    console.log("listening on *:4000");
});