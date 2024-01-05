//http://localhost:8000/notifications?receiver=6597543542c34a8881644532


import axios from "axios";

import axiosJWT from "./axiosJWT";
import { FETCH_NOTIFICATIONS_SUCCESS , CLEAR_NOTIFICATIONS ,   FETCH_NOTIFICATIONS_FAILURE , ADD_NOTIFICATION ,FETCH_NOTIFICATIONS_START } from "./notificationsSlice";

const REACT_APP_BASE_URL1 = "https://clownfish-app-tzjmm.ondigitalocean.app";
const REACT_APP_BASE_URL = "http://localhost:8000";

//http://localhost:8000/notifications?receiver=6597543542c34a8881644532


export const FetchNotifications =
  (receiverId) =>
  async (dispatch) => {
    await dispatch(FETCH_NOTIFICATIONS_START());
    try {
      console.log("page in request api", page);

      const response = await axiosJWT.get(
        `${REACT_APP_BASE_URL}/?receiver=${receiverId}`
      );
      console.log("all Notifications api fetch REFETCH", response.data);
      return dispatch(FETCH_NOTIFICATIONS_SUCCESS(response.data));
    } catch (err) {
      return dispatch(FETCH_NOTIFICATIONS_FAILURE(err));
    }
  };
  




export const getNotifications = async (receiverId) => {
    try {
      const res = await axiosJWT.get(
        `${REACT_APP_BASE_URL}/receiver/${id}`
        
      );
      console.log("UPDATE", res?.data);
  
      return res?.data;
    } catch (error) {
      console.log(error?.message);
    }
  };
  
  