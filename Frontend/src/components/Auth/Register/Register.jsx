import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'react-lottie';
import usePostUser from '../../../customhooks/usePostUser';
import loginImg from '../../../assets/login-img/naturalcalm.png';
import registerLottie from '../../../lottieAnimation/registerLottie.json';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useGetUser from '../../../customhooks/useGetUser';
import DangerAlert from '../../../CustomComponent/CustomAlerts/DangerAlert/DangerAlert';
import { useNavigate } from 'react-router-dom';
import { setSuccessMode } from '../../../redux/features/mainstore/storeSlice';
import { useDispatch } from 'react-redux';
import useSvgDimension from '../../../customhooks/useSvgDimension';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { windowWidth, svgDimensions } = useSvgDimension();
  const url = import.meta.env.VITE_All_Users_Api_Url;

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

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    gender: "",
    img: ""
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPass: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    gender: yup.string().oneOf(['Male', 'Female'], 'Gender is required').required('Gender is required'),
    img: yup.mixed().required('Image is required'),
  });

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const { data, loading, error, registerUser } = usePostUser(url);
  const { getData, getLoading, getError, loginUser } = useGetUser(url);

  const matchedRegisterUsers = async (registerVals) => {
    const usersData = getData;
    const matchedUsers = await usersData.find((item) => item.email === registerVals.email);
    if (matchedUsers) {
      setShowDangerAlert(false);
      setTimeout(() => {
        setShowDangerAlert(true);
      }, 50);
    } 
    if (!matchedUsers) {
      setShowDangerAlert(false);
      registerUser(registerVals);
      dispatch(setSuccessMode({ show: true, type: "register" }));
      navigate("/");
    }
  };

  const handleSubmit = (values) => {
    matchedRegisterUsers(values);
  };
  useEffect(() => {
    loginUser()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-600 to-sky-400 py-10 px-4 sm:px-6 lg:px-8">
      {showDangerAlert && <DangerAlert dangerMsg={dangerMsg} />}
      <h2 className="text-2xl md:text-4xl font-extrabold text-primary text-center underline underline-offset-8 mb-10">
        Enter Registration Details
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form Section */}
        <div className="relative w-full bg-white bg-opacity-70 rounded-xl shadow-md p-6 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${loginImg})`, filter: "blur(8px)" }}
          ></div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="relative z-10 w-full max-w-md space-y-4">
              <Field name="name" className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none" placeholder="Name" type="text" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

              <Field className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none" placeholder="Email" type="email" name="email" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

              <Field className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none" placeholder="Password" name="password" type="password" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

              <Field className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none" placeholder="Confirm Password" name="confirmPass" type="password" />
              <ErrorMessage name="confirmPass" component="div" className="text-red-500 text-sm" />

              <div className="flex items-center space-x-4">
                <p className="text-gray-800">Gender</p>
                <Field name="gender" type="radio" value="Male" />
                <label className="text-gray-700">Male</label>

                <Field name="gender" type="radio" value="Female" />
                <label className="text-gray-700">Female</label>
              </div>
              <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />

              <div className="flex items-center space-x-4">
                <label className="cursor-pointer font-normal text-gray-700">
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
                            const base64 = await toBase64(file);
                            setSelectedImage(URL.createObjectURL(file));
                            form.setFieldValue("img", base64);
                          }
                        }}
                        className={!selectedImage ? "block text-sm p-2" : "hidden"}
                      />
                      <ErrorMessage name="img" component="div" className="text-red-500 text-sm" />
                    </>
                  )}
                </Field>

                <div>
                  {selectedImage && (
                    <>
                      <img src={selectedImage} alt="Preview" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border" />
                      <p onClick={changeImgOption} className="text-blue-700 cursor-pointer underline text-sm mt-1">
                        Change Image
                      </p>
                    </>
                  )}
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-full transition duration-300">
                Register
              </button>
            </Form>
          </Formik>
        </div>

        {/* Lottie Animation Section */}
        <div className="hidden lg:flex items-center justify-center">
          <Lottie
            options={defaultOptions}
            height={svgDimensions[1]?.height || 400}
            width={svgDimensions[1]?.width || 400}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
