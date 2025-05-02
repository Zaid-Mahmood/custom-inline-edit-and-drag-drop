import React, { useState, useRef, useEffect } from 'react'
import Lottie from 'react-lottie';
import usePostUser from '../../../customhooks/usePostUser';
import loginImg from '../../../assets/login-img/naturalcalm.png';
import registerLottie from '../../../lottieAnimation/registerLottie.json';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useGetUser from '../../../customhooks/useGetUser';
import DangerAlert from '../../../CustomComponent/CustomAlerts/DangerAlert/DangerAlert';
import { useNavigate } from 'react-router-dom';
import { setSuccessMode } from '../../../redux/features/mainStore/storeSlice';
import {useDispatch} from 'react-redux'
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const url = "http://localhost:5000/users";
    const dangerMsg = "User already registered with this email!";
    const [selectedImage, setSelectedImage] = useState(null);
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const fileInputRef = useRef(null);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: registerLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const changeImgOption = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    let initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        gender: "",
        img: ""
    }
    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPass: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        gender: yup.string().oneOf(['Male', 'Female'], 'Gender is required').required('Gender is required'),
        img: yup.mixed().required('Image is required'),
    });
    const toBase64 = file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // This creates a base64 string
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    const { data, loading, error, registerUser } = usePostUser(url);
    const { getData, getLoading, getError, loginUser } = useGetUser(url);

    const matchedRegisterUsers = (registerVals) => {
        const matchedUsers = getData.find((item) => item.email === registerVals.email)
        if (matchedUsers) {
            setShowDangerAlert(false);
            setTimeout(() => {
                setShowDangerAlert(true);
            }, 50)
        } else {
            setShowDangerAlert(false);
            registerUser(registerVals);
            dispatch(setSuccessMode(true));
            navigate("/");
        }
    }
    const handleSubmit = (values) => {
        matchedRegisterUsers(values)
    }
    useEffect(() => {
        loginUser()
    }, [])
    return (
        <div>
            {showDangerAlert && <DangerAlert dangerMsg={dangerMsg} />}
            <div className='bg-conic from-blue-600 to-sky-400 to-50%'>
                <div className='flex flex-col'>
                    <h2 className='my-7 font-extrabold text-center text-3xl text-primary underline underline-offset-8'>Enter Registeration Details</h2>
                    <div className='flex justify-between mx-5 space-x-5 h-svh items-center'>
                        <div className='relative w-[70%] h-full'>
                            <div className='border border-secondary rounded-xl w-full h-[95%] bg-no-repeat bg-bottom bg-cover' style={{ backgroundImage: `url(${loginImg})`, filter: "blur(8px)" }}>
                            </div>
                            <div className='absolute translate-x-[50%] top-0 flex flex-col justify-center  h-full w-1/2 mx-auto '>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >

                                    <Form className='space-y-8'>
                                        <Field name="name" className="inputPlaceholder border-b-2 border-gray-300 outline-0" placeholder="Name" type="text" />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                                        <Field className='inputPlaceholder border-b-2 border-gray-300 outline-0' placeholder='Email' type='email' name="email" />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                        <Field className='inputPlaceholder border-b-2 border-gray-300 outline-0' placeholder='Password' name="password" type='password' />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                        <Field className='inputPlaceholder border-b-2 border-gray-300 outline-0' placeholder='Confirm Password' name="confirmPass" type='password' />
                                        <ErrorMessage name="confirmPass" component="div" className="text-red-500 text-sm" />
                                        <div className='flex space-x-5'>
                                            <p className='text-[#332725]'>Gender</p>
                                            <Field name="gender" type="radio" value="Male" />
                                            <label htmlFor="male" className='text-[#332725]'>Male</label>

                                            <Field name="gender" type="radio" value="Female" />
                                            <label htmlFor="female" className='text-[#332725]'>Female</label>
                                        </div>
                                        <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />

                                        <div className='flex items-center space-x-4'>
                                            <label className="cursor-pointer font-normal text-[#332725] rounded-md p-4">
                                                Upload Image
                                            </label>
                                            <Field name="img">
                                                {({ form }) => (
                                                    <>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            ref={fileInputRef}
                                                            onChange={async (e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    const base64 = await toBase64(file); // Convert to base64
                                                                    setSelectedImage(URL.createObjectURL(file)); // For preview
                                                                    form.setFieldValue("img", base64); // Save base64 in form
                                                                }
                                                            }}
                                                            className={!selectedImage ? `bg-gray-400 h-fit w-[55%] p-4 text-white rounded-md` : "hidden"}
                                                        />
                                                        <ErrorMessage name="img" component="div" className="text-red-500 text-sm" />
                                                    </>
                                                )}
                                            </Field>

                                            <div>
                                                {selectedImage && (
                                                    <img
                                                        src={selectedImage}
                                                        alt="Preview"
                                                        className="w-32 h-32 object-cover rounded-full border border-gray-300"
                                                    />
                                                )}
                                                {selectedImage &&
                                                    <p onClick={changeImgOption} className='text-[#332725] cursor-pointer underline font-medium'>
                                                        Change Image
                                                    </p>
                                                }

                                            </div>
                                        </div>
                                        <button type='submit' className='bg-primary w-1/2 mx-auto text-white px-5 py-2 rounded-full cursor-pointer'>Register</button>
                                    </Form>
                                </Formik>
                            </div>
                        </div>

                        <Lottie options={defaultOptions} height={500} width={500} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register






