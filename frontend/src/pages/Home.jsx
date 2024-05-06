import React, { useEffect, useState } from "react";
import { useSocket } from "../utils/SocketContext";
import {useNavigate } from "react-router-dom"

const Home = () => {
  const { socket } = useSocket();
  const [emailId,setEmailId] = useState('')
  const [roomId,setRoomId] = useState('')
  const navigate = useNavigate()
  // socket.emit("room-join", { roomId: "1", emailId: "dev@gamil.com" });

const handleRoomJoin = ( )=>{
  socket.emit("room-join", { roomId:roomId , emailId:emailId})
}
const handleJoin =({roomId})=>{
navigate("/room/"+roomId)
}

useEffect(()=>{
socket.on("joined-room",(data)=>handleJoin(data))
},[])

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-1/2 h-1/2">
        <input
        vlaue={emailId}
        onChange={(e)=>setEmailId(e.target.value)}
          className="p-1 border-[2px] m-1"
          type="email"
          placeholder="Enter your Email id"
        />
        <input 
        value={roomId}
        onChange={(e)=>setRoomId(e.target.value)}
        className="p-1 border-[2px] m-1" type="text" placeholder="Enter your Room id" />
        <button onClick={handleRoomJoin} className="bg-black p-2 text-white rounded-md">Enter Room</button>
      </div>
    </div>
  );
};

export default Home;
