import{Link, NavLink}from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/logo.png'
import useAuth from '../../hooks/useAuth';
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
    <Link to={'/'} className=" text-xl font-bold"> <img className=' h-16' src={logo} alt="" /></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
   {navLinks}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
  );
};

export default Navbar;