import axios from "axios";

import axiosJWT from "./axiosJWT";

const REACT_APP_BASE_URL = "https://clownfish-app-tzjmm.ondigitalocean.app";

export const FetchCustomers = async () => {
  
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}/employees`);
    console.log("REEEEEEEEEEEEEEEEEEE", res);
    

  
  } catch (error) {


    
  }
};

export const AddNewCustomer = async (data) => {
  //  dispatch(loginStart());
  try {
    console.log("DATA", data);
 
    const res = await axiosJWT.post(
      `https://clownfish-app-tzjmm.ondigitalocean.app/auth/register`,
      data
    );

   
    console.log("added", res?.data);
  
  } catch (error) {

  }
};

export const getSingleCustomer = async (id, dispatch) => {

  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}/employees/${id}`);
    console.log("single", res?.data);
 
  } catch (error) {
   
  }
};

export const UpdateCustomer = async (values, id, dispatch) => {

  try {
    const res = await axiosJWT.patch(
      `${REACT_APP_BASE_URL}/customers/${id}`,
      values
    );
    console.log("UPDATE", res?.data);
  
    return res?.data;

  } catch (error) {
    console.log(error?.message);
   
  }
};

export const DeleteCustomer = async (id) => {

  try {
    const res = await axiosJWT.delete(`${REACT_APP_BASE_URL}/customers/${id}`);
    console.log("Delete", res?.data);
   

    
    console.log("added", res?.data);
    
  } catch (error) {
    console.log(error?.message);
    
  }
};
