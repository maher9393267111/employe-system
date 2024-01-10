import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            name:'maher'
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.isFetching = false;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logoutSuccess: (state) => {
            state.login.currentUser = null;
            localStorage.removeItem('persist:root');
           // window.location.href = `/login`;
        },
    },
});

export const { loginStart, loginSuccess, loginFailed, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
