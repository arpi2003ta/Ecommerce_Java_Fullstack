import { Outlet } from 'react-router-dom'
import Navigation from '../../customer/components/navigation/navigation'
import Footer from '../../customer/components/footer/footer'

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
