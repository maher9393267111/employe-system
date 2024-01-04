import axios from 'axios';
import { loginStart, loginSuccess, loginFailed ,addnewAgent, logoutSuccess } from './agentSlice';
import axiosJWT from './axiosJWT'
const REACT_APP_BASE_URL = "https://clownfish-app-tzjmm.ondigitalocean.app"



export const FetchAgents = async (dispatch) => {
    dispatch(loginStart());
    try {
       
        const res = await axiosJWT.get(`${REACT_APP_BASE_URL}/employees`);
console.log("REEEEEEEEEEEEEEEEEEE" ,res)
dispatch(logoutSuccess(res.data))


      //  dispatch(loginSuccess(res.data));
       // navigate.push('/');
    } catch (error) {
        // setError('password', {
        //     type: 'server',
        //     message: 'Something went wrong with your password',
        // });

        dispatch(loginFailed());
    }
};




export const AddNewAgents = async (dispatch,data) => {
    dispatch(loginStart());
    try {
       
console.log("DATA" ,data)
//https://clownfish-app-tzjmm.ondigitalocean.app/auth/register
//${REACT_APP_BASE_URL}/auth/register
        const res = await axiosJWT.post(`https://clownfish-app-tzjmm.ondigitalocean.app/auth/register` ,data);
    
        dispatch(addnewAgent())
        console.log("added" ,res?.data)
       // navigate.push('/');
    } catch (error) {
        // setError('password', {
        //     type: 'server',
        //     message: 'Something went wrong with your password',
        // });

        dispatch(loginFailed());
    }
};
