import React, { useCallback, useEffect } from 'react'
import { useSocket } from '../utils/SocketContext'
import { usePeer } from '../utils/PeerContext'

const Room = () => {
const{socket} = useSocket()
const {Peer, createOffer } = usePeer()

const handleRoomJoin = useCallback( async ({emailId} )=>{
console.log("joinded",emailId)
const offer = await createOffer();
socket.emit("call-user",{offer,emailId})
},[socket,createOffer])//calllback for performance issue na aaye

const handleIncomingCall = ({emailId,offer} )=>{
console.log("a incoming call from",emailId,offer)
}

    useEffect(()=>{
socket.on("user-joined", handleRoomJoin)
socket.on("incoming-call",handleIncomingCall)
    },[])
  return (
    <div>Room</div>
  )
}

export default Room