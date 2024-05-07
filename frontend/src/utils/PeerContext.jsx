import { createContext, useContext, useMemo } from "react";

const PeerContext = createContext((null));

export const usePeer =()=>{
  return  useContext(PeerContext)
};

export const PeerProvider = (props)=>{
    //RTCPeerConnection ye basically SDP(info that is public ip address) la kr deta hai user ka
    const Peer = useMemo(()=>new RTCPeerConnection({
        iceServers:[
            {
                urls:[
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478"
                ]
            }

        ]
    }),[])//this return SDP(info about User Computer)

    const createOffer = async ( ) =>{
        const offer = await Peer.createOffer();
        await Peer.setLocalDescription(offer);
        return offer
        //this funtion will create offer and retun it and also store its info
    }

    const createAnswer = async (offer)=>{
        await Peer.setRemoteDescription(offer);
        const answer = await Peer.createAnswer();
        await Peer.setLocalDescription(answer);//ye basically khud ka sdp hai jo dusre wale ne store kara
        return answer;
    }

    const setRemoteAns = async (ans)=>{
        await Peer.setRemoteDescription(ans);
    }

return <PeerContext.Provider value={{Peer, createOffer , createAnswer, setRemoteAns}}>
    {props.children}
</PeerContext.Provider>
}