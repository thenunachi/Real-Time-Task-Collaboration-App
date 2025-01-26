const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express(); //Initializes Express application
const httpServer = createServer(app); //Wraps Express app in HTTP server
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("a user connected");

});

httpServer.listen(4000);