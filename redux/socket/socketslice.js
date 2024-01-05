import { createSlice } from "@reduxjs/toolkit";

export const  socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket :null
  },
  reducers: {
    CONNECT: (state) => {
        state.socket= action.payload
    },
    
    DISCONNECT : (state, action) => {
      console.log("ACTION ", action.payload);
      state.socket && state.socket.disconnect();
      state.socket = null
    },
  
   

  },

});

export const { CONNECT ,DISCONNECT   } =
socketSlice.actions;
export default socketSlice.reducer;
