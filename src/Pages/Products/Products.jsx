import ProductCard from "@/Components/ProductCard/ProductCard";
import {
  getAllFilterProducts,
  getAllProductCount,
  getAllProductsCategory,
  getAllProductsColor,
} from "@/Feature/Products/ProductSlice";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Slider, Pagination } from "antd";
import Loading from "@/Components/Loading/Loading";
import NoProductsGif from "../../../public/NoProducts.gif";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();

  //******************filter start ************************ */

  //handle filter product state & change function
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [sortOption, setSortOption] = useState("latest");
  const [productsList, setSortption] = useState([]);

  const [totalPage, setTotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  //set min-max value for products filter
  const handleMinMaxValue = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  //set category id for filter
  const handleCategoryId = (id) => {
    selectedCategoryId == id
      ? setSelectedCategoryId(null)
      : setSelectedCategoryId(id);
  };

  //set color id for filter
  const handleColorId = (id) => {
    selectedColorId == id ? setSelectedColorId(null) : setSelectedColorId(id);
  };

  //set sort option for filter
  const handleSortOption = (option) => {
    setSortOption(option);
  };

  //********************filter End********************* */

  //********************fetch start********************* */

  //fetch products colors and category
  useEffect(() => {
    dispatch(
      getAllFilterProducts({
        selectedCategoryId,
        minPrice,
        maxPrice,
        selectedColorId,
        sortOption,
        currentPage,
      })
    );
    dispatch(getAllProductsCategory());
    dispatch(getAllProductsColor());
    dispatch(getAllProductCount());
  }, [
    selectedCategoryId,
    minPrice,
    totalPage,
    maxPrice,
    selectedColorId,
    sortOption,
    currentPage,
    dispatch,
  ]);

  const { isLoading, productList, colorList, categoryList, totalProducts } =
    useSelector((state) => state.products, shallowEqual);

  useEffect(() => {
    setTotalPage(Math.ceil(totalProducts?.[0]?.count / 10));
  }, [totalProducts, dispatch]);

  //********************fetch End********************* */

  return (
    <>
      {productList?.length == 0 ? (
        <>
          <div className="flex flex-col justify-center items-center lg:flex-row lg:space-x-10 p-6 bg-white min-h-screen">
            <div className="flex flex-col items-center">
              <div class="text-2xl flex flex-col font-semibold text-gray-900 mt-4 ">
                !! No Product Found !!
              </div>
              <div className="w-100 h-100">
                <img
                  src={NoProductsGif}
                  alt="Empty Cart"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </>
      ) : ( 
        <>
          <section className="bg-gray-50  antialiased dark:bg-gray-900 md:py-12">
            <div className="mx-auto max-w-screen-xl 2xl:px-0">
              <div className="items-end justify-between  sm:flex sm:space-y-0 md:mb-8">
                <div>
                  <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Make Your Own style
                  </h2>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
                    onChange={(e) => {
                      handleSortOption(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Sort
                    </option>
                    <option value="latest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price_asc">Increasing Price</option>
                    <option value="price_desc">Descreasing Price</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex w-full items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Filters
                    </h2>
                    <button
                      className="bg-gray-900 text-white p-1 rounded-lg"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Clear All Filter
                    </button>{" "}
                  </div>

                  <div className="mt-4 ">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Category
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2 justify-between">
                      {categoryList?.map((item, index) => {
                        return (
                          <button
                            onClick={() => {
                              handleCategoryId(item?.category_id);
                            }}
                            key={index}
                            className={`${
                              selectedCategoryId == item?.category_id
                                ? "bg-gray-900 text-white"
                                : "bg-gray-50 text-gray-800"
                            } border border-gray-900 p-2 rounded-lg hover:bg-gray-900 hover:text-white`}
                          >
                            {item?.category_name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Price
                    </h3>
                    <Slider
                      range
                      step={10}
                      min={0}
                      max={1000}
                      defaultValue={[200, 500]}
                      onChange={handleMinMaxValue}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Colors
                    </h3>
                    <div className="flex gap-1 flex-wrap">
                      {colorList?.map((item, index) => {
                        return (
                          <button
                            key={index}
                            className={`w-8 h-8 cursor-pointer mt-2 border-2 ${
                              selectedColorId === item?.color_id
                                ? "border-red-700"
                                : "border-transparent"
                            } hover:border-red-700`}
                            style={{
                              borderRadius: "50%",
                              backgroundColor: item?.color_code,
                            }}
                            onClick={() => {
                              handleColorId(item?.color_id);
                            }}
                          ></button>
                        );
                      })}
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400"></div>
                  </div>
                </div>

                <div className="col-span-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  <ProductCard data={productList ? productList : []} />
                </div>
              </div>

              <div className="w-full text-center flex items-center mt-2 justify-center">
                <Pagination
                  defaultCurrent={1}
                  total={totalPage}
                  pageSize={1}
                  onChange={(page) => {
                    setCurrentPage(page);
                  }}  
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Products;
