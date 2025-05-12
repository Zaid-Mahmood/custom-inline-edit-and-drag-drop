import {  useState } from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { persistor } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSideBar } from '../../redux/features/mainstore/storeSlice';
import SowaToolsHeader from './SowaToolsheader/SowaToolsHeader';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube, FaMobileAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from '../../redux/features/mainstore/authSlice';
import { CiInstagram } from "react-icons/ci";
import SmallScreenNavbar from './SmallScreenNavbar';
import { setLoginCrederntials, setSuccessMode } from '../../redux/features/mainstore/storeSlice';
import useDeleteUser from '../../customhooks/useDeleteUser';
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postUrl = "http://localhost:5000/loginUser";
  const [openListMenu, setOpenListMenu] = useState(false);
  const { layoutId, loginCredentials } = useSelector((state) => state.mainStore);
  const localStorageLayoutId = localStorage.getItem("layoutId");
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
    useDeleteUser(`${postUrl}/${loginCredentials?.id}`)
    dispatch(setSuccessMode({ show: true, type: 'logout' }))
    dispatch(setLoginCrederntials(null))
  }
  const logoutUser = () => {
    dispatch(logout())
    delLoggedUser()
    persistor.purge()
    navigate("/")
  }

  return (
    <>
      <div className="flex justify-between" style={{ backgroundColor: headers[layoutId ?? localStorageLayoutId].bgColor }}>
        <div className='flex items-center md:hidden xs:ml-[35%] sm:ml-[50%]' >
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
                <button onClick={showSideMenuFunction} className='bg-[#604058] text-white ml-12 p-4 float-end cursor-pointer'>{item.editBtn}</button>
                <div className='flex justify-end items-center gap-x-12'>
                  <img className='bg-green-400 w-12 h-12 rounded-full  object-contain' src={item.img} alt='profile-img' />
                  <p className='xs:hidden md:block'>{item.mobileIcon}</p>
                  <button onClick={logoutUser} className='cursor-pointer xs:hidden md:block'>{item.logoutBtn}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='xs:ml-[35%] sm:ml-[50%] md:hidden flex items-center'>
        <SmallScreenNavbar openListMenu={openListMenu} />
      </div>
    </>
  )
}

export default Navbar;
