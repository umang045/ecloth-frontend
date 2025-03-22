import { adminGetAllOrderList } from "@/Feature/User/UserSlice";
import { Table } from "antd";
import classNames from "classnames";
import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AdminOrder.css";

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //***************fetch Admin Order Start **************************************** */

  useEffect(() => {
    dispatch(adminGetAllOrderList());
  }, [dispatch]);

  const { adminOrderList, isLoading } = useSelector((state) => state?.user);

  //***************fetch Admin Order End **************************************** */

  //define column for table
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
                navigate(`/superadmin/adminOrderList/${record?.order_id}`);
              }}
            />
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      {" "}
      <div className="container mx-auto p-4  bg-gray-50">
        <h1 className="text-2xl font-bold mb-4"> Order List</h1>
        <Table
          columns={columns}
          dataSource={adminOrderList}
          rowKey="order_id"
          pagination={true}
          className="bg-white"
        />
      </div>
    </>
  );
};

export default AdminOrderPage;
