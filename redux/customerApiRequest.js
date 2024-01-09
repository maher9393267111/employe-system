import axios from "axios";

import axiosJWT from "./axiosJWT";
import { fetchStart, fetchFailed, fetchSuccess } from "./customerSlice";
import { toast } from "react-toastify";


const REACT_APP_BASE_URL1 = "https://clownfish-app-tzjmm.ondigitalocean.app";
const REACT_APP_BASE_URL = "http://localhost:8000";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? REACT_APP_BASE_URL
    : REACT_APP_BASE_URL1;

export const FetchCustomers =
  (page = 1, size = 2 ,status ,sortBy ,sortDirection) =>
  async (dispatch) => {
    await dispatch(fetchStart());
    try {
      console.log("page in request api", page);
      console.log("QUERIES!!!!!!!!!!!!!!!!!!!!!!!!!" , status ,sortBy ,sortDirection)

      const response = await axiosJWT.get(
        `${baseUrl}/customers?page=${page === 0 ? 1 : page}&&size=${size}&&status=${status}&&sortBy=${sortBy}&&sortDirection=${sortDirection}`
      );
      console.log("all customers api fetch REFETCH", response.data);
      return dispatch(fetchSuccess(response.data));
    } catch (err) {
      return dispatch(fetchFailed(err));
    }
  };

export const FetchAgentCustomers =
  (page = 1, size = 2  , sortBy,sortDirection) =>
  async (dispatch) => {
    await dispatch(fetchStart());
    try {
      console.log("page in@@@@@@@@@@@@@@@@@ request api", page);
      console.log("QUERIES!!!!!!!!!!!!!!!!!!!!!!!!!"  ,sortBy ,sortDirection)

      const response = await axiosJWT.get(
        `${REACT_APP_BASE_URL}/customers/agentCustomers?page=${
          page === 0 ? 1 : page
        }&&size=${size}&&sortBy=${sortBy}&&sortDirection=${sortDirection}`
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

    const response = await axiosJWT.post(`${baseUrl}/customers`, data);

    toast.success("new customer created");
    console.log("RESPONSE DATA", response.data);

    return dispatch(FetchCustomers());
  } catch (err) {
    return dispatch(fetchFailed(err));
  }
};

export const getSingleCustomerRedux = (customerId) => async (dispatch) => {
  await dispatch(fetchStart());
  try {
    console.log("page in request api", page);

    const response = await axiosJWT.get(
      `${REACT_APP_BASE_URL}/customers/${id}`
    );
    console.log("all customers api fetch REFETCH", response.data);
    return response.data;
    //
    // return dispatch(fetchSingleSuccess(response.data));
  } catch (err) {
    return dispatch(fetchFailed(err));
  }
};

export const getSingleCustomer = async (id, dispatch) => {
  try {
    const res = await axiosJWT.get(`${baseUrl}/customers/${id}`);

    console.log("single", res?.data);
    return res?.data;
  } catch (error) {}
};

export const UpdateCustomer = async (values, id) => {
  try {
    const res = await axiosJWT.put(`${baseUrl}/customers/${id}`, values);
    console.log("UPDATE", res?.data);
    toast.success("Customer Updated successfully");

    return res?.data;
  } catch (error) {
    console.log(error?.message);
  }
};

export const DeleteCustomer = (customerId, files) => async (dispatch) => {
  try {
    //console.log("image filename" ,filename)

    files.forEach(async (file) => {
      console.log("single fieeeeee", file.filename);
      await DeleteImage(file?.filename);
    });

    //await DeleteImage(filename)

    const response = await axiosJWT.delete(
      `${baseUrl}/customers/${customerId}`
    );

    toast.success("Customer deleted successfully");
    console.log("RESPONSE DATA", response.data);

    return dispatch(FetchCustomers());
  } catch (err) {
    return dispatch(fetchFailed(err));
  }
};


// chnage customer status by admin
//http://localhost:8000/customers/status/659d1a5bd115075f79ac1022

export const ChangeCustomerStatus = (customerdata ,status ,note) => async (dispatch) => {
  try {
    //console.log("image filename" ,filename)

if (status === 'rejected') {

    customerdata?.files.forEach(async (file) => {
      console.log("single fieeeeee", file.filename);
      await DeleteImage(file?.filename);
    });


  }

  const data ={
    status:status,
    note:note
  }



    //await DeleteImage(filename)

    const response = await axiosJWT.put(
      `${baseUrl}/customers/status/${customerdata?.id}`,
data
    );

    toast.success("Customer deleted successfully");
    console.log("RESPONSE DATA", response.data);

    return dispatch(FetchCustomers());
  } catch (err) {
    return dispatch(fetchFailed(err));
  }
};







// Upload Single file

// http://localhost:8000/upload/avatar

// single
export const UploadImage = async (file, oldfile = null) => {
  try {
    const res = await axiosJWT.post(
      `${baseUrl}/upload/avatar?oldfile=${oldfile}`,
      file
    );

    console.log("single", res?.data);

    return res?.data;
  } catch (error) {}
};

export const UploadImages = async (files, oldfile = null) => {
  try {
    const res = await axiosJWT.post(`${baseUrl}/upload/uploadmulti`, files);

    console.log("Array of images", res?.data.images);

    return res?.data.images;
  } catch (error) {}
};

// Upload audio File

export const UploadAudio = async (files, oldfile = null) => {
  try {
    const res = await axiosJWT.post(`${baseUrl}/upload/uploadaudio`, files);

    console.log("Array of images", res?.data);

    return res?.data;
  } catch (error) {}
};

export const DeleteImage = async (filename) => {
  try {
    console.log("in DELETEEE", filename);
    const res = await axiosJWT.post(`${baseUrl}/upload/deleteimage`, {
      filename: filename,
    });

    console.log("single", res?.data);
    toast.success("customer file deleted successfully");

    return res?.data;
  } catch (error) {}
};
