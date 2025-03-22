import React from "react";
import { Rate } from "antd";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            // to={`/products/${item?.product_id}`}
            onClick={() => {
              navigate(`/products/${item?.product_id}`);
            }}
            key={index}
            class="product-card  rounded-lg border relative border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            {item?.tag_active ? (
              <div
                className={`bg-red-500 shadow-lg rounded-lg p-1 absolute text-white right-0 top-0 shine`}
                style={{ backgroundColor: item?.product_tag_color }}
              >
                {item?.product_tag}
              </div>
            ) : null}

            <div class="h-1/2 w-full">
              <a>
                <img
                  class="mx-auto h-full dark:hidden rounded-lg"
                  alt=""
                  src={item?.image}
                />
                <img
                  class="mx-auto hidden h-full dark:block rounded-lg"
                  alt=""
                  src={item?.image}
                />
              </a>
            </div>
            <div className="pt-3">
              <Rate defaultValue={item?.avg_rating} />
            </div>
            <div class="pt-3">
              <a
                className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white 
              truncate block w-full"
              >
                {item?.title}
              </a>

              <div class="mt-2 flex items-center gap-2">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400"></p>
              </div>

              <div class="mt-1 flex items-center justify-between gap-4">
                <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                  ${item?.price}
                </p>
              </div>

              <div
                className="product-description text-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: item?.description,
                }}
              ></div>

              <div className="pt-2">
                <div className="flex items-center space-x-1">
                  <TbTruckDelivery style={{ height: "20px" }} />
                  <p className="text-sm">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
