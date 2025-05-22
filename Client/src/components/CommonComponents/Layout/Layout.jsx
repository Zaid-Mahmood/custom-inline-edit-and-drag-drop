import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideMenu from './SideMenu/SideMenu';
const Layout = () => {
    const { showSideBar } = useSelector((state) => state.mainStore);
    const contentWidthClass = showSideBar ? 'flex w-full' : 'w-full';
    return (
        <div className={`${contentWidthClass}`}>
            <div className='flex-1'>
                <Navbar showSidebar={showSideBar} />
                    <Outlet />
                <Footer />
            </div>

            <div className='xs:w-[45%] sm:w-[30%] lg:w-[20%] bg-black'>
                {showSideBar &&
                    <SideMenu />
                }
            </div>

        </div>
    )
}

export default Layout;
