import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adminGetAllTotalSell,
  getAllSellersOrders,
  GetTotalUsers,
  sellerGetAllTotalProducts,
  sellerTotalOrderStatus,
} from "../../../Feature/User/UserSlice";

const SellerHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //***************************Fetch Start ***************/

  useEffect(() => {
    dispatch(adminGetAllTotalSell());
    dispatch(sellerGetAllTotalProducts());
    dispatch(GetTotalUsers());
    dispatch(sellerTotalOrderStatus());
    dispatch(getAllSellersOrders());
  }, [dispatch]);

  const {
    adminTotalSell,
    sellerTotalProducts,
    totalUsers,
    sellerOrderCount,
    sellersOrderList,
  } = useSelector((state) => state?.user, shallowEqual);
  //***************************Fetch End ***************/

  //declare bar chart static data
  const barData = [
    { id: "January", value: 6500 },
    { id: "Feb", value: 5900 },
    { id: "March", value: 8000 },
    { id: "April", value: 8100 },
    { id: "May", value: 5600 },
    { id: "June", value: 5500 },
    { id: "July", value: 7000 },
    { id: "August", value: 7200 },
    { id: "Sep", value: 6800 },
    { id: "October", value: 7500 },
    { id: "Nov", value: 6900 },
    { id: "December", value: 8000 },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Dashboard Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="mt-2 text-3xl">${adminTotalSell?.sell}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="mt-2 text-3xl">{adminTotalSell?.orders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="mt-2 text-3xl">
            {sellerTotalProducts?.totalSellerProd}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="mt-2 text-3xl">{totalUsers?.[0]?.totalusers}</p>
        </div>
      </div>

      <div
        className="w-full flex items-center justify-center mb-6"
        style={{ height: "400px" }}
      >
        <div className="w-1/2">
          <h1 className="text-2xl font-bold">Sales Overview</h1>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: barData.map((d) => d.id),
                title: "Months",
              },
            ]}
            series={[{ data: barData.map((d) => d.value), label: "Sales ($)" }]}
            width={600}
            height={300}
          />
        </div>
        <div
          className="w-1/2 flex flex-col pt-8 items-center justify-center"
          style={{ height: "400px" }}
        >
          <h1 className="text-2xl font-bold">Order Overview</h1>
          {sellerOrderCount && (
            <PieChart
              series={[
                {
                  data: sellerOrderCount && sellerOrderCount,
                },
              ]}
              width={600}
              height={200}
            />
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Customer</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {sellersOrderList?.slice(-5)?.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item?.order_id}</td>
                  <td className="py-2 px-4 border-b">{item?.name}</td>
                  <td className="py-2 px-4 border-b">{item?.order_date}</td>
                  <td className="py-2 px-4 border-b">
                    <span className=" py-1 px-3 rounded-full text-xs">
                      {item?.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">${item?.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerHomePage;
