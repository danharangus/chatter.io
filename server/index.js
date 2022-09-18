const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

let activeUsers = []

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const removeDuplicates = (usersArray) => {
    const dict = {}
    const result = []
    usersArray.forEach((userData) => {
        if (!dict[userData.socketId]) {
            result.push(userData);
            dict[userData.socketId] = true;                 
        }
    })

    return result;
}

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", (data) => {
        socket.join(data.room);

        data.socketId = socket.id;

        activeUsers.push(data);
        activeUsers = removeDuplicates(activeUsers);
        
        io.to(data.room).emit("first-connected", activeUsers);

        socket.to(data.room).emit("user-joined", activeUsers);

        console.log(`User ${socket.id} joined room: ${data.room}`);
    })

    socket.on("send-message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive-message", data);
      });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        removedUser = activeUsers.find((activeUser) => String(activeUser.socketId) === String(socket.id));
        if (removedUser !== undefined) {
            activeUsers = activeUsers.filter((activeUser) => activeUser.socketId !== socket.id);
            socket.to(removedUser.room).emit("user-left", activeUsers);
        }
        console.log(activeUsers);
    });
});


server.listen(3001, () => {
    console.log("Server online");
});
