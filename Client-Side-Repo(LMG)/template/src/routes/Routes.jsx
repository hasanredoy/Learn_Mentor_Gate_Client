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
import AddClass from "../pages/Dashboard/Teacher/AddClass";
import AllClassesAdmin from "../pages/Dashboard/Admin/AllClassesAdmin";
import MyClassTeacher from "../pages/Dashboard/Teacher/MyClassTeacher";
import UpdateClassTeacher from "../pages/Dashboard/Teacher/UpdateClassTeacher";
import SeeProgress from "../pages/Dashboard/Teacher/SeeProgress";
import PaymentPage from "../pages/Payment/PaymentPage";
import UserClasses from "../pages/Dashboard/User/UserClasses";
import UserClassDetails from "../pages/Dashboard/User/UserClassDetails";

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
        path: "/paymentPage/:id",
        element:<PaymentPage/>
     
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
      {
        path:'allClasses',
        element:<AllClassesAdmin></AllClassesAdmin>
      },
      // common 
      {
        path:'profile',
        element:<Profile></Profile>
      },
      // teacher 
      {
        path:'addClass',
        element:<AddClass></AddClass>
      },
      {
        path:'myClasses',
        element:<MyClassTeacher></MyClassTeacher>
      },
      {
        path:'myClass/:id',
        element:<SeeProgress></SeeProgress>
      },
      {
        path:'my-class/:id',
        element:<UpdateClassTeacher></UpdateClassTeacher>
      },
       
      // user 
      {
        path:'myEnrollClass',
        element:<UserClasses></UserClasses>
      },
      {
        path:'my_Enroll_Class/:id',
        element:<UserClassDetails></UserClassDetails>
      },
       

    ]
  },
]);

export default router;
