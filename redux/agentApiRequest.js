import axios from "axios";
import {
  fetchStart,
  fetchSuccess,
  fetchFailed,
  addnewAgent,
  fetchAgentChart
} from "./agentSlice";
import axiosJWT from "./axiosJWT";
import { toast } from "react-toastify";
const REACT_APP_BASE_URL1 = "https://clownfish-app-tzjmm.ondigitalocean.app";
const REACT_APP_BASE_URL = "http://localhost:8000";

const baseUrl = REACT_APP_BASE_URL1
  // process.env.NODE_ENV === "development"
  //   ? REACT_APP_BASE_URL
  //   : REACT_APP_BASE_URL1;

// export const FetchAgentss =
//   () =>
//   async (dispatch) => {}

export const FetchAgents = () => async (dispatch) => {
  await dispatch(fetchStart());
  try {
    const response = await axiosJWT.get(`${baseUrl}/employees`);
    console.log("all Agents api fetch REFETCH", response.data);
    return dispatch(fetchSuccess(response.data));
  } catch (err) {
    return dispatch(fetchFailed(err));
  }
};

// Fetch only specefic agent customers

export const AddNewAgents = async (data) => {
  // dispatch(loginStart());
  try {
    console.log("DATA", data);
    
    const res = await axiosJWT.post(`${baseUrl}/auth/register`, data);

    // dispatch(addnewAgent())
    console.log("added", res?.data);
    toast.success("New Agent added successfully")
    // navigate.push('/');
  } catch (error) {
 //   toast.error(error.message);
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
    const res = await axiosJWT.get(`${baseUrl}/employees/${id}`);
    console.log("single", res?.data);
    return res?.data;

    //dispatch(addnewAgent())
    // console.log("added" ,res?.data)
    // navigate.push('/');
  } catch (error) {
    console.log(error);
  //  toast.error(err.message);
    // dispatch(loginFailed());
  }
};

export const UpdateAgent = async (values, id, dispatch) => {
  // dispatch(loginStart());
  try {
    const res = await axiosJWT.patch(`${baseUrl}/employees/${id}`, values);
    console.log("UPDATE", res?.data);
    //   dispatch(AddNewAgents())
    toast.success("Agent updated Successfully")
    return res?.data;

    //dispatch(addnewAgent())
    //  console.log("added" ,res?.data)
    // navigate.push('/');
  } catch (error) {
    console.log(error?.message);
  //  toast.error(err.message);
    // dispatch(loginFailed());
  }
};





export const AddAgent = (data, agentId, router) => async (dispatch) => {
  await dispatch(fetchStart());
  try {
    data = { ...data, employe_id: agentId };
    console.log("request DATA", data);

    const response = await axiosJWT.post(`${baseUrl}/customers`, data);

    dispatch(fetchSuccess())

    toast.info("customer Deleted");
    console.log("RESPONSE DATA", response.data);

    return dispatch(FetchAgents());
  } catch (err) {
  //  toast.error(err?.message)
    return dispatch(fetchFailed(err));
  }
};



export const DeleteAgent = (id ) => async (dispatch) => {
  await dispatch(fetchStart());
  try {
  

    const res = await axiosJWT.delete(`${baseUrl}/employees/${id}`);
    console.log("Delete", res?.data);
    // res?.data
    toast.success("Agent Deleted successfully")




    return dispatch(FetchAgents());
  } catch (err) {
 //   toast.error(err?.message)
    return dispatch(fetchFailed(err));
  }
};




export const AgentCustomersCharts = () => async (dispatch) => {
  await dispatch(fetchStart());
  try {
    

    const response = await axiosJWT.get(
      `${baseUrl}/employees/chart/find`
    );

    console.log("RESPONSE DATA", response.data);
    //toast.success("fetch data")

dispatch(fetchAgentChart(response.data))

return response.data


  } catch (err) {
  //  toast.error(err?.message)
    return dispatch(fetchFailed(err));
  }
};


