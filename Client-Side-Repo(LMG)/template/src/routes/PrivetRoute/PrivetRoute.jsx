import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivetRoute = ({children}) => {
  const{user,loading} = useAuth()
  const location = useLocation()
  if(loading)return <span className="text-center loading loading-infinity loading-lg"></span>
  if (user) {
    return children
  }
  return <Navigate to={'/login'} state={{from:location}} ></Navigate>
};

export default PrivetRoute;