import { adminGetAllUsers } from "@/Feature/User/UserSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

const AdminSellerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //**************************Fetch Start ************************************ */

  useEffect(() => {
    dispatch(adminGetAllUsers());
  }, [dispatch]);

  const { adminUserList } = useSelector((state) => state?.user);
  //**************************Fetch End ************************************ */

  //define column for ant table
  const columns = [
    {
      title: "Seller ID",
      dataIndex: "user_id",
      key: "user_id",
      className: "py-2 px-4",
    },
    {
      title: " Name",
      dataIndex: "name",
      key: "name",
      className: "py-2 px-4",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "py-2 px-4",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      className: "py-2 px-4",
    },
  ];

  return (
    <>
      <div className="container mx-auto p-4  bg-gray-50">
        <h1 className="text-2xl font-bold mb-4"> Seller List</h1>
        <Table
          columns={columns}
          dataSource={adminUserList?.[0]}
          rowKey="order_id"
          pagination={true}
          className="bg-white"
        />
      </div>
    </>
  );
};

export default AdminSellerList;
