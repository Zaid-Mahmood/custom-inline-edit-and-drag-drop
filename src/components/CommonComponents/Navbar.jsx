import React from 'react'
import { FaMobileAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setShowSideBar } from '../../redux/features/mainStore/storeSlice';
import NaturalCalmHeader from './NaturalCalmHeader/NaturalCalmHeader';
import SowaToolsHeader from './SowaToolsheader/SowaToolsHeader';
const Navbar = () => {
  const dispatch = useDispatch();
  const layoutId = useSelector((state) => state.mainStore.layoutId)
  const localStorageLayoutId = localStorage.getItem("layoutId")
  const headers = [{ bgColor: "#a6ce3a", component: <NaturalCalmHeader /> }, { bgColor: "#F0AE19", component: <SowaToolsHeader /> }]
  const NavBtns = [
    { profileName: "H", mobileIcon: <FaMobileAlt />, editBtn: "Edit" }
  ]

  const showSideMenuFunction = () => {
    dispatch(setShowSideBar());
  }
  return (
    <div className="flex justify-between" style={{ backgroundColor: headers[layoutId ?? localStorageLayoutId].bgColor }}>
      <div>
        {headers[layoutId ?? localStorageLayoutId].component}
      </div>
      <div>
        {NavBtns.map((item, id) => (
          <div key={id}>
            <button onClick={showSideMenuFunction} className='bg-[#604058] text-white ml-12 p-4 float-end cursor-pointer'>{item.editBtn}</button>
            <div className='flex justify-end items-center gap-x-12'>
              <p className='bg-green-400 px-4 py-2 rounded-sm my-2'>{item.profileName}</p>
              <p>{item.mobileIcon}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navbar;
