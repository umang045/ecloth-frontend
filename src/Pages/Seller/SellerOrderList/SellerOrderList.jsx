import { getAllSellersOrders } from "../../../Feature/User/UserSlice";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { FaEye } from "react-icons/fa";
import classNames from "classnames";
import "./SellerOrderList.css";

const SellerOrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sellerNewOrderList, setSellerNewOrderList] = useState([]);

  //***************************Fetch Start*********************/

  const fetchSellersOrder = async () => {
    const res = await dispatch(getAllSellersOrders());
  };

  useEffect(() => {
    fetchSellersOrder();
  }, [dispatch]);

  const { sellersOrderList } = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    setSellerNewOrderList(
      sellersOrderList?.filter(
        (order, index, self) =>
          index == self?.findIndex((o) => o.order_id === order.order_id)
        // console.log(self , order , index)
      )
    );
  }, [sellersOrderList, dispatch]);
  // console.log(sellerNewOrderList);

  //***************************Fetch End*********************/

  //define column for antd table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      className: "py-2 px-4",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
      className: "py-2 px-4",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      className: "py-2 px-4",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      className: "py-2 px-4",
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
      title: "View Detail   ",
      key: "action",
      className: "py-2 px-4",
      render: (text, record) => (
        <>
          <div className=" cursor-pointer ">
            <FaEye
              color="blue"
              size={20}
              onClick={() => {
                navigate(`/seller/sellerOrderList/${record?.order_id}`);
              }}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4  bg-gray-50">
      <h1 className="text-2xl font-bold mb-4"> Order List</h1>
      <Table
        columns={columns}
        dataSource={sellerNewOrderList}
        rowKey="order_id"
        pagination={true}
        className="bg-white"
      />
    </div>
  );
};

export default SellerOrderList;
