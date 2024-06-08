import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useGetUserRole from "../../hooks/useGetUserRole";


const AdminPrivetRoute = ({children}) => {
  const {user , loading} = useAuth()
  const [isFetching,role]=useGetUserRole()
   const [isAdmin,setIsAdmin] = useState(role.role=="admin")
   
   console.log(isAdmin);
  //  if(role.role==='admin'){
  //   setIsAdmin(true)
  //  }

   const location = useLocation()
   if(loading || isFetching)return <span className="text-center loading loading-infinity loading-lg"></span>
   if (user && isAdmin) {
     return children
   }
   return <Navigate to={'/'} state={{from:location}} ></Navigate>
};

export default AdminPrivetRoute;