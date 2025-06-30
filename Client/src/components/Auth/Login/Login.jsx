import { useState, useEffect } from 'react'
import Lottie from 'react-lottie';
import loginLottie from '../../../lottieAnimation/loginLottie.json';
import loginImg from '../../../assets/login-img/naturalcalm.png';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SuccessUtils } from '../../CustomComponent/CustomAlerts/SuccessAlert/SuccessUtils';
import * as yup from 'yup';
import usePostUser from '../../../customhooks/usePostUser';
import useGetUser from '../../../customhooks/useGetUser';
import SuccessAlert from '../../CustomComponent/CustomAlerts/SuccessAlert/SuccessAlert';
import DangerAlert from '../../CustomComponent/CustomAlerts/DangerAlert/DangerAlert';
import { login, logout } from '../../../redux/features/mainstore/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginCrederntials, setSuccessMode } from '../../../redux/features/mainstore/storeSlice';
const Login = () => {
    const dispatch = useDispatch();
    const windowWidth = window.screen.width;
    const { showSuccessAlert, msgTyp } = useSelector((state) => state?.mainStore);
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const postUrl = import.meta.env.VITE_Build_Login_Url || import.meta.env.VITE_Login_User_Api_Url;
    const getUrl = import.meta.env.VITE_Build_Get_Url || import.meta.env.VITE_All_Users_Api_Url;

    const svgDimensions = [{ width: 300, height: 300 }, { width: 500, height: 500 }]
    const navigate = useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loginLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const dangerMsg = "Email or Password is not correct";

    const registerRoute = () => {
        navigate("/register")
    }

    let initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = yup.object().shape({
        email: yup.string().required("Please enter your email").email("Please enter valid Email"),
        password: yup.string().required("Please enter your password")
    })
    const { data, loading, error, registerUser } = usePostUser(postUrl);
    const { getData, getLoading, getError, loginUser } = useGetUser(getUrl);
    const handleSubmit = async (values) => {
        const usersData = await loginUser();
        setShowDangerAlert(false);
        const findItems = usersData.find((item) => (item.email === values.email) && (item.password === values.password))
        if (findItems) {
            registerUser(findItems)
            dispatch(setLoginCrederntials(findItems))
            dispatch(login())
            dispatch(setSuccessMode({ show: true, type: 'login' }))
            setShowDangerAlert(false);
            navigate("/home")
        } else {
            dispatch(logout())
            setTimeout(() => {
                setShowDangerAlert(true);
            }, 50);
        }
    }

    useEffect(() => {
        if (showSuccessAlert) {
            const timer = setTimeout(() => {
                dispatch(setSuccessMode({ show: false, type: '' }));
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showSuccessAlert, dispatch]);
    return (
        <div className='bg-conic from-blue-600 to-sky-400 to-50% h-full flex flex-col justify-center'>
            {showDangerAlert && <DangerAlert dangerMsg={dangerMsg} />}
            {showSuccessAlert && <SuccessAlert successMsg={SuccessUtils[msgTyp]} />}
            <div>
                <h2 className='mt-28 font-extrabold text-center text-3xl text-primary underline underline-offset-8'>Enter Login Details</h2>
                <div>
                    <div className="h-fit flex items-center justify-between mx-5">
                        <div className='relative sm:w-[70%] w-full my-12'>
                            <div className='border border-secondary rounded-xl w-full h-[400px] bg-no-repeat bg-bottom  bg-cover  text-center mx-auto' style={{ backgroundImage: `url(${loginImg})`, filter: "blur(8px)" }}>
                            </div>
                            <div className='absolute top-0 xs:translate-y-1/2 md:translate-1/2'>
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    <Form className='w-[80%] mx-auto'>
                                        <Field id="email" name="email" className='border-b-2 border-gray-100 outline-0 w-full' placeholder='Email' type='email' />
                                        <p className='text-red-500 my-4'>
                                            <ErrorMessage name='email' />
                                        </p>
                                        <Field id="password" name="password" className='border-b-2 border-gray-100 outline-0 w-full' placeholder='Password' type='password' />
                                        <p className='text-red-500 my-4'>
                                            <ErrorMessage name='password' />
                                        </p>
                                        <p className='text-white bg-black/60 p-2 rounded my-10 xs:text-xs w-fit'>If you donot have an account then please click on register button to get registered!</p>
                                        <div className='flex space-x-5 justify-center'>
                                            <button type='submit' className='bg-primary text-white px-5 py-2 text-center rounded-full  cursor-pointer xs:text-xs md:text-sm'>Login</button>
                                            <button type='button' onClick={registerRoute} className='bg-primary text-white px-5 py-2 rounded-full cursor-pointer'>Register</button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                        <div className='xs:hidden sm:block'>
                            {windowWidth < 1020
                                ?
                                <Lottie options={defaultOptions} height={svgDimensions[0].height} width={svgDimensions[0].width} />
                                :
                                <Lottie options={defaultOptions} height={svgDimensions[1].height} width={svgDimensions[1].width} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
