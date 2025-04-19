import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSellersSingleOrders } from "../../../Feature/User/UserSlice";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Image } from "antd";

const SellerSingleOrder = () => {
  const dispatch = useDispatch();
  const { order_id } = useParams();

  useEffect(() => {
    dispatch(getSellersSingleOrders(order_id));
  }, [dispatch, order_id]);

  const { sellersSingleOrderInfo, isLoading } = useSelector(
    (state) => state.user
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const usersOrderData = sellersSingleOrderInfo?.[0];
  const userOrdrProd = sellersSingleOrderInfo?.[1];

  return (
    <div className="flex flex-wrap h-screen ">
      <div className="w-full lg:w-1/3 p-4 bg-white shadow-md rounded-md">
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="mb-2">
            <strong>Name:</strong> {usersOrderData?.[0]?.name}
          </div>
          <div className="mb-2">
            <strong>Mobile:</strong> {usersOrderData?.[0]?.mobile}
          </div>
          <div className="mb-2">
            <strong>Email:</strong> {usersOrderData?.[0]?.email}
          </div>
          <div className="mb-2">
            <strong>Address:</strong> {usersOrderData?.address}
          </div>
          <div className="mb-2">
            <strong>City:</strong> {usersOrderData?.[0]?.city}
          </div>
          <div className="mb-2">
            <strong>State:</strong> {usersOrderData?.[0]?.state}
          </div>
          <div className="mb-2">
            <strong>Zip Code:</strong> {usersOrderData?.[0]?.pincode}
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Payment Information</h2>
          <div className="mb-2 flex items-center">
            <AiOutlineDollarCircle className="mr-2" />
            <strong>Payment Method:</strong>{" "}
            {usersOrderData?.[0]?.payment_method}
          </div>
          <div className="mb-2 flex items-center">
            {usersOrderData?.[0]?.payment_status === "Paid" ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : (
              <FaTimesCircle className="text-red-500 mr-2" />
            )}
            <strong>Status:</strong> {usersOrderData?.[0]?.payment_status}
          </div>
          <div className="mb-2">
            <strong>Total Price:</strong> ${usersOrderData?.[0]?.amount}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/3 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Order Products</h2>
        {userOrdrProd?.map((product, index) => (
          <div key={index} className="flex m-4 p-2">
            <Image src={product?.image} width={100}></Image> 
            <div className="ms-3">
              <h3 className="text-lg font-semibold">{product?.title}</h3>
              <div className="text-gray-600">
                <strong>Price:</strong> ${product?.price}
              </div>
              <div className="text-gray-600">
                <strong>Quantity:</strong> {product?.quantity}
              </div>
              <div className="text-gray-600">
                <strong>Color:</strong> {product?.color_code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerSingleOrder;
