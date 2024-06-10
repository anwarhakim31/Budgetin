import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../constant/constant";

export const postUser = async (data) => {
  try {
    const res = await axios.post(URL + "/users/", data);
    toast.success("Succes Create Account!");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (callback) => {
  try {
    const res = await axios.get(URL + "/users/ ");
    callback(res);
  } catch (error) {
    console.log(error);
  }
};
