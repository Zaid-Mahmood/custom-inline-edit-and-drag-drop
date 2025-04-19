import React, { useState, useRef } from 'react'
import Lottie from 'react-lottie';
import loginImg from '../../../assets/login-img/naturalcalm.png';
import registerLottie from '../../../lottieAnimation/registerLottie.json';

const Register = () => {
    const [radioBtn, setRadioBtn] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: registerLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const registerRoute = () => {
        navigate("/register")
    }
    const toggleRadioBtn = (gender) => {
        setRadioBtn(gender)
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };
    const changeImgOption = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div>
            <div className='bg-conic from-blue-600 to-sky-400 to-50% h-full'>
                <h2 className='font-extrabold text-center text-3xl text-primary underline underline-offset-8 pt-12'>Enter Registeration Details</h2>
                <div className="mt-4 flex items-center justify-between mx-5">
                    <div className='p-6 border border-secondary rounded-xl w-[70%] bg-no-repeat bg-bottom-right bg-cover my-12 text-center mx-auto' style={{ backgroundImage: `url(${loginImg})` }}>
                        <div className='flex flex-col justify-center space-y-12 h-full mx-auto w-1/2'>
                            <input className='inputPlaceholder border-b-2 border-gray-300 outline-0' placeholder='Name' type='text' />
                            <input className='inputPlaceholder border-b-2 border-gray-300 outline-0' placeholder='Email' type='email' />
                            <input className='inputPlaceholder border-b-2 border-gray-300 outline-0' placeholder='Password' type='password' />
                            <input className='inputPlaceholder border-b-2 border-gray-300 outline-0' placeholder='Confirm Password' type='password' />
                            <div className='flex space-x-5'>
                                <p className='text-[#332725]'>Gender</p>
                                <input placeholder='male' className='border-b-2 border-gray-100 outline-0' type='radio' value="Male" checked={radioBtn === 'Male'} onChange={(e) => toggleRadioBtn(e.target.value)} />
                                <label className='text-[#332725]' for="male">Male</label>
                                <input placeholder='female' className='border-b-2 border-gray-100 outline-0' type='radio' checked={radioBtn === 'Female'} value="Female" onChange={(e) => toggleRadioBtn(e.target.value)} />
                                <label className='text-[#332725]' for="female">Female</label>
                            </div>
                            <div className='flex items-center space-x-4'>
                                <label className="cursor-pointer font-normal text-[#332725] rounded-md p-4">
                                    Upload Image
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={!selectedImage ? `bg-gray-400 h-fit w-1/2 p-4 text-white rounded-md` : "hidden"}
                                />
                                <div>
                                    {selectedImage && (
                                        <img
                                            src={selectedImage}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-full border border-gray-300"
                                        />
                                    )}
                                    {
                                        selectedImage &&
                                        <p onClick={changeImgOption} className='text-[#332725] cursor-pointer underline font-medium'>
                                            Change Image
                                        </p>
                                    }

                                </div>
                            </div>
                            <button onClick={registerRoute} className='bg-primary w-1/2 mx-auto text-white px-5 py-2 rounded-full cursor-pointer'>Register</button>
                        </div>
                    </div>
                    <Lottie options={defaultOptions} height={300} width={300} />
                </div>
            </div>
        </div>
    )
}

export default Register
