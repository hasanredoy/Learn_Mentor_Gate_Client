import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllClasses from "../pages/AllClasses/AllClasses";
import SingleClass from "../pages/AllClasses/SingleClass/SingleClass";
import TeachOnLMG from "../pages/TeachOnLearnMentorGate/TeachOnLMG";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/class/:id",
        element: <SingleClass></SingleClass>,
     
      },
      {
        path: "/teachOnLearnMentorGate",
        element: <TeachOnLMG></TeachOnLMG>,
     
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children:[
      // admin routes 
      {
        path:'allUsers',
        element:<AllUsers></AllUsers>
      },
      {
        path:'adminProfile',
        element:<AdminProfile></AdminProfile>
      },
    ]
  },
]);

export default router;
