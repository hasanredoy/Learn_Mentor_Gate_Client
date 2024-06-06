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
import Profile from "../pages/Dashboard/profile/Profile";
import TeachersRequests from "../pages/Dashboard/Admin/TeachersRequests";

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
        path:'teacherRequests',
        element:<TeachersRequests></TeachersRequests>
      },
      // common 
      {
        path:'profile',
        element:<Profile></Profile>
      },
    ]
  },
]);

export default router;
