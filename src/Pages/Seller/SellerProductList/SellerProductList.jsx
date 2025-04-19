import {
  deleteSellerProduct,
  getAllSellersProducts,
  toogleSellerProduct,
} from "../../../Feature/Products/ProductSlice";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Table, Drawer, Timeline, Button, Image, Switch } from "antd";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEdit, FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SellerProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//active and inactive product 
  const handleActiveInactive = async (product_id) => {
    await dispatch(toogleSellerProduct(product_id));
    await dispatch(getAllSellersProducts());
  };

  //delete product
  const handleDeleteSellerProd = async (product_id) => {
    const cnfrm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (cnfrm) {
      await dispatch(deleteSellerProduct(product_id)).then(() => {
        toast.success("product Deleted!!");
      });
      await dispatch(getAllSellersProducts());
    }
  };

  //get all seller products
  const getAllSellersProductsFunc = async () => {
    await dispatch(getAllSellersProducts());
  };

  useEffect(() => {
    getAllSellersProductsFunc();
  }, [dispatch]);

  const { sellerProductList } = useSelector(
    (state) => state.products,
    shallowEqual
  );

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
          {/* {console.log(text)} */}
          <Switch
            value={text}
            onChange={() => {
              handleActiveInactive(record?.product_id);
            }}
          ></Switch>
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
            className="cursor-pointer align-middle "
            onClick={() => {
              navigate(`transaction/${record?.product_id}`);
            }}
          >
            <FaListAlt size={20} color="green" />
          </div>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      className: "py-2 px-4",
      render: (text, record) => (
        <>
          <div className="flex cursor-pointer gap-2">
            <FaEdit
              size={20}
              color="blue"
              onClick={() => {
                navigate(`${record?.product_id}`, { state: record });
              }}
            />{" "}
            |
            <MdDelete
              size={20}
              color="red"
              onClick={() => {
                handleDeleteSellerProd(record?.product_id);
              }}
            />
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
          dataSource={sellerProductList}
          rowKey="order_id"
          pagination={true}
          className="bg-white"
        />
      </div>
    </>
  );
};

export default SellerProductList;
