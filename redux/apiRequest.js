import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutSuccess,
} from "./authSlice";
import axiosJWT from "./axiosJWT";
import { toast } from "react-toastify";

const REACT_APP_BASE_URL1 = "https://clownfish-app-tzjmm.ondigitalocean.app";
const REACT_APP_BASE_URL = "http://localhost:8000";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? REACT_APP_BASE_URL
    : REACT_APP_BASE_URL1;

export const loginUser = async (user, dispatch, navigate, setError) => {
  dispatch(loginStart());
  try {
    console.log("userData redux", user);
    const res = await axios.post(`${baseUrl}/auth/login`, user);
    dispatch(loginSuccess(res.data));
    navigate.push("/");
  } catch (error) {
    setError("password", {
      type: "server",
      message: "Something went wrong with your password",
    });
    dispatch(loginFailed());
  }
};

export const FetchAgents = async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosJWT.get(`${baseUrl}/employees`);
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

export const ForgetPassword = (email) => async (dispatch) => {
  await dispatch(loginStart());
  try {
    console.log("EMAIL", email);
    const response = await axios.post(`${baseUrl}/auth/resetpass`, {
      email: email,
    });
    console.log("all customers api fetch REFETCH", response.data);
    toast.success("Check yoru email we send your new password");
  } catch (err) {
    toast.error(err.message);
    return dispatch(loginFailed(err));
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutSuccess());
  navigate("/login");
};
