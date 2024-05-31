import{Link, NavLink}from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/logo.png'
import useAuth from '../../hooks/useAuth';
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import ThemeControl from '../../ReuseableCompo/ThemeControl';


const Navbar = () => {
  const {user}=useAuth()
  const navLinks=<div className=' flex gap-5 '>
    <NavLink className={'font-semibold text-lg hover:underline'} to={'/'}>Home</NavLink>
    <NavLink className={'font-semibold text-lg hover:underline'} to={'/allClasses'}>All Classes</NavLink>
    <NavLink className={'font-semibold text-lg hover:underline'} to={'/teachOnLearnMonitorGate'}>Teach on Learn Monitor Gate</NavLink>
  </div>
  
  return (
    <div className="navbar bg-base-200">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navLinks}
      </ul>
    </div>
    <Link to={'/'} className=" text-xl font-bold"> <img className=' h-12 lg:h-16' src={logo} alt="" /></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
   {navLinks}
    </ul>
  </div>
  <div className="navbar-end">
    <ThemeControl></ThemeControl>
    {
      !user?<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className=""><div>
        {
          !user?.photoURL?<img src={logo} className=' w-12 lg:w-14 h-12 lg:h-14 border border-green-600 rounded-full' alt="" />:<FaUser className=' text-5xl  border border-green-600 rounded-full'></FaUser>
        }
      </div></div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex flex-col gap-3">
        <li className=' text-xl font-bold'>{user?.displayName?user?.displayName:'Anonymous'}</li>
        <Link><button className=' text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 w-full flex gap-2 justify-center items-center '>Dashboard <RxDashboard></RxDashboard></button></Link>
        <button className=' text-lg font-bold text-white bg-amber-500 px-4 py-2 rounded-lg hover:bg-white hover:text-amber-500 hover:border hover:border-amber-700 flex gap-2 justify-center items-center '>Logout <FaSignOutAlt></FaSignOutAlt></button>
      </ul>
    </div>: <Link><button className=' text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 '>Login</button></Link>
    }
    
  </div>
</div>
  );
};

export default Navbar;