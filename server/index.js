const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

let activeUsers = {}

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

        if (activeUsers[data.room] === undefined) {
            activeUsers[data.room] = []
        }
        activeUsers[data.room].push(data);

        activeUsers[data.room] = removeDuplicates(activeUsers[data.room]);

        console.log(activeUsers, "ASTA II ARRAYU", activeUsers[data.room]);

        io.to(data.room).emit("first-connected", activeUsers[data.room]);

        socket.to(data.room).emit("user-joined", activeUsers[data.room]);

        console.log(`User ${socket.id} joined room: ${data.room}`);
    })

    socket.on("send-message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive-message", data);
      });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        rooms = Array.from(Object.keys(activeUsers));
    
        let removedUser = undefined;
        let i, j;
        for (i = 0; i < rooms.length; i++) {
                if(activeUsers[rooms] !== undefined) {
                for (j = 0; j < activeUsers[rooms].length; j++) {
                    if (activeUsers[rooms][j].socketId === socket.id) {
                        removedUser = activeUsers[rooms][j];
                        break;
                    }
                }
            }
        }
        if (removedUser !== undefined) {
            activeUsers[removedUser.room] = activeUsers[removedUser.room].filter((activeUser) => activeUser.socketId !== socket.id);
            socket.to(removedUser.room).emit("user-left", activeUsers[removedUser.room]);
            console.log(activeUsers[removedUser.room]);
        }
    });
});


server.listen(3001, () => {
    console.log("Server online");
});
