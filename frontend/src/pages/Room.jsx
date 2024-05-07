import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from "react-player"
import { useSocket } from '../utils/SocketContext'
import { usePeer } from '../utils/PeerContext'

const Room = () => {
const{socket} = useSocket()
const {Peer, createOffer, createAnswer, setRemoteAns, sendStream } = usePeer()
const [myStream,setMyStream] = useState(null)

const handleRoomJoin = useCallback( async ({emailId} )=>{
console.log("joinded",emailId)
const offer = await createOffer();
socket.emit("call-user",{offer,emailId})
},[socket,createOffer])//calllback for performance issue na aaye

const handleIncomingCall = useCallback(async({emailId,offer} )=>{
console.log("a incoming call from",emailId,offer)
const ans = await createAnswer(offer);
socket.emit("call-accepted", {emailId: emailId, ans});
},[createAnswer,socket])

const handleCallAccepted = async (data)=>{
const { ans } = data;
console.log("call got accepted", ans)
await setRemoteAns(ans)
}

const getUserMediaStream = useCallback(async ( )=>{
const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true});
sendStream(stream)
setMyStream(stream)
},[sendStream])

    useEffect(()=>{
socket.on("user-joined", handleRoomJoin)
socket.on("incoming-call",handleIncomingCall)
socket.on("call-accepted",handleCallAccepted)

return ( )=>{socket.off("user-joined", handleRoomJoin)
  socket.off("incoming-call",handleIncomingCall)//bar baar na call kr de isliye
  socket.off("call-accepted",handleCallAccepted)
}
    },[handleIncomingCall, handleRoomJoin ,handleCallAccepted])

    useEffect(()=>{
      getUserMediaStream();
      },[getUserMediaStream])

  return (
    <div>
      <ReactPlayer url ={myStream} playing/>

    </div>
  )
}

export default Room