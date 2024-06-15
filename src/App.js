import React from "react";
import Routers from "./Routers";
import { SocketProvider } from "./services/SocketContext";

export default function App() {
  return (
    <SocketProvider>
      <Routers />
    </SocketProvider>
  );
}
