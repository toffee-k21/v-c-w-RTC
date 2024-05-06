import { createContext, useContext, useEffect, useMemo } from "react";
import {io} from "socket.io-client";

const socketContext = createContext(null);

export const useSocket = ( )=>{
    return useContext(socketContext);
}

export const SocketProvider = ( props )=>{
const socket = useMemo(()=> io("http://localhost:8001")//one time call and return value
, [])
return <socketContext.Provider value={{socket}}>
    {props.children}
</socketContext.Provider>
}