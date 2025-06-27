import { useState } from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { persistor } from '../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import SowaToolsHeader from '../SowaToolsHeader/SowaToolsHeader';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube, FaMobileAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from '../../../../redux/features/mainstore/authSlice';
import { CiInstagram } from "react-icons/ci";
import SmallScreenNavbar from './SmallScreenNavbar';
import { setLoginCrederntials, setSuccessMode, setShowSideBar } from '../../../../redux/features/mainstore/storeSlice';
import useDeleteUser from '../../../../customhooks/useDeleteUser';
import logo from '../../../../assets/natural-calm/natural-calm-logo.webp';
import { navItems } from './NavbarUtils';
const Navbar = ({ showSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postUrl = import.meta.env.VITE_Login_User_Api_Url;
  const [openListMenu, setOpenListMenu] = useState(false);
  const { layoutId, loginCredentials } = useSelector((state) => state.mainStore);
  const localStorageLayoutId = localStorage.getItem("layoutId");
  const getFirstName = loginCredentials?.name.split(/[\s-]+/);
  const headers = [{ bgColor: "#a6ce3a" }, { bgColor: "#F0AE19", component: <SowaToolsHeader /> }]
  const NavBtns = [
    { img: loginCredentials?.img, mobileIcon: <FaMobileAlt />, logoutBtn: <IoIosLogOut />, editBtn: "Edit" }
  ]
  const socialMediaIcons = [<FaFacebookF />, <FaTwitter />, <CiInstagram />, <FaYoutube />, <FiShoppingCart />]
  const openMenu = () => {
    setOpenListMenu(!openListMenu)
  }
  const showSideMenuFunction = () => {
    dispatch(setShowSideBar());
  }
  const delLoggedUser = () => {
    useDeleteUser(`https://custom-inline-edit-and-drag-drop.vercel.app/${loginCredentials?.id}` || `${postUrl}/${loginCredentials?.id}`)
    dispatch(setSuccessMode({ show: true, type: 'logout' }))
    dispatch(setLoginCrederntials(null))
  }
  const logoutUser = () => {
    dispatch(logout())
    delLoggedUser()
    persistor.purge()
    navigate("/")
  }

  const widthClass = showSidebar ? 'w-[80%]' : 'xs:w-[142%] sm:w-[114%] lg:w-full'

  return (
    <>
      <div className={`fixed top-0 z-20  ${widthClass}`}>
        <div className='relative'>
          <img className='xs:w-12 xs:h-12 sm:w-44 sm:h-32 xs:left-5 md:left-12 absolute' src={logo} alt="calm-logo" />

          <div className="flex justify-between xs:w-[70%] sm:w-[88%] lg:w-full" style={{ backgroundColor: headers[layoutId ?? localStorageLayoutId].bgColor }}>
            <div className='flex items-center md:hidden xs:ml-[45%] sm:ml-[50%]' >
              <GiHamburgerMenu onClick={openMenu} className='text-white' />
            </div>
            <div>
              {headers[layoutId ?? localStorageLayoutId].component}
            </div>
            <div>
              {NavBtns.map((item, id) => (
                <div className='flex' key={id}>
                  <div className='xs:hidden md:flex items-center'>
                    {socialMediaIcons.map((item, id) => (
                      <p className='mx-2' key={id}>{item}</p>
                    ))}
                  </div>
                  <div className='ml-4'>
                    <button onClick={showSideMenuFunction} className='bg-[#604058] text-white xs:ml-0 sm:ml-12 sm:p-4 xs:p-3 float-end cursor-pointer xs:text-xs text-lg'>{item.editBtn}</button>
                    <div className='flex justify-end items-center gap-x-24 sm:gap-x-12'>
                      <img className='xs:w-10 xs:h-10 rounded-full object-contain mt-1' src={item.img} alt='profile-img' />

                      <p className='text-xs mr-4 sm:mr-0  md:text-sm lg:text-lg text-white'>{`Welcome ${getFirstName[0]}!`}</p>
                      <p className='xs:hidden md:block'>{item.mobileIcon}</p>
                      <button onClick={logoutUser} className='cursor-pointer xs:hidden md:block'>{item.logoutBtn}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-end my-5'>
            {navItems.map((item, id) => (
              <ul key={id}>
                <li className={`mx-4 font-normal ${id === 0 ? 'text-primary' : 'text-black'}`}>{item}</li>
              </ul>
            ))}
          </div>
          <div className='xs:ml-[20%] sm:ml-[50%] md:hidden flex items-center'>
            <SmallScreenNavbar openListMenu={openListMenu} />
          </div>
        </div>
      </div>

    </>
  )
}

export default Navbar;
