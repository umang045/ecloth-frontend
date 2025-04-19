import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { loginUser, sendMail } from "../../Feature/Auth/AuthSlice";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button, Modal } from "antd";
import { base_url, getConfig, fetchToken, isLogin } from "../../utils/AxiosConfig";
import { getSingleUser } from "../../Feature/User/UserSlice";

//login validation schema
let loginSchema = yup.object({
  email: yup
    .string()
    .nullable()
    .email("Email should in valid Format!!")
    .required("Email is required"),
  pass: yup.string().required("Password is Required!!"),
});

//forgot model schema
let forgotModelSchema = yup.object({
  email: yup
    .string()
    .nullable()
    .email("Email should in valid Format!!")
    .required("Email is required"),
});

const Login = () => {
  //handle eye button of passowrd
  const [passType, setPassType] = useState("password");

  //handle redux here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLogin, isSuccess } = useSelector((state) => state.auth);

  //handle popup model here
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //handle animation using gsap here
  useGSAP(() => {
    gsap.from(".loginForm", {
      opacity: 0,
      duration: 1,
      x: -10,
      ease: "back.inOut",
    });
  });

  //handle login form validation & submition
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      let res = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(res)) {
        window.location.reload();
        toast.success("Login Successfull!!");
        isLogin();
        dispatch(getSingleUser());
        navigate("/");
      } else {
        toast.error("Invalid Email or Password");
      }
      if (isSuccess) {
        navigate("/");
      }
    },
  });

  //small model is there in below for forgot password
  const forgotFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotModelSchema,
    onSubmit: async (values) => {
      const res = await dispatch(sendMail(values));
      if (sendMail.fulfilled.match(res)) {
        toast.success("Mail Sent Successfully!!");
        setIsModalOpen(false);
      } else {
        toast.error("Invalid Email");
      }
    },
  });

  return (
    <>
      <div className="bg-gray-100 flex justify-center min-h-screen items-center loginForm">
        <div className="max-w-md w-full bg-white p-8  rounded-lg ">
          <h2 className="text-2xl text-center">Login Form</h2>

          <form action="" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                type="text"
                placeholder="yourmail@mail.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="text-red-700">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="flex items-center relative">
                <input
                  name="pass"
                  value={formik.values.password}
                  onChange={formik.handleChange("pass")}
                  onBlur={formik.handleBlur("pass")}
                  type={passType}
                  placeholder="****"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div
                  className="absolute right-2 cursor-pointer"
                  onClick={() => {
                    passType == "password"
                      ? setPassType("text")
                      : setPassType("password");
                  }}
                >
                  {passType == "password" ? <IoEyeSharp /> : <FaEyeSlash />}
                </div>
              </div>
              <div className="text-red-700">
                {formik.touched.pass && formik.errors.pass}
              </div>
              <div>
                <div onClick={showModal} className="underline cursor-pointer">
                  Forgot Password?
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center w-full">
              <button
                type="submit"
                className="bg-gray-700 text-white p-2 rounded-lg w-full"
              >
                Login
              </button>
            </div>

            <div className="flex items-center justify-center">
              <Link to="/register" className="underline">
                Sign UP
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* small model which open for send mail for reset pass */}
      <div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          // onOk={handleOk}
          onCancel={handleCancel}
          footer=" "
        >
          <form action="" onSubmit={forgotFormik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                name="email"
                value={forgotFormik.values.email}
                onChange={forgotFormik.handleChange("email")}
                onBlur={forgotFormik.handleBlur("email")}
                type="text"
                placeholder="yourmail@mail.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="text-red-700">
                {forgotFormik.touched.email && forgotFormik.errors.email}
              </div>
            </div>
            <div className="mb-4 flex items-center w-full">
              <button
                type="submit"
                className="bg-gray-700 text-white p-2 rounded-lg w-full"
              >
                Send Mail
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Login;
