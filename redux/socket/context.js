import { createContext, useEffect, useState, useContext } from "react";

import { toast } from "react-toastify";

import socketIO from "socket.io-client";
import {APIURL } from '../baseURL'
const baseUrl = APIURL

const StateContext = createContext();



const REACT_APP_BASE_URL1 = "https://clownfish-app-tzjmm.ondigitalocean.app";
const REACT_APP_BASE_URL = "http://localhost:3300";


  // process.env.NODE_ENV === "development"
  //   ? REACT_APP_BASE_URL
  //   : REACT_APP_BASE_URL1;



export const StateContextProvider = ({ children }) => {
  const socket = socketIO.connect("https://dolphin-app-lu45l.ondigitalocean.app/" , 
    {
    
    transports:
    // [ "websocket" ] 
     [ "websocket", "polling" ] 
  }
  
  );




  return (
    <StateContext.Provider value={{ socket }}>{children}</StateContext.Provider>
  );
};

export const useContextApp = () => {
  const context = useContext(StateContext);
  return context;
};
