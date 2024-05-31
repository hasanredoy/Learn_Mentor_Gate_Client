import {Outlet} from 'react-router-dom'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
const Layout = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
      <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;