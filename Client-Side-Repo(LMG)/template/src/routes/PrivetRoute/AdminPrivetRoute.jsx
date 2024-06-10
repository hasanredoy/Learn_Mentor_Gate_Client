/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useGetUserRole from "../../hooks/useGetUserRole";
import LoadingSpinner from "../../ReuseableCompo/LoadingSpinner";


const AdminPrivetRoute = ({children}) => {
  const {user , loading} = useAuth()
  const [isFetching,role]=useGetUserRole()
   const [isAdmin,setIsAdmin] = useState(role.role=="admin")
   
  //  console.log(isAdmin);
  //  if(role.role==='admin'){
  //   setIsAdmin(true)
  //  }

   const location = useLocation()
   if(loading || isFetching)return <LoadingSpinner></LoadingSpinner>
   if (user && isAdmin) {
     return children
   }
   return <Navigate to={'/'} state={location.pathname} ></Navigate>
};

export default AdminPrivetRoute;