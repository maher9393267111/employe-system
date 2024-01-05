import axios from "axios";
import {
  fetchStart, fetchSuccess, fetchFailed ,addnewAgent
} from "./agentSlice";
import axiosJWT from "./axiosJWT";

const REACT_APP_BASE_URL1 = "https://clownfish-app-tzjmm.ondigitalocean.app";
const REACT_APP_BASE_URL = "http://localhost:8000";


const baseUrl = process.env.NODE_ENV === 'development' ? REACT_APP_BASE_URL : REACT_APP_BASE_URL1;

// export const FetchAgentss = async (dispatch) => {
//   dispatch(loginStart());
//   try {
//     const res = await axiosJWT.get(`${baseUrl}/employees`);
//     console.log("REEEEEEEEEEEEEEEEEEE", res);
//     dispatch(loginSuccess(res.data));

//     //  dispatch(loginSuccess(res.data));
//     // navigate.push('/');
//   } catch (error) {
//     // setError('password', {
//     //     type: 'server',
//     //     message: 'Something went wrong with your password',
//     // });

//     dispatch(loginFailed());
//   }
// };


export const FetchAgents =
  () =>
  async (dispatch) => {
    await dispatch(fetchStart());
    try {
      

      const response = await axiosJWT.get(
        `${REACT_APP_BASE_URL}/employees`
      );
      console.log("all Agents api fetch REFETCH", response.data);
      return dispatch(fetchSuccess(response.data));
    } catch (err) {

      return dispatch(fetchFailed(err));
    }
  };









export const AddNewAgents = async (data) => {
  //  dispatch(loginStart());
  try {
    console.log("DATA", data);
    //https://clownfish-app-tzjmm.ondigitalocean.app/auth/register
    //${REACT_APP_BASE_URL}/auth/register
    const res = await axiosJWT.post(
      `${baseUrl}/auth/register`,
      data
    );

    // dispatch(addnewAgent())
    console.log("added", res?.data);
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
    const res = await axiosJWT.get(`${baseUrl}/employees/${id}`);
    console.log("single", res?.data);
     return res?.data

    //dispatch(addnewAgent())
    // console.log("added" ,res?.data)
    // navigate.push('/');
  } catch (error) {
    console.log(error)
    // dispatch(loginFailed());
  }
};

export const UpdateAgent = async (values, id, dispatch) => {
  // dispatch(loginStart());
  try {
    const res = await axiosJWT.patch(
      `${baseUrl}/employees/${id}`,
      values
    );
    console.log("UPDATE", res?.data);
    //   dispatch(AddNewAgents())
    return res?.data;

    //dispatch(addnewAgent())
    //  console.log("added" ,res?.data)
    // navigate.push('/');
  } catch (error) {
    console.log(error?.message);
    // dispatch(loginFailed());
  }
};

export const DeleteAgent = async (id) => {
  // dispatch(loginStart());
  try {
    const res = await axiosJWT.delete(`${baseUrl}/employees/${id}`);
    console.log("Delete", res?.data);
    // res?.data

    // dispatch(FetchAgents())
    console.log("added", res?.data);
    // navigate.push('/');
  } catch (error) {
    console.log(error?.message);
    // dispatch(loginFailed());
  }
};
