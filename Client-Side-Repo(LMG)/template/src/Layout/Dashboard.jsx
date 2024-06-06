import { FaHome, FaList, FaMoon, FaPlus,  FaSignOutAlt, FaStar, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineContactSupport } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import useAuth from "../hooks/useAuth";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { IoSunnySharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import tutorial from '../assets/icons/tutorial.png';
import './dashboard.css'
import useGetUserRole from "../hooks/useGetUserRole";


const Dashboard = () => {
  const {logOut}=useAuth()
  const [menu , setMenu]=useState(false)
  const [,role]=useGetUserRole()
  const handleLogOut=()=>{
    swal({
      title: "Are you sure?",
      text: "You Want to Logout",
      icon: "warning",
 
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        logOut()
        .then(()=>{
         swal(
            "Logged Out Successfully"
          );
        })
      }
    });
    
  }

  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const handleTheme = (e) => {
    //  console.log(e.target.value);
    setTheme(e.target.value);
    if (e.target.value === "light") {
      localStorage.setItem("theme", "light");
    } else if (e.target.value === "dark") {
      localStorage.setItem("theme", "dark");
    }
    document
      .querySelector("html")
      .setAttribute("data-theme", localStorage.getItem("theme"));
  };
  // console.log(theme);
  useEffect(() => {
    document
      .querySelector("html")
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, []);
const isAdmin=role?.role
const isTeacher=role?.role

  return (
    <div className=" flex gap-10 container mx-auto">

      {/* sidebar */}
       <button onClick={()=>setMenu(!menu)} className={`${theme==='light'?'text-black':'text-white'} z-50 lg:hidden text-2xl  absolute`}><TiThMenu></TiThMenu></button>
      <div className={` ${menu?"block":'hidden'} absolute z-40 w-[50%] lg:hidden min-h-screen  px-5 pt-4  bg-[#03962A] `}>
       <div className=" h-full flex max-h-screen flex-col justify-evenly">
       <div className=" flex-1">

       <div
              className={` text-white flex gap-2  items-center   p-2 border-b-2 border-[#15f7ce] mb-3 `}
            >
              <span className="  text-base lg:text-xl ">
                {theme === "light" && (
                  <IoSunnySharp className=""></IoSunnySharp>
                )}
                {theme === "dark" && <FaMoon></FaMoon>}
              </span>
              <select
                className=" bg-[#03962A] text-white font-bold outline-none border-0"
                defaultValue={
                  localStorage.getItem("theme")
                    ? localStorage.getItem("theme")
                    : "Theme"
                }
                onChange={handleTheme}
                name="themeController"
              >
                <option value="light"> Light </option>
                <option value="dark">Dark </option>
              </select>
            </div>
            {
              isTeacher==='teacher'?<div>
              {/* teacher links */}
             
              <NavLink to={'/dashboard/profile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser > My Profile</NavLink>
              <NavLink to={'/dashboard/addClass'} className={'flex items-center font-bold gap-2 my-3 text-white'}><FaPlus></FaPlus>Add Class</NavLink>
              <NavLink to={'/dashboard/myClasses'} className={'flex items-center font-bold gap-2 my-3 text-white'}><SiGoogleclassroom></SiGoogleclassroom>My Classes</NavLink>
             
              </div>:
          isAdmin==='admin'?<div>
          {/* admin links */}
          
          <NavLink to={'/dashboard/profile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser >Profile</NavLink>
          <NavLink to={'/dashboard/allUsers'} className={'flex items-center font-bold gap-2 my-3 text-white'}><FaUsers></FaUsers >All Users </NavLink>
          <NavLink to={'/dashboard/allClasses'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaList></FaList>All Classes</NavLink>
          <NavLink to={'/dashboard/teacherRequests'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <MdAddShoppingCart></MdAddShoppingCart>Teacher Request</NavLink>
          </div>:<div>
          {/* user links */}
         
          <NavLink to={'/dashboard/profile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser > My Profile</NavLink>
          <NavLink to={'/dashboard/userClass'} className={'flex items-center font-bold gap-2 my-3 text-white'}><SiGoogleclassroom></SiGoogleclassroom>My Classes</NavLink>
         
          </div>
        }
         
        </div>
        {/* static links  */}
        <div className="divider"></div>
        <div>
        
          
          <NavLink to={'/'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome > Home</NavLink>
          <NavLink to={'/allClasses'} className={'flex items-center font-bold gap-2 text-white my-3'}><img src={tutorial} className=" bg-white"></img> All Classes</NavLink>
          <NavLink to={'/contact'} className={'flex items-center font-bold gap-2 my-3 text-white'}><MdOutlineContactSupport></MdOutlineContactSupport >Contact</NavLink>
          <NavLink to={'/reviews'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaStar></FaStar>Reviews</NavLink>
          <h3 onClick={handleLogOut}  className={' cursor-pointer flex items-center font-bold gap-2 my-3 text-white'}> <FaSignOutAlt></FaSignOutAlt>Logout</h3>
        </div>
       </div>
      </div>
      {/* links for lg  */}
      <div className={` hidden lg:block w-[20%] min-h-screen  px-5 pt-4  bg-[#03962a] `}>
       <div className=" h-full flex max-h-screen flex-col justify-evenly">
       <div className=" flex-1">

       <div
              className={` text-white flex gap-2  items-center   p-2 border-b-2 border-[#15f7ce] mb-3 `}
            >
              <span className="  text-base lg:text-xl ">
                {theme === "light" && (
                  <IoSunnySharp className=""></IoSunnySharp>
                )}
                {theme === "dark" && <FaMoon></FaMoon>}
              </span>
              <select
                className=" bg-[#03962a] text-white font-bold outline-none border-0"
                defaultValue={
                  localStorage.getItem("theme")
                    ? localStorage.getItem("theme")
                    : "Theme"
                }
                onChange={handleTheme}
                name="themeController"
              >
                <option value="light"> Light </option>
                <option value="dark">Dark </option>
              </select>
            </div>
            <div>
            {
              isTeacher==='teacher'?<div>
              {/* teacher links */}
             
              <NavLink to={'/dashboard/profile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser > My Profile</NavLink>
              <NavLink to={'/dashboard/addClass'} className={'flex items-center font-bold gap-2 my-3 text-white'}><FaPlus></FaPlus>Add Class</NavLink>
              <NavLink to={'/dashboard/myClasses'} className={'flex items-center font-bold gap-2 my-3 text-white'}><SiGoogleclassroom></SiGoogleclassroom>My Classes</NavLink>
             
              </div>:
          isAdmin==='admin'?<div>
          {/* admin links */}
          
          <NavLink to={'/dashboard/profile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser >Profile</NavLink>
          <NavLink to={'/dashboard/allUsers'} className={'flex items-center font-bold gap-2 my-3 text-white'}><FaUsers></FaUsers >All Users </NavLink>
          <NavLink to={'/dashboard/allClasses'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaList></FaList>All Classes</NavLink>
          <NavLink to={'/dashboard/teacherRequests'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <MdAddShoppingCart></MdAddShoppingCart>Teacher Request</NavLink>
          </div>:<div>
          {/* user links */}
         
          <NavLink to={'/dashboard/profile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser > My Profile</NavLink>
          <NavLink to={'/dashboard/userClass'} className={'flex items-center font-bold gap-2 my-3 text-white'}><SiGoogleclassroom></SiGoogleclassroom>My Classes</NavLink>
         
          </div>
        }
            </div>
         
        </div>
        <div className="divider"></div>
        {/* static links  */}
        <div>
        
          
          <NavLink to={'/'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome > Home</NavLink>
          <NavLink to={'/allClasses'} className={'flex items-center font-bold gap-2 text-white my-3'}><img src={tutorial} className=" bg-white"></img> All Classes</NavLink>
          <NavLink to={'/contact'} className={'flex items-center font-bold gap-2 my-3 text-white'}><MdOutlineContactSupport></MdOutlineContactSupport >Contact</NavLink>
          <NavLink to={'/reviews'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaStar></FaStar>Reviews</NavLink>
          <h3 onClick={handleLogOut}  className={' cursor-pointer flex items-center font-bold gap-2 my-3 text-white'}> <FaSignOutAlt></FaSignOutAlt>Logout</h3>
        </div>
       </div>
      </div>
      <div className=" w-full lg:w-[70%] ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;