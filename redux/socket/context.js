import { createContext, useEffect, useState, useContext } from "react";

import { toast } from "react-toastify";

import socketIO from "socket.io-client";

const StateContext = createContext();

const devSocket = "http://localhost:8000";
const prodSocket = "https://monkfish-app-yobnp.ondigitalocean.app";
// "https://server-dashboard-nine.vercel.app"

export const StateContextProvider = ({ children }) => {
  const socket = socketIO.connect(devSocket);




  return (
    <StateContext.Provider value={{ socket }}>{children}</StateContext.Provider>
  );
};

export const useContextApp = () => {
  const context = useContext(StateContext);
  return context;
};
