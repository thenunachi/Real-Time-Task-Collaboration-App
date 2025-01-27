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

let messagesArr = [];

io.on("connection", (socket) => {
    socket.emit('initialMessages', messagesArr);
    socket.on('message', (data) => {
        messagesArr.push(data);
        io.emit('messageResponse', messagesArr);
    })

    socket.on('deleteMessage', (id) => {
        messagesArr = messagesArr.filter((item) => item.id !== id);
        io.emit('messageResponse', messagesArr);
    })

    socket.on('toggleMessage', (id) => {
        messagesArr = messagesArr.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    completed: !item.completed,
                };
            }
            // console.log(item, 'item from toggle');
            return item;
        })
        io.emit('messageResponse', messagesArr);
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});



httpServer.listen(4000, () => {
    console.log("listening on *:4000");
});