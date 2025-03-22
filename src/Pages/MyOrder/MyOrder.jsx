import React, { useEffect, useState } from "react";
import { Table, Drawer, Timeline, Button, Image } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  cancleUsersOrder,
  getSingleUsersOrders,
  getUsersOrders,
  getUsersOrdersPaymentDetails,
} from "@/Feature/User/UserSlice";
import "./MyOrder.css";
import { toast } from "react-toastify";
import { GiCash } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { MdBookOnline } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const MyOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //*************************Drawer Start *************** */
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  // const [order]

  const showModal = (orderId) => {
    setIsVisible(true);
  };

  const cancelUserOrder = async (orderId) => {
    const cnfrm = window.confirm("Are you sure you want to cancel this order?");
    if (cnfrm) {
      const res = await dispatch(
        cancleUsersOrder({ status: "Cancelled", order_id: orderId })
      );
      await dispatch(getUsersOrders());
      if (cancleUsersOrder.fulfilled.match(res)) {
        toast.success("Your order Cancle Succesfully!!");
      }
    }
  };

  const closeDrawer = () => {
    setIsVisible(false);
  };

  //*************************Drawer End *************** */

  //*************************Fetch Start *************** */

  //fetch all orders of user
  useEffect(() => {
    dispatch(getUsersOrders());
  }, [dispatch]);

  //fetch single order of user
  const handleSingleUsersOrder = async (order_id) => {
    await dispatch(getSingleUsersOrders(order_id))
      .then(() => {})
      .catch((err) => {
        console.log("Error", err);
      });
    await dispatch(getUsersOrdersPaymentDetails(order_id));
  };

  const { usersOrderList, singleOrderDetails, orderPaymentDetails, isLoading } =
    useSelector((state) => state.user);
  // console.log(orderPaymentDetails);

  //*************************Fetch End *************** */

  //*************************Timeline start  *************** */

  const getTimelineItems = () => {
    const stages = [
      { status: "pending", label: "Pending", color: "yellow" },
      { status: "Dispatched", label: "Dispatched", color: "blue" },
      { status: "Out For Delivery", label: "Out for Delivery", color: "gray" },
      { status: "Delivered", label: "Delivered", color: "green" },
      { status: "Cancelled", label: "Cancelled", color: "red" },
    ];
    const currentIndex = stages.findIndex(
      (stage) => stage.status === selectedOrderStatus
    );
    return stages.slice(0, currentIndex + 1);
  };
  //*************************Timeline End *************** */

  //declare columns for table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      className: "py-2 px-4",
    },
    {
      title: "Order Date",
      dataIndex: "created_at",
      key: "created_at",
      className: "py-2 px-4",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Price",
      dataIndex: "amount",
      key: "amount",
      className: "py-2 px-4",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "py-2 px-4",
      render: (status) => (
        <p
          className={classNames("inline-block p-1 rounded-md", {
            "status-pending": status === "pending",
            "status-dispatch": status === "Dispatched",
            "status-delivered": status === "Delivered",
            "status-intransit": status === "Out For Delivery",
            "status-cancelled": status === "Cancelled",
          })}
        >
          {status}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      className: "py-2 px-4",
      render: (text, record) => (
        <>
          <div className="flex items-center gap-3">
            <FaEye
              color="blue"
              size={20}
              onClick={() => {
                showModal();
                handleSingleUsersOrder(record.order_id);
                setSelectedOrderStatus(record.status);
              }}
            />{" "}
            |
            {record.status !== "Delivered" && record.status !== "Cancelled" && (
              <TiDelete
                color="red"
                size={30}
                onClick={() => cancelUserOrder(record.order_id)}
              />
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4 h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <Table
        columns={columns}
        dataSource={usersOrderList}
        rowKey="order_id"
        pagination={true}
        className="bg-white"
      />
      <Drawer
        closable={false}
        open={isVisible}
        size="large"
        placement="right"
        title="Your Orders"
        onClose={closeDrawer}
        className="bg-gray-50"
      >
        <div className="w-full flex flex-col gap-1">
          <div className="w-full">
            <h2 className="text-lg flex gap-3 items-center font-bold mb-2">
              {" "}
              <GiCash size={30} /> Payment Details :{" "}
            </h2>
            {orderPaymentDetails && (
              <>
                <div className="flex items-center gap-2 m-4 text-lg">
                  <p className="flex font-bold items-center gap-2">
                    <BsCashCoin size={30} /> Total Amount : $
                    {orderPaymentDetails[0]?.amount}
                  </p>
                  <p className="flex gap-2 font-bold items-center">
                    <MdBookOnline size={30} />
                    Payment Method : {orderPaymentDetails[0]?.payment_method}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex w-full">
            <div className="1/2">
              {singleOrderDetails?.map((item) => (
                <div
                  key={item?.title}
                  className="max-w-sm mx-auto cursor-pointer p-4 mt-2 bg-white rounded-lg shadow-lg flex items-center space-x-4"
                >
                  <Image width={50} src={item?.image} />
                  <div
                    onClick={() => {
                      navigate(`/products/${item?.product_id}`);
                    }}
                    className="flex-1"
                  >
                    <div className="text-lg font-semibold">
                      {item?.title.substr(1, 30) + "..."}
                    </div>
                    <div className="text-gray-500">${item?.price}</div>
                    <div className="text-gray-900">
                      Quantity: {item?.quantity}
                    </div>
                    <div className="flex gap-2 items-center">
                      <p>Color : </p>
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: `${item?.color_code}` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="1/2 font-bold text-sm m-5">
              <h1>Order Status</h1>
              <Timeline
                tailWidth={2}
                pending={
                  selectedOrderStatus !== "Delivered" &&
                  selectedOrderStatus !== "Cancelled"
                    ? "Processing..."
                    : ""
                }
              >
                {getTimelineItems().map((item, index) => (
                  <Timeline.Item tailWidth={2} key={index} color={item.color}>
                    {item.label}
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </div>
        </div>
        {/* <div>
          <Button type="primary">Track On Google Map</Button>
        </div> */}
      </Drawer>
    </div>
  );
};

export default MyOrder;
