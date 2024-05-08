import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from "react-player"
import { useSocket } from '../utils/SocketContext'
import { usePeer } from '../utils/PeerContext'

const Room = () => {
const{socket} = useSocket()
const {Peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream } = usePeer()
const [myStream,setMyStream] = useState(null)
const [ remoteEmailId, setRemoteEmailId ] = useState(null)
// const [remoteStream,setRemoteStream] = useState(null)

const handleRoomJoin = useCallback( async ({emailId} )=>{
console.log("joinded",emailId)
const offer = await createOffer();
socket.emit("call-user",{offer,emailId})
setRemoteEmailId(emailId);
},[socket,createOffer])//calllback for performance issue na aaye

const handleIncomingCall = useCallback(async({emailId,offer} )=>{
console.log("a incoming call from",emailId,offer)
const ans = await createAnswer(offer);
socket.emit("call-accepted", {emailId: emailId, ans});
setRemoteEmailId(emailId)
},[createAnswer,socket])

const handleCallAccepted = useCallback (async (data)=>{
const { ans } = data;
console.log("call got accepted", ans)
await setRemoteAns(ans);

},[setRemoteAns])

const getUserMediaStream = useCallback(async ( )=>{
const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true});
setMyStream(stream)
},[])

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

      
    const handleNegosiation = useCallback(()=>{
      const localOffer = Peer.localDescription;
      socket.emit("call-user", { email: remoteEmailId , offer: localOffer});
  } , [Peer.localDescription, remoteEmailId, socket])

  useEffect(()=>{
    Peer.addEventListener('negotiationneeded',handleNegosiation)
    return ()=>{ 
      Peer.removeEventListener('negotiationneeded',handleNegosiation)
  }
  },[])

  return (
    <div>
      <div>your r connected to : {remoteEmailId}</div>
<button onClick={()=>sendStream(myStream)}>send my stream</button>
      <ReactPlayer url ={myStream} playing muted/>
      <ReactPlayer url ={remoteStream} playing/>
    </div>
  )
}

export default Room