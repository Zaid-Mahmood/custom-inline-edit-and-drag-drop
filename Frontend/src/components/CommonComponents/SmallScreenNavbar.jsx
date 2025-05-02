import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaMobileAlt } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";

const SmallScreenNavbar = ({ openListMenu }) => {
    const socialMediaIcons = [
        { name: "Facebook", icon: <FaFacebookF /> },
        { name: "Twitter", icon: <FaTwitter /> },
        { name: "Instagram", icon: <CiInstagram /> },
        { name: "Youtube", icon: <FaYoutube /> },
        { name: "Shopping cart", icon: <FiShoppingCart /> }
    ];

    return (
        <div
            className={`overflow-hidden transition-all duration-500 ease-in-out
                ${openListMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                bg-white w-[50%] p-4 border rounded-md`
            }
        >
            {socialMediaIcons.map((item, id) => (
                <ul key={id} className='bg-white'>
                    <li className='flex justify-between text-xs p-2'>
                        {item.name}  {item.icon}
                    </li>
                    <hr />
                </ul>
            ))}
        </div>
    );
};

export default SmallScreenNavbar;
