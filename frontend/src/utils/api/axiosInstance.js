
import axios from "axios";
import { baseurl } from "../../key/key";

const axiosInstance = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "ngrok-skip-browser-warning": "true",
  },
});

export default axiosInstance;
