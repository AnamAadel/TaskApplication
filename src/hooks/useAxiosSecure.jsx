import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../components/context/AuthContext";

const axiosSecure = axios.create({
    // baseURL: "http://localhost:5000"
    baseURL: "https://task-application-server.vercel.app"
})
// Add a request interceptor

function useAxiosSecure() {
  const navigation = useNavigate()
  const { logOutUser } = AuthContexts();

    

  axiosSecure.interceptors.request.use(function (config) {
    // Do something before request is sent
  
    config.headers.authorization =  `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  axiosSecure.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.log(error)

    const status = error.response.status;
    if(status === 401 || status === 403){
     await logOutUser()
      navigation("/login")
    }
    return Promise.reject(error);
  });

  return axiosSecure
}

export default useAxiosSecure