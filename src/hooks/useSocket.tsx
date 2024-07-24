// frontend\src\hooks\useSocket.tsx

import { useContext } from "react";
import { Socket } from "socket.io-client";
import SocketContext from "../context/SocketContext";

const useSocket = (): Socket | null => {
    return useContext(SocketContext);
};

export default useSocket;
