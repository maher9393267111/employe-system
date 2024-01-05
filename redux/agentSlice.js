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
        fetchStart: (state) => {
            state.agent.isFetching = true;
        },
        fetchSuccess: (state, action) => {
            console.log("ACTION " ,action.payload)
            state.agent.allagents = action.payload;
            state.agent.isFetching = false;
            state.agent.error = false;
            state.agent.refetch = !state.refetch
        },
        fetchFailed: (state) => {
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

export const { fetchStart, fetchSuccess, fetchFailed ,addnewAgent } = agentSlice.actions;
export default agentSlice.reducer;
