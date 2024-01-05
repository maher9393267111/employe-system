import axios from "axios";

import axiosJWT from "./axiosJWT";
import { fetchStart, fetchFailed, fetchSuccess } from "./customerSlice";

const REACT_APP_BASE_URL1 = "https://clownfish-app-tzjmm.ondigitalocean.app";
const REACT_APP_BASE_URL = "http://localhost:8000";

export const FetchCustomers =
  (page = 1, size = 2) =>
  async (dispatch) => {
    await dispatch(fetchStart());
    try {
      console.log("page in request api", page);

      const response = await axiosJWT.get(
        `${REACT_APP_BASE_URL}/customers?page=${
          page === 0 ? 1 : page
        }&&size=${size}`
      );
      console.log("all customers api fetch REFETCH", response.data);
      return dispatch(fetchSuccess(response.data));
    } catch (err) {
      return dispatch(fetchFailed(err));
    }
  };

export const AddCustomer = (data, agentId) => async (dispatch) => {
  await dispatch(fetchStart());
  try {
    data = { ...data, employe_id: agentId };
    console.log("request DATA", data);

    const response = await axiosJWT.post(
      `${REACT_APP_BASE_URL}/customers`,
      data
    );
    console.log("RESPONSE DATA", response.data);
    return dispatch(FetchCustomers());
  } catch (err) {
    return dispatch(fetchFailed(err));
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
  } catch (error) {}
};

export const getSingleCustomer = async (id, dispatch) => {
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}/employees/${id}`);
    console.log("single", res?.data);
  } catch (error) {}
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
