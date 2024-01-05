import axios from 'axios';
import { loginStart, loginSuccess, loginFailed, logoutSuccess } from './authSlice';
import axiosJWT from './axiosJWT'
const REACT_APP_BASE_URL1 = "https://clownfish-app-tzjmm.ondigitalocean.app"
const REACT_APP_BASE_URL = "http://localhost:8000"

export const loginUser = async (user, dispatch, navigate, setError) => {
    dispatch(loginStart());
    try {
        console.log("userData redux" ,user)
        const res = await axios.post(`${REACT_APP_BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate.push('/');
    } catch (error) {
        setError('password', {
            type: 'server',
            message: 'Something went wrong with your password',
        });
        dispatch(loginFailed());
    }
};



export const FetchAgents = async (dispatch) => {
    dispatch(loginStart());
    try {
       
        const res = await axiosJWT.get(`${REACT_APP_BASE_URL}/employees`);
        dispatch(loginSuccess(res.data));
       // navigate.push('/');
    } catch (error) {
        // setError('password', {
        //     type: 'server',
        //     message: 'Something went wrong with your password',
        // });

        dispatch(loginFailed());
    }
};









export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutSuccess());
    navigate('/login');
};
