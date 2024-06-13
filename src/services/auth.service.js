import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../constant/constant";

export const postUser = async (data) => {
  const postPromise = axios.post(URL + "/users/", data);

  toast.promise(postPromise, {
    pending: "Creating your account...",
    success: "Success! Account created.",
    error: "Error! Could not create account.",
  });

  try {
    const res = await postPromise;
    return res.data;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error so it can be handled by the toast.promise
  }
};

export const getUser = async (callback) => {
  try {
    toast.promise(axios.get(URL + "/users/ "), {
      pending: "Process...",
    });

    const res = await axios.get(URL + "/users/ ");
    callback(res);
  } catch (error) {
    console.log(error);
  }
};
