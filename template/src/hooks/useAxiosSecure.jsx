import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL:'https://server-side-repo-gules.vercel.app',
})
const useAxiosSecure = () => {
  const {logOut}=useAuth()
const navigate = useNavigate()

  axiosSecure.interceptors.request.use(function(config){
    const token = localStorage.getItem('access_token')
    // console.log('connection stops by interceptors',token);
    config.headers.authorization =`Bearer ${token}`
    return config;
  },function(error){
    return Promise.reject(error)
  })

  axiosSecure.interceptors.response.use(function(res){
    return res;
  },async function (error){
   const status = error.response.status
   if( status ===401 ||status===403){
       await logOut;
       navigate('/login')
   }

    return Promise.reject(error)
  })
  return axiosSecure
};

export default useAxiosSecure;