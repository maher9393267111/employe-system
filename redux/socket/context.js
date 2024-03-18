import { createContext, useEffect, useState, useContext } from "react";

import { toast } from "react-toastify";

import socketIO from "socket.io-client";

import {APIURL } from '../baseURL'
const baseUrl = APIURL

const StateContext = createContext();



const pro= "https://dolphin-app-lu45l.ondigitalocean.app";
const dev = "http://localhost:3300";


  // process.env.NODE_ENV === "development"
  //   ? REACT_APP_BASE_URL
  //   : REACT_APP_BASE_URL1;



export const StateContextProvider = ({ children }) => {
  const socket = socketIO.connect(pro)
  // const socket = socketIO.connect(dev, {
  //   path: '/socket.io',
  //   withCredentials: true,
  //   transports: ['websocket'],
  //   secure: true,
  // }
  
  // );




  return (
    <StateContext.Provider value={{ socket }}>{children}</StateContext.Provider>
  );
};

export const useContextApp = () => {
  const context = useContext(StateContext);
  return context;
};
