import { getSellersProductsTransaction } from "../../../Feature/Products/ProductSlice";
import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SellerProdTran = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product_id } = useParams();

  useEffect(() => {
    dispatch(getSellersProductsTransaction(product_id));
  }, [dispatch, product_id]);

  const { productTransactionInfo } = useSelector((state) => state?.products);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
      className: "py-2 px-4",
    },
    {
      title: "Transaction Time",
      dataIndex: "transaction_time",
      key: "transaction_time",
      className: "py-2 px-4",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Name",
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
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      className: "py-2 px-4",
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      className: "py-2 px-4",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      className: "py-2 px-4",
    },
  ];
  return (
    <>
      <div className="container mx-auto p-4  bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Product's Transactions</h1>
        <Table
          columns={columns}
          dataSource={productTransactionInfo}
          rowKey="order_id"
          pagination={true}
          className="bg-white"
        />
      </div>
    </>
  );
};

export default SellerProdTran;
