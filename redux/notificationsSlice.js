import { createSlice } from "@reduxjs/toolkit";

export const  notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    unreadCount: 0,

    isFetching: false,
    error: false,
    refetch: false,
  },
  reducers: {
    FETCH_NOTIFICATIONS_START: (state) => {
      state.isFetching = true;
    },
    
    ADD_NOTIFICATION: (state, action) => {
      console.log("ACTION ", action.payload);
      state.notifications = [action.payload, ...state.notifications],
        state.isFetching = false;
      state.error = false;
    },
    FETCH_NOTIFICATIONS_FAILURE: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    CLEAR_NOTIFICATIONS: (state) => {
      state.unreadCount = 0,
       state.notifications = [];
    },

    FETCH_NOTIFICATIONS_SUCCESS: (state ,action) => {
    console.log("ACTION ", action.payload);
    state.notifications = action.payload
      state.isFetching = false;
    state.error = false;

    }
   

  },

});

export const {  FETCH_NOTIFICATIONS_SUCCESS , CLEAR_NOTIFICATIONS ,   FETCH_NOTIFICATIONS_FAILURE , ADD_NOTIFICATION ,FETCH_NOTIFICATIONS_START  } =
notificationSlice.actions;
export default notificationSlice.reducer;
