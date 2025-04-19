import {
  getUsersCart,
  removeFromUsersCart,
  updateCartQuantity,
} from "../../Feature/User/UserSlice";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Image } from "antd";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import emptyCartGif from "../../../public/emptyCart.gif";
import { GiShop } from "react-icons/gi";

const Cart = () => {
  const dispatch = useDispatch();

  //*******************Animation Start********************** */
  useGSAP(() => {
    gsap.from(".carts", {
      opacity: 0,
      duration: 1,
      x: -20,
      ease: "power2.inOut",
    });
    gsap.from(".cartsSummary", {
      opacity: 0,
      duration: 1,
      x: 20,
      ease: "power2.inOut",
    });
  });
  //*******************Animation End********************** */

  //*******************fetch Start********************** */

  useEffect(() => {
    dispatch(getUsersCart());
  }, [dispatch]);

  const { usersCart, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  //*******************fetch End********************** */

  //*******************Handle Cart Operation Start********************** */

  //update cart items quantity
  const handleQuantityChange = async (id, amount) => {
    if (amount >= 1 && amount <= 5) {
      await dispatch(updateCartQuantity({ pid: id, quntity: amount }));
      await dispatch(getUsersCart());
    }
  };

  //remove item from cart
  const handleRemoveItem = async (id) => {
    const res = await dispatch(removeFromUsersCart(id));
    if (removeFromUsersCart.fulfilled.match(res)) {
      toast.success("Item Removed");
      dispatch(getUsersCart());
    }
  };

  //calculate total
  const totalAmount = usersCart?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  //*******************Handle Cart Operation End********************** */


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {usersCart?.length == 0 ? (
            <>
              <div className="flex flex-col justify-center items-center lg:flex-row lg:space-x-10 p-6 bg-white min-h-screen">
                <div className="flex flex-col items-center">
                  <div class="text-2xl flex flex-col font-semibold text-gray-900 mt-4 ">
                    !! Empty !!
                  </div>
                  <div className="w-80 h-80">
                    <img
                      src={emptyCartGif}
                      alt="Empty Cart"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div class="text-lg flex flex-col font-semibold text-gray-900 mt-4 animate-pulse hover:underline">
                    <Link className="flex gap-2 items-center " to={"/products"}>
                      Continue To Shoping <GiShop />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col lg:flex-row lg:space-x-10 p-6 bg-gray-50 min-h-screen">
                <div className=" carts lg:w-3/5 bg-white shadow-lg rounded-lg p-4">
                  <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                  {usersCart &&
                    usersCart?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border-b"
                      >
                        <div className="flex items-center">
                          <Image width={100} src={item?.image} />
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold">
                              {item?.title}
                            </h3>
                            <p className="text-gray-600">Size: {item?.size}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-gray-600">
                                Color: {item?.color}
                              </p>
                              <div
                                className={`h-6 w-6 rounded-full`}
                                style={{ backgroundColor: item?.color_code }}
                              ></div>
                            </div>
                            <div className="flex items-center mt-2">
                              <button
                                className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                                onClick={() =>
                                  handleQuantityChange(
                                    item?.product_id,
                                    item?.quantity - 1
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="mx-2">{item?.quantity}</span>
                              <button
                                className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                                onClick={() =>
                                  handleQuantityChange(
                                    item?.product_id,
                                    item?.quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">${item.price}</p>
                          <button
                            className="text-red-600 hover:text-red-800 mt-2"
                            onClick={() => handleRemoveItem(item?.cart_id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="cartsSummary lg:w-2/5 bg-white shadow-lg rounded-lg p-6 mt-6 lg:mt-0">
                  <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="text-gray-700">${totalAmount}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Shipping</span>
                    <span className="text-gray-700">$5.00</span>
                  </div>
                  <div className="flex justify-between mb-4 border-t pt-4">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">
                      ${totalAmount + 5}
                    </span>
                  </div>
                  <Link
                    to={"/checkout"}
                    className="w-full p-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
