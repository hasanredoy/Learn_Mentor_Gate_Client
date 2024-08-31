import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../ReuseableCompo/LoadingSpinner";

const PrivetRoute = ({children}) => {
  const{user,loading} = useAuth()
  const location = useLocation()
  if(loading)return <LoadingSpinner></LoadingSpinner>
  if (user) {
    return children
  }
  return <Navigate to={'/login'} state={location.pathname} ></Navigate>
};

export default PrivetRoute;