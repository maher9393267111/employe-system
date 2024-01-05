import { createSlice } from '@reduxjs/toolkit';

export const agentSlice = createSlice({
    name: 'agent',
    initialState: {
        agent: {
            allagents:[],
           
            isFetching: false,
            error: false,
            refetch : false
        },
    },
    reducers: {
        loginStart: (state) => {
            state.agent.isFetching = true;
        },
        loginSuccess: (state, action) => {
            console.log("ACTION " ,action.payload)
            state.agent.allagents = action.payload;
            state.agent.isFetching = false;
            state.agent.error = false;
            state.agent.refetch = !state.refetch
        },
        loginFailed: (state) => {
            state.agent.isFetching = false;
            state.agent.error = true;
        },

        addnewAgent :(state)=>{

            state.agent.refetch = !refetch



        }



        // logoutSuccess: (state) => {
        //     state.agent.currentUser = null;
        // },
    },
});

export const { loginStart, loginSuccess, loginFailed, logoutSuccess ,addnewAgent } = agentSlice.actions;
export default agentSlice.reducer;
