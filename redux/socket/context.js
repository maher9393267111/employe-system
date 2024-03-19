import { createContext, useEffect, useState, useContext ,useRef } from "react";

import { toast } from "react-toastify";

//import socketIO from "socket.io-client";
import { io } from "socket.io-client";

import {APIURL } from '../baseURL'
const baseUrl = APIURL

const StateContext = createContext();



const pro= "https://jellyfish-app-as8az.ondigitalocean.app"
//"https://dolphin-app-lu45l.ondigitalocean.app";
const dev = "http://localhost:3300";





export const StateContextProvider = ({ children }) => {
  
  // const socket = io(pro, {
  //   path: '/socket.io/',
  // //  transports: ["websocket"] ,
    
  //    transports: ["websocket", "polling"],
  //    rejectUnauthorized: false,
  //    allowRequest: (req, callback) => {
  //     callback(null, false);
  //   }
  //    //secure: true,
  //    //handshake: false,
  //   //   allowEIO3: true
 
  // }
  
  // );

  const socket = io(
    pro,
    { path: "/socket.io" ,
    transports: ["websocket"] ,
  },
    {
      reconnection: false,
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
