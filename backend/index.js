const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser")
const io = new Server({
    cors:true,
});

const app = express();

app.use(bodyParser.json());

const emailToSocketMapping = new Map();
const socketToEmailMaping = new Map();

io.on("connection", socket =>{//connection toh predefined hogi
    socket.on("room-join",(data)=>{
        console.log("new connection")
        const {roomId, emailId} = data
        console.log("A user "+ emailId +" joined in room "+roomId)
        emailToSocketMapping.set(emailId ,socket.id)
        socketToEmailMaping.set(socket.id,emailId)
        socket.join(roomId)
        socket.emit("joined-room", {roomId})//ye ushke computer pr emit krdo
        socket.broadcast.to(roomId).emit("user-joined", {emailId})
    });

    socket.on("call-user",(data)=>{
        const {emailId,offer} = data;
        const fromEmail = socketToEmailMaping.get(socket.id);//ye wala khud user ka hai
        const socketId = emailToSocketMapping.get(emailId);//ye wla jisne join kiya bd me ushka hai..kuki ye email laya gya hai data k through
        socket.to(socketId).emit("incoming-call",{from: fromEmail, offer})
    })
    socket.on("call-accepted",(data)=>{
        const {emailId,ans} = data;
        const socketId = emailToSocketMapping.get(emailId);
        socket.to(socketId).emit('call-accepted', ans)
    })
})

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(8000, ( )=>{
    console.log("server started !")
})
io.listen(8001)