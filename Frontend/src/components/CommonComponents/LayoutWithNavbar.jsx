import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideMenu from './SideMenu';

const LayoutWithNavbar = () => {
    const showSidebar = useSelector((state) => state.mainStore.showSideBar)
    const contentWidthClass = showSidebar ? 'w-[80%]' : 'w-full'
    return (
        <div className='flex'>
            <div className={contentWidthClass}>
                <Navbar />
                <Outlet/>
                <Footer />
            </div>
            {showSidebar &&
                <div className='w-[20%] bg-black'>
                    <SideMenu />
                </div>
            }
        </div>
    )
}

export default LayoutWithNavbar
