const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser")
const io = new Server();

const app = express();

app.use(bodyParser.json());

const emailToSocketMapping = new Map();

io.on("connection", socket =>{//connection toh predefined hogi
    socket.on("room-join",(data)=>{
        const {roomId, emailId} = data
        emailToSocketMapping.set(emailId,socket.id)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit("user-joined", {emailId})
    })
})

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(8000, ( )=>{
    console.log("server started !")
})
io.listen(8001)