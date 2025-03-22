import { adminGetAllProducts } from "@/Feature/Products/ProductSlice";
import { Image, Switch, Table } from "antd";
import React, { useEffect } from "react";
import { FaEdit, FaListAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //************************Fetch Start **************************** */

  useEffect(() => {
    dispatch(adminGetAllProducts());
  }, [dispatch]);

  const { adminProductList, isLoading } = useSelector(
    (state) => state?.products
  );

  //************************Fetch End **************************** */

  //define column for table
  const columns = [
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
      className: "py-2 px-4",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      className: "py-2 px-4",
      render: (text, record) => (
        <>
          <Image src={text} width={50} height={50} />
        </>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "py-2 px-4",
      render: (text, record) => <>{text.substr(0, 20) + "..."}</>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: "py-2 px-4",
      render: (text, record) => <>{text.substr(0, 20) + "..."}</>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      className: "py-2 px-4",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      className: "py-2 px-4",
    },
    {
      title: "isActive",
      dataIndex: "is_active",
      key: "is_active",
      className: "py-2 px-4",
      render: (text, record) => (
        <>
          <Switch value={text} disabled></Switch>
        </>
      ),
    },
    {
      title: "Transactions",
      key: "transaction",
      className: "py-2 px-4",
      render: (text, record) => (
        <>
          <div
            className="cursor-pointer align-middle"
            onClick={() => {
              navigate(`transaction/${record?.product_id}`);
            }}
          >
            <FaListAlt size={20} color="green" />
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="container mx-auto p-4  bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">My Products</h1>
        <Table
          columns={columns}
          dataSource={adminProductList}
          rowKey="order_id"
          pagination={true}
          className="bg-white"
        />
      </div>
    </>
  );
};

export default AdminProductList;
