import React from "react";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <div
        onClick={() => {
          handleNavigate(data?.product_id);
        }}
        className="bg-gray-50 text-gray-950 border rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative shadow-lg"
      >
        <div className="mb-4 bg-gray-100 rounded p-2">
          <img
            src={data?.image}
            alt="Product 2"
            className="aspect-[33/35] w-full object-contain"
          />
        </div>

        <div className="mt-4 px-5 pb-5">
          <Rate disabled defaultValue={data?.avg_rating} />
          <a href="#">
            <h5 className="text-xl tracking-tight ">
              {data?.title.substring(0, 25) + "..."}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-xl font-bold ">${data?.price}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
