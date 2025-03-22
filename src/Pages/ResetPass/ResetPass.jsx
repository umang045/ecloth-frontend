import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { loginUser, updateUserPassword } from "../../Feature/Auth/AuthSlice";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useParams } from "react-router-dom";

// newPassword
let passResetSchema = yup.object({
  newPassword: yup.string().required("password is require"),
  confirm_password: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  //   token: yup.string(),
});

const ResetPass = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passType, setPassType] = useState("password");

  //take token from paramsa
  const { token } = useParams();
  //   console.log(token);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      token: token,
    },
    validationSchema: passResetSchema,
    onSubmit: async (values) => {
        // console.log(values);
      const res = await dispatch(updateUserPassword(values));
      if (updateUserPassword.fulfilled.match(res)) {
        toast.success("Password Reset Successfull");
        navigate("/login");
      } else {
        toast.error("Password Reset Failed");
      }
    },
  });

  return (
    <>
      <div className="bg-gray-100 flex justify-center min-h-screen items-center loginForm">
        <div className="max-w-md w-full bg-white p-8  rounded-lg ">
          <h2 className="text-2xl text-center mb-2">Update Your Password</h2>

          <form action="" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <div className="flex items-center relative">
                <input
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange("newPassword")}
                  onBlur={formik.handleBlur("newPassword")}
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
                {formik.touched.newPassword && formik.errors.newPassword}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <div className="flex items-center relative">
                <input
                  name="confirm_password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange("confirm_password")}
                  onBlur={formik.handleBlur("confirm_password")}
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
                {formik.touched.confirm_password &&
                  formik.errors.confirm_password}
              </div>
            </div>

            <div className="mb-4 flex items-center w-full">
              <button
                type="submit"
                className="bg-gray-700 text-white p-2 rounded-lg w-full"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
