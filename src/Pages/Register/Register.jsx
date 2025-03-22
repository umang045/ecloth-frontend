import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Feature/Auth/AuthSlice";
import { toast } from "react-toastify";

//declare register form validation schema
let registerSchema = yup.object({
  name: yup.string().required("name is Required!!"),
  email: yup
    .string()
    .nullable()
    .email("Email should in valid Format!!")
    .required("Email is required"),
  password: yup.string().required("Password is Required!!"),
  mobile: yup.string().max(10).min(10).required("mobile Number is Required!!"),
  role: yup.number().required("Role is Required!!"),
});

const Register = () => {
  //password hide see declaration
  const [passType, setPassType] = useState("password");

  //animation using gsap
  useGSAP(() => {
    gsap.from(".regForm", {
      opacity: 0,
      duration: 1,
      ease: "back.inOut",
    });
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle form submit using formik & toast
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: 0,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const res = await dispatch(registerUser(values));
      console.log(values);
      if (registerUser.fulfilled.match(res)) {
        toast.success("Register Successfull!!");
        navigate("/login");
      }
    },
  });

  return (
    <div className="bg-gray-100 flex justify-center min-h-screen items-center regForm">
      <div className="max-w-md w-full bg-white p-8  rounded-lg">
        <h2 className="text-2xl text-center">Register Form</h2>
        <form action="" onSubmit={formik.handleSubmit}>

          <div className="mb-4">
            <label htmlFor="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              type="text"
              placeholder="your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="text-red-700">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>

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
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
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
              {formik.touched.password && formik.errors.password}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="block text-gray-700 text-sm font-bold mb-2">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              maxLength={10}
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
              placeholder="9099887766"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="text-red-700">
              {formik.touched.mobile && formik.errors.mobile}
            </div>
          </div>

          <div className="mb-4">
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange("role")}
              onBlur={formik.handleBlur("role")}
              className=" px-4 py-2 w-full transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value={Number.parseInt("2")}>User</option>
              <option value={Number.parseInt("3")}>Seller</option>
            </select>
            <div className="text-red-700">
              {formik.touched.role && formik.errors.role}
            </div>
          </div>

          <div className="mb-4 flex items-center w-full">
            <button
              type="submit"
              className="bg-gray-700 text-white p-2 rounded-lg w-full"
            >
              Register
            </button>
          </div>

          <div className="flex items-center justify-center">
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;
