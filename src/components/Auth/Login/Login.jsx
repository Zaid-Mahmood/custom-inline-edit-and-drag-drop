import React from 'react'
import Lottie from 'react-lottie';
import loginLottie from '../../../lottieAnimation/loginLottie.json';
import loginImg from '../../../assets/login-img/naturalcalm.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loginLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const registerRoute = () => {
        navigate("/register")
    }
    return (
        <div className='h-svh'>
            <div className='bg-conic from-blue-600 to-sky-400 to-50% h-full'>
                <h2 className='font-extrabold text-center text-3xl text-primary underline underline-offset-8 pt-12'>Enter Login Details</h2>
                <div className="my-4 flex items-center justify-between mx-5">
                    <div className='border border-secondary rounded-xl w-full h-[400px] bg-no-repeat bg-center bg-cover  text-center mx-auto' style={{ backgroundImage: `url(${loginImg})` }}>
                        <div className='flex flex-col justify-center space-y-12 h-full mx-auto  w-1/2'>
                            <input className='border-b-2 border-gray-100 outline-0' placeholder='Email' type='email' />
                            <input className='border-b-2 border-gray-100 outline-0' placeholder='Password' type='password' />
                            <p className='text-white bg-black/60 p-2 rounded'>If you donot have an account then please click on register button to get registered!</p>
                            <div className='flex space-x-5'>
                                <button className='bg-primary text-white px-5 py-2 rounded-full  cursor-pointer'>Login</button>
                                <button onClick={registerRoute} className='bg-primary text-white px-5 py-2 rounded-full cursor-pointer'>Register</button>
                            </div>
                        </div>
                    </div>
                    <Lottie options={defaultOptions} height={500} width={500} />
                </div>
            </div>
        </div>
    )
}

export default Login
