import React from 'react'
import logo from '../../../assets/natural-calm/natural-calm-logo.webp';
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CiInstagram } from "react-icons/ci";
import { useSelector } from 'react-redux';
const NaturalCalmHeader = () => {
    const showSidebar = useSelector((state) => state.mainStore.showSideBar)
    const socialMediaIcons = [<FaFacebookF />, <FaTwitter />, <CiInstagram />, <FaYoutube />]
    return (
        <div className={`h-14 flex justify-between ${showSidebar ? 'w-[60vw]' : 'w-[80vw]'}`}>
            <div>
                <img className='w-44 h-36 ml-25' src={logo} alt="calm-logo" />
            </div>
            <div className='flex items-center'>
                {socialMediaIcons.map((item, id) => (
                    <p className='mx-2' key={id}>{item}</p>
                ))}
                <FiShoppingCart />
            </div>
        </div>
    )
}

export default NaturalCalmHeader
