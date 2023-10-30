import axios from "axios";
const API_ENDPOINT = "http://localhost:8080/api/";

const AxiosClient = axios.create({
  baseURL: API_ENDPOINT,
  responseType: "json",
  timeout: 50000,
  withCredentials: true, // set withCredentials to true to send cookies
});

AxiosClient.interceptors.response.use(
  function (response) {
    return response.data ?? response;
  },
  function (error) {
    console.log("Error:", error.response);
    return Promise.reject(error);
  }
);

export default AxiosClient;
