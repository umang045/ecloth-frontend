import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { base_url, getConfig, fetchToken, isLogin } from "@/utils/AxiosConfig";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSingleUser, getUsersCart } from "@/Feature/User/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //check is login or not?
  useEffect(() => {
    isLogin();

  }, [isLogin()]);

  useGSAP(() => {
    gsap.from(".container", {
      opacity: 0,
      duration: 2,
      x: -50,
      ease: "power2.out",
    });
    gsap.from(".options", {
      duration: 3,
      x: -70,
      ease: "back.out",
    });
  });

  //*********************** On Off Toggle Menu**************** */
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  //*******************fetch Start********************** */

  useEffect(() => {
    if (isLogin()) {
    dispatch(getUsersCart());
    dispatch(getSingleUser())}
  }, [dispatch , isLogin()]);

  const { usersCart, userInfo, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  // console.log(userInfo, userInfo?.role != "user", isLogin());

  //*******************fetch End********************** */

  return (
    <>
      <div className="bg-black p-4 sticky top-0 z-50">
        <div className="container flex justify-between">
          <Link href="" className="text-white text-lg font-bold">
            UI
          </Link>
          <div className="space-x-10 options md:flex">
            <Link to="/" className="text-gray-200 hover:text-white">
              Home
            </Link>

            <Link to="/products" className="text-gray-200 hover:text-white">
              Products
            </Link>

            <Link to="/ContactUs" className="text-gray-300 hover:text-white">
              Contact Us
            </Link>

            <Link to="/aboutUs" className="text-gray-300 hover:text-white">
              About Us
            </Link>
          </div>

          <div className="space-x-5 options md:flex cursor-pointer">
            {userInfo && userInfo?.role != "user" && isLogin() && (
              <div
                onClick={() => {
                  navigate(`/${userInfo && userInfo?.role}`);
                }}
                className="flex gap-1 items-center"
              >
                <div className="text-white">DashBoard</div>
                <AiOutlineDashboard color="white" size={30} />
              </div>
            )}

            <div
              className="flex gap-1 text-white items-center cursor-pointer"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <p>My Cart</p>
              <div className="relative">
                <FaShoppingCart color="white" size={30} />
                <div
                  style={{
                    right: "-10px",
                    top: "-10px",
                    fontSize: "10px",
                    width: "20px",
                    height: "20px",
                  }}
                  className="bg-red-600 text-center rounded-full text-sm absolute right-0 top-0"
                >
                  {!isLogin() ? 0 : usersCart?.length}
                  {/* {usersCart && isLogin() ? usersCart.length : 0} */}
                </div>
              </div>
            </div>
            <div
              className="relative"
              onMouseEnter={() => {
                setIsProfileMenuOpen(true);
              }}
              onClick={toggleProfileMenu}
            >
              <FaUserCircle color="white" size={30} />
              {isProfileMenuOpen && (
                <div
                  onMouseLeave={() => {
                    setIsProfileMenuOpen(false);
                  }}
                  className="absolute  right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  {!isLogin() && (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  )}
                  {isLogin() && (
                    <div
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                        window.location.reload();
                      }}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
