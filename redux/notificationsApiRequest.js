//http://localhost:8000/notifications?receiver=6597543542c34a8881644532


import axios from "axios";

import axiosJWT from "./axiosJWT";
import { FETCH_NOTIFICATIONS_SUCCESS , CLEAR_NOTIFICATIONS ,   FETCH_NOTIFICATIONS_FAILURE , ADD_NOTIFICATION ,FETCH_NOTIFICATIONS_START } from "./notificationsSlice";
import {toast} from 'react-toastify'


const REACT_APP_BASE_URL1 = "https://clownfish-app-tzjmm.ondigitalocean.app";
const REACT_APP_BASE_URL = "http://localhost:8000";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? REACT_APP_BASE_URL
    : REACT_APP_BASE_URL1;





export const FetchNotifications =
  () =>
  async (dispatch) => {
    await dispatch(FETCH_NOTIFICATIONS_START());
    try {
    

      const response = await axiosJWT.get(
        `${baseUrl}/notifications`
      );
      console.log("all Notifications api fetch REFETCH", response.data);
      return dispatch(FETCH_NOTIFICATIONS_SUCCESS(response.data));
    } catch (err) {
      return dispatch(FETCH_NOTIFICATIONS_FAILURE(err));
    }
  };
  




  

  // make as Read notification http://localhost:8000/notifications/read




export const  MakeNotificationRead  =
  (notificationId) =>
  async (dispatch) => {
    await dispatch(FETCH_NOTIFICATIONS_START());
    try {
    
      
      console.log("IDDD" ,notificationId)


const data={notificationId:notificationId}

      const response = await axiosJWT.post(
        `${baseUrl}/notifications/read`,
        data
      );

toast.success('maked read')

      console.log("all Notifications api fetch REFETCH", response.data);
      return dispatch(FetchNotifications());
    } catch (err) {
      return dispatch(FETCH_NOTIFICATIONS_FAILURE(err));
    }
  };
  
