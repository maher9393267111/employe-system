import axios from 'axios';
import { loginStart, loginSuccess, loginFailed ,addnewAgent, logoutSuccess } from './agentSlice';
import axiosJWT from './axiosJWT'
import { changeLanguage } from 'i18next';
const REACT_APP_BASE_URL = "https://clownfish-app-tzjmm.ondigitalocean.app"



export const FetchAgents = async (dispatch) => {
    dispatch(loginStart());
    try {
       
        const res = await axiosJWT.get(`${REACT_APP_BASE_URL}/employees`);
console.log("REEEEEEEEEEEEEEEEEEE" ,res)
dispatch(loginSuccess(res.data))


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




export const AddNewAgents = async (data) => {
  //  dispatch(loginStart());
    try {
       
console.log("DATA" ,data)
//https://clownfish-app-tzjmm.ondigitalocean.app/auth/register
//${REACT_APP_BASE_URL}/auth/register
        const res = await axiosJWT.post(`https://clownfish-app-tzjmm.ondigitalocean.app/auth/register` ,data);
    
       // dispatch(addnewAgent())
        console.log("added" ,res?.data)
       // navigate.push('/');
    } catch (error) {
        // setError('password', {
        //     type: 'server',
        //     message: 'Something went wrong with your password',
        // });

      //  dispatch(loginFailed());
    }
};



export const getSingleAgent = async (id, dispatch) => {
   // dispatch(loginStart());
    try {
       

        const res = await axiosJWT.get(`${REACT_APP_BASE_URL}/employees/${id}`);
        console.log("single" ,res?.data)
   // return res?.data
        
  

        //dispatch(addnewAgent())
       // console.log("added" ,res?.data)
       // navigate.push('/');
    } catch (error) {
      
       // dispatch(loginFailed());
    }
};





export const UpdateAgent = async (values,id ,dispatch) => {
    // dispatch(loginStart());
     try {
        
 
         const res = await axiosJWT.patch(`${REACT_APP_BASE_URL}/employees/${id}` ,values);
         console.log("UPDATE" ,res?.data)
      //   dispatch(AddNewAgents())
     return res?.data
         
         //dispatch(addnewAgent())
       //  console.log("added" ,res?.data)
        // navigate.push('/');
     } catch (error) {
       
        console.log(error?.message)
        // dispatch(loginFailed());
     }
 };
 


 export const DeleteAgent = async (id) => {
    // dispatch(loginStart());
     try {
        
 
         const res = await axiosJWT.delete(`${REACT_APP_BASE_URL}/employees/${id}` );
         console.log("Delete" ,res?.data)
    // res?.data
   
        // dispatch(FetchAgents())
         console.log("added" ,res?.data)
        // navigate.push('/');
     } catch (error) {
       
        console.log(error?.message)
        // dispatch(loginFailed());
     }
 };
 