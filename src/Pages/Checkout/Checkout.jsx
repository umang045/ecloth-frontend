import React, { useEffect, useState } from "react";
import { Modal, Button, Input, message, Image, Select } from "antd";
import { UploadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  addUsersAddress,
  deleteUsersAddress,
  getSingleUser,
  getUsersAddress,
  getUsersCart,
  placeUsersOrder,
} from "../../Feature/User/UserSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  //sarkari declaration
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //google map & address declaration
  const [markers, setMarkers] = useState([]);
  const [address_id, setAddressId] = useState(null);

  //payment declaration
  const [payment_method, setPayment_method] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  //***********************Fetch Start********************** */

  useEffect(() => {
    dispatch(getSingleUser());
    dispatch(getUsersAddress());
    dispatch(getUsersCart());
  }, [dispatch]);

  const { userInfo, usersAddress, usersCart } = useSelector(
    (state) => state?.user,
    shallowEqual
  );

  //fetch address and set markers on google map
  useEffect(() => {
    if (userInfo && usersAddress) {
      setMarkers(
        usersAddress.map((address) => ({ lat: address.lat, lng: address.lng }))
      );
    }
  }, [usersAddress]);

  //fetch cart for checkout
  useEffect(() => {
    if (usersCart) {
      const total = usersCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setTotalAmount(total);
    }
  }, [usersCart]);

  //***********************Fetch End********************** */

  //***********************Goodle Map & Location Start********************** */

  const onMapClick = async (event) => {
    if (markers.length >= 3) {
      toast.info("You can add only three locations");
      return;
    }
    const position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkers([...markers, position]);
    const address = await getLocationDetail(position.lat, position.lng);
    dispatch(addUsersAddress(address)).then(async () => {
      toast.success("address added!!");
      await dispatch(getUsersAddress());
    });
  };

  //input -> lat & lng ||  output -> location details
  const getLocationDetail = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    try {
      const { data } = await axios.get(url);
      return {
        country: data.address.country,
        state: data.address.state,
        city: data.address.state_district,
        pincode: data.address.postcode,
        lat,
        lng,
      };
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch address details");
    }
  };

  //delete address & remove markers
  const handleDeleteAddress = async (address_id) => {
    try {
      await dispatch(deleteUsersAddress(address_id));
      await dispatch(getUsersAddress());
    } catch (error) {
      console.log(error);
    }
  };

  //set address id for checkout
  const handleAddressId = (aId) => {
    setAddressId(address_id == aId ? null : aId);
  };

  //***********************Goodle Map & Location End********************** */

  //***********************Payment With Razor Pay Start********************** */

  //set whether payment is online or cash... & set useState
  const handlePaymentChange = (value) => {
    setPayment_method(value);
  };

  // check condition to show payment method
  const handlePlaceOrder = () => {
    // console.log('');
    if (address_id == null) {
      toast.info("Select Address First!!");
      return;
    }
    if (payment_method == null) {
      toast.info("Please Select Payment methods!!");
      return;
    }
    if (payment_method == "online") {
      initializeRazorpay();
    } else {
      dispatch(
        placeUsersOrder({
          payment_method: payment_method,
          address_id: address_id,
          payment_status: "pending",
        })
      )
        .then(() => {
          toast.success("Order Placed Successfully");
          navigate("/orders");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something Went Wrong!!");
        });
    }
  };

  // operation of  razor pay after payment succes
  const handleRazorpaySuccess = async (response) => {
    try {
      // Handle successful payment here
      const orderData = {
        payment_method: payment_method,
        address_id: address_id,
        payment_status: "Finished",
      };
      // console.log(orderData);
      await dispatch(placeUsersOrder(orderData))
        .then(() => {
          toast.success("Order Placed Successfully");
          navigate("/orders");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something Went Wrong!!");
        });
    } catch (error) {
      console.error(error);
      toast.error("Error placing order");
    }
  };

  //razor pay implementation
  const initializeRazorpay = () => {
    const options = {
      key: "rzp_test_rsW4Snw7J4ty0R",
      amount: totalAmount * 100,
      currency: "INR",
      name: "E-Cloth Payments",
      description: "Sample Razorpay demo",
      image: "https://i.imgur.com/FApqk3D.jpeg",
      handler: handleRazorpaySuccess,
      theme: {
        color: "#6466e3",
      },
      modal: {
        ondismiss: () => {
          console.log("Payment dismissed");
        },
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  //***********************Payment With Razor Pay End********************** */
  return (
    <>
      <div className="w-full h-auto bg-gray-50 flex gap-3 p-5">
        <div className="w-1/2 border p-2">
          <LoadScript googleMapsApiKey="AIzaSyDyRgEnNYrrkDqnJNETjacyPv0AR39uM6c">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "600px" }}
              center={{ lat: 23.0225, lng: 72.5714 }}
              zoom={12}
              onClick={onMapClick}
            >
              {markers.map((marker, index) => (
                <Marker key={index} position={marker} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="w-1/2 border p-3">
          <div>Your Addresses</div>
          {usersAddress?.map((item, index) => (
            <div
              onClick={() => {
                handleAddressId(item?.address_id);
              }}
              key={index}
              className={`flex w-full flex-col h-auto bg-gray-200 rounded-lg relative p-2 my-2 ${
                address_id == item?.address_id
                  ? "bg-gray-900 text-white"
                  : "hover:border border-gray-900"
              } `}
              // className="flex w-full flex-col h-auto bg-gray-200 rounded-lg relative p-2 my-2"
            >
              <div className="w-full justify-evenly h-auto pb-0 flex gap-1">
                <p>Country: {item?.country}</p>
                <p>State: {item?.state}</p>
              </div>
              <div className="w-full flex justify-evenly">
                <p>City: {item?.city}</p>
                <p>Pincode: {item?.pincode}</p>
              </div>
              <div className="w-10 gap-2 h-8 flex items-center justify-center cursor-pointer bg-gray-100 rounded-lg absolute right-0 top-1/2 transform -translate-y-1/2">
                <DeleteOutlined
                  style={{ color: "red" }}
                  onClick={() => handleDeleteAddress(item?.address_id)}
                />
              </div>
            </div>
          ))}
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
            <span className="text-lg font-bold">${totalAmount + 5}</span>
          </div>
          <div className="w-full">
            <div>Select Payment</div>
            <Select
              defaultValue="select"
              style={{ width: "100%" }}
              onChange={handlePaymentChange}
              options={[
                { value: "online", label: "Pay Online" },
                { value: "Cash On Delivery", label: "Cash On Delivery" },
                {
                  value: "select",
                  label: "select Payment method",
                  disabled: true,
                },
              ]}
            />
          </div>
          <Button
            className="w-full p-3 mt-5 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
            onClick={() => {
              handlePlaceOrder();
            }}
          >
            {payment_method == "online" ? "Pay online" : "Place Order"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
