import React, { useEffect, useState } from "react";
import { Modal, Button, Input, message, Image } from "antd";
import { UploadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  addUsersAddress,
  deleteUsersAddress,
  getSingleUser,
  getUsersAddress,
  userUpdateProdilePic,
} from "@/Feature/User/UserSlice";
import { toast } from "react-toastify";
import {
  updateProfile,
  updateUserPasswordFromProfile,
} from "@/Feature/Auth/AuthSlice";
import {
  deleteImgFromCloudinary,
  uploadImgToCloudinary,
} from "@/Feature/Products/ProductSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [cloudImagePublicId, setCloudImagePublicId] = useState(null);
  const [profileImgUrl, setProfileImgUrl] = useState(
    "https://via.placeholder.com/150"
  );

  const [markers, setMarkers] = useState([]);

  const openPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const handlePasswordModalOk = () => {
    setIsPasswordModalVisible(false);
  };

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    // Delete old image if it exists
    if (cloudImagePublicId) {
      await dispatch(deleteImgFromCloudinary(cloudImagePublicId));
    }

    // Wait for image upload to complete
    const res = await dispatch(uploadImgToCloudinary(formData));

    if (uploadImgToCloudinary.fulfilled.match(res)) {
      const uploadedImage = res.payload?.data;
      if (uploadedImage) {
        setProfileImgUrl(uploadedImage.url);
        setCloudImagePublicId(uploadedImage.public_id);

        // Now update profile picture only after upload is complete
        await dispatch(
          userUpdateProdilePic({
            profile_pic: uploadedImage.url,
            img_public_id: uploadedImage.public_id,
          })
        );

        await dispatch(getSingleUser());

        toast.success("Profile picture updated successfully!");
      }
    } else {
      toast.error("Image upload failed!");
    }
  };

  const openAddressDialog = () => {
    setIsAddressModalVisible(true);
  };

  const handleAddressModalOk = () => {
    setIsAddressModalVisible(false);
  };

  const handleAddressModalCancel = () => {
    setIsAddressModalVisible(false);
  };

  const handleDeleteAddress = async (address_id) => {
    try {
      //   console.log(address_id);

      await dispatch(deleteUsersAddress(address_id));
      await dispatch(getUsersAddress());
    } catch (error) {
      console.log(error);
    }
  };

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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This is required!"),
    email: Yup.string().email("Invalid email").required("This is required!"),
    mobile: Yup.string().required("This is required!"),
  });

  useEffect(() => {
    dispatch(getSingleUser());
    dispatch(getUsersAddress());
  }, [dispatch]);

  const { userInfo, usersAddress } = useSelector(
    (state) => state?.user,
    shallowEqual
  );

  const { uploadImageToCloud } = useSelector(
    (state) => state?.products,
    shallowEqual
  );

  useEffect(() => {
    setCloudImagePublicId(uploadImageToCloud?.data?.public_id);
    setProfileImgUrl(uploadImageToCloud?.data?.url);
  }, [dispatch, uploadImageToCloud]);

  useEffect(() => {
    // setCloudImagePublicId(user)
    setCloudImagePublicId(userInfo?.img_public_id);
    setProfileImgUrl(userInfo?.img_url);
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (userInfo && usersAddress) {
      setMarkers(
        usersAddress.map((address) => ({ lat: address.lat, lng: address.lng }))
      );
    }
  }, [usersAddress]);

  return (
    <div className="w-full h-auto py-24 bg-gray-50 flex gap-3 p-5">
      <div className="w-1/3 bg-gray-100 h-auto rounded-lg flex flex-col gap-1 items-center justify-center shadow-md">
        <div className="text-lg font-bold text-gray-900">Your Profile</div>
        <div>
          <Image width={200} src={userInfo?.profile_pic} />
        </div>
        <div>
          <input type="file" onChange={handleFile} />
        </div>
      </div>
      <div className="w-full flex bg-gray-100 h-auto rounded-lg p-2 shadow-md">
        <div className="w-1/2 p-3">
          <Formik
            enableReinitialize
            initialValues={{
              name: userInfo?.name || " ",
              email: userInfo?.email || " ",
              mobile: userInfo?.mobile || " ",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              dispatch(updateProfile(values)).then(() => {
                toast.success("Profile Updated Succesfully!!");
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex items-center justify-center">
                <div className="w-full flex m-auto flex-col flex-wrap gap-4 box-border items-center justify-center">
                  <div className="mb-5 w-full">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-700"
                    />
                  </div>
                  <div className="mb-5 w-full">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-700"
                    />
                  </div>
                  <div className="mb-5 w-full">
                    <label
                      htmlFor="mobile"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Mobile
                    </label>
                    <Field
                      type="text"
                      name="mobile"
                      id="mobile"
                      className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-700"
                    />
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={`w-full ${
                      isSubmitting ? "bg-gray-400" : "bg-gray-900"
                    } text-white`}
                    disabled={isSubmitting}
                  >
                    Update Profile
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="w-1/2 flex flex-col items-center gap-2 p-2">
          <div className="w-1/2">
            <Button
              type="primary"
              onClick={openPasswordModal}
              className="w-full bg-gray-900 text-white"
            >
              Update Password
            </Button>
          </div>
          <div className="w-1/2">
            <Button
              type="primary"
              onClick={openAddressDialog}
              className="w-full bg-gray-900 text-white"
            >
              + Address
            </Button>
          </div>
          <div className="w-full h-full flex flex-col gap-1 items-center text-gray-900 p-1">
            <div>Your Addresses</div>
            {usersAddress?.map((item, index) => (
              <div
                key={index}
                className="flex w-full flex-col h-auto bg-gray-200 rounded-lg relative p-2 my-2"
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
                  <EyeOutlined onClick={openAddressDialog} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        title="Update Password"
        visible={isPasswordModalVisible}
        onOk={handlePasswordModalOk}
        onCancel={handlePasswordModalCancel}
        footer=" "
      >
        <Formik
          initialValues={{ oldPassword: "", newPassword: "" }}
          validationSchema={Yup.object().shape({
            oldPassword: Yup.string().required("This is required!"),
            newPassword: Yup.string().required("This is required!"),
          })}
          onSubmit={async (values) => {
            const res = await dispatch(updateUserPasswordFromProfile(values));
            if (updateUserPasswordFromProfile.fulfilled.match(res)) {
              toast.success("PassWord Updated!!");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-5">
                <label
                  htmlFor="oldPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Old Password
                </label>
                <Field
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-700"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="bg-gray-50 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-700"
                />
              </div>
              <Button
                type="primary"
                htmlType="submit"
                className={`w-full ${
                  isSubmitting ? "bg-gray-400" : "bg-gray-900"
                } text-white`}
                disabled={isSubmitting}
              >
                Update Password
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        title="Add Address"
        visible={isAddressModalVisible}
        onOk={handleAddressModalOk}
        onCancel={handleAddressModalCancel}
        width={800}
        footer=" "
      >
        <LoadScript googleMapsApiKey="AIzaSyDyRgEnNYrrkDqnJNETjacyPv0AR39uM6c">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={{ lat: 23.0225, lng: 72.5714 }}
            zoom={12}
            onClick={onMapClick}
          >
            {markers.map((marker, index) => (
              <Marker key={index} position={marker} />
            ))}
          </GoogleMap>
        </LoadScript>
      </Modal>
    </div>
  );
};

export default Profile;
