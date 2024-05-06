import React, { useState } from "react";
import { useSocket } from "../utils/SocketContext";

const Home = () => {
  const { socket } = useSocket();
  const [emailId,setEmailId] = useState('')
  const [roomId,setRoomId] = useState('')
//   socket.emit("room-join", { roomId: "1", emailId: "dev@gamil.com" });

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
        <button className="bg-black p-2 text-white rounded-md">Enter Room</button>
      </div>
    </div>
  );
};

export default Home;
