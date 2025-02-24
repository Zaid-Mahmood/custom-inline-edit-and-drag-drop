import React from 'react'
import logo from '../../../assets/natural-calm/natural-calm-logo.webp';
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CiInstagram } from "react-icons/ci";
const NaturalCalmHeader = () => {
    const socialMediaIcons = [<FaFacebookF />, <FaTwitter />, <CiInstagram />, <FaYoutube />]
    return (
        <div className='h-16 flex'>
            <img className='w-44 h-36' src={logo} alt="calm-logo" />
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
