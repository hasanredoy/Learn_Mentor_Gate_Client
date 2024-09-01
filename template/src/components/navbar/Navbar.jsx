import{Link, NavLink}from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/logo.png'
import useAuth from '../../hooks/useAuth';
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import ThemeControl from '../../ReuseableCompo/ThemeControl';


const Navbar = () => {
  const {user,logOut}=useAuth()
  

  // console.log(role);
  const navLinks=<section className=' flex  gap-2 lg:gap-5 flex-col lg:flex-row'>
    <div className=' flex lg:hidden'>
      <ThemeControl></ThemeControl>
    </div>
    <NavLink className={'font-semibold text-base  hover:underline'} to={'/'}>Home</NavLink>
    <NavLink className={'font-semibold text-base  hover:underline'} to={'/allClasses'}>All Classes</NavLink>
    <NavLink className={'font-semibold text-base  hover:underline'} to={'/teachOnLearnMentorGate'}>Teach on Learn Monitor Gate</NavLink>
  </section>
  const handleLogout=()=>{
    logOut()
    .then()
  }
  return (
    <nav className="  shadow-xl bg-base-200">
  <section className='navbar w-[95%] md:w-[90%] lg:w-[86%] mx-auto'>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] bg-base-300 p-2 shadow border rounded-md w-52">
        {navLinks}
      </ul>
    </div>
    <Link to={'/'} className="hidden lg:block"> <img className=' h-10  ' src={logo} alt="" /></Link>
  </div>
  <div className="navbar-center flex items-center ">
    <ul className="hidden lg:flex  menu menu-horizontal px-1">
   {navLinks}
    </ul>
    <Link to={'/'} className="block lg:hidden"> <img className=' h-9  ' src={logo} alt="" /></Link>
  </div>
  <div className="navbar-end">
    <div className=' mr-3 hidden md:flex'>
    <ThemeControl></ThemeControl>
    </div>
    {
      user?<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className=""><div>
        {
          user?.photoURL?<img src={user?.photoURL} className=' w-8 lg:w-12 h-8 lg:h-12 border border-green-600 rounded-full' alt="" />:<FaUser className=' text-5xl  border border-green-600 rounded-full'></FaUser>
        }
      </div></div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex flex-col gap-3 border border-gray-400">
        <li className=' text-base font-bold'>{user?.displayName?user?.displayName:'Anonymous'}</li>
        <Link to={`/dashboard/profile`}className='btn-primary flex gap-2 justify-center items-center '>Dashboard <RxDashboard></RxDashboard></Link>
        <button onClick={handleLogout} className='btn-secondary flex gap-2 justify-center items-center '>Logout <FaSignOutAlt></FaSignOutAlt></button>
      </ul>
    </div>: <Link to={'/login'}><button className=' btn-primary'>Login</button></Link>
    }
    
  </div>
  </section>
</nav>
  );
};

export default Navbar;