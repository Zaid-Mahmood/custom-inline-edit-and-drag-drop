import React  from 'react'
import { FaMobileAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setShowSideBar } from '../../redux/features/mainStore/storeSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const NavBtns = [
    { profileName: "H", mobileIcon: <FaMobileAlt />, editBtn: "Edit" }
  ]


  const showSideMenuFunction = () => {
    dispatch(setShowSideBar());
  }
  return (
    <div>
      {NavBtns.map((item, id) => (
        <div key={id}>
          <button onClick={showSideMenuFunction} className='bg-[#604058] text-white ml-12 p-4 float-end'>{item.editBtn}</button>
          <div className='flex justify-end items-center gap-x-12'>
            <p className='bg-green-400 px-4 py-2 rounded-sm my-2'>{item.profileName}</p>
            <p>{item.mobileIcon}</p>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default Navbar;
