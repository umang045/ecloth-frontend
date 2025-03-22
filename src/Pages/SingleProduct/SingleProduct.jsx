import {
  addSingleProductsReviews,
  getSingleProduct,
  getSingleProductsReviews,
} from "@/Feature/Products/ProductSlice";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Collapse, Rate, Image } from "antd";
import ReactImageMagnify from "react-image-magnify";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { addToUsersCart, getUsersCart } from "@/Feature/User/UserSlice";
import Loading from "@/Components/Loading/Loading";
import { isLogin } from "@/utils/AxiosConfig";

let reviewSchema = yup.object({
  review: yup.string().required("Enter Some Review"),
  rating: yup.string().required("Give Ratting Please"),
});

export const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

  //********************Login Check start********************* */
  useEffect(() => {
    isLogin();
  }, [isLogin]);

  //********************Login Check End********************* */

  //********************Add To Cart Start********************* */

  const [quantity, setQuantity] = useState(1);
  const [colorId, setColorId] = useState(null);
  const [size, setSize] = useState(null);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount;
      if (newQuantity < 0) return 0;
      if (newQuantity > 10) return 10;
      return newQuantity;
    });
  };

  const handleColorId = (id) => {
    setColorId(colorId === id ? null : id);
  };

  const handleSize = (sz) => {
    setSize(size === sz ? null : sz);
    // console.log(size, sz);
  };

  const handleAddToCart = async () => {
    if (isLogin()) {
      if (size && colorId) {
        const res = await dispatch(
          addToUsersCart({
            p_id: id,
            color_id: colorId,
            qntyty: quantity,
            size: size,
          })
        );
        if (addToUsersCart.fulfilled.match(res)) {
          toast.success("Add To Cart Succesfully!!");
          dispatch(getUsersCart());
          setIsAlreadyAdded(true);
        }
      } else {
        toast.info("please select size & color!!");
      }
    } else {
      navigate("/login");
      toast.info("you need to login first!!");
    }
  };

  //********************Add To Cart End********************* */

  //*******************Check Item in Cart Start********************** */

  const { usersCart } = useSelector((state) => state.user, shallowEqual);
  useEffect(() => {
    const isProductInCart = usersCart?.some((item) => item?.product_id == id)
    setIsAlreadyAdded(isProductInCart);
  }, [usersCart, id]);

  // console.log(isAlreadyAdded);

  //*******************Check Item in Cart End********************** */

  //********************Add Review  Start ******************** */
  const formik = useFormik({
    initialValues: {
      review: "",
      productId: id,
      rating: 3,
    },
    validationSchema: reviewSchema,
    onSubmit: async (values) => {
      if (isLogin()) {
        let res = await dispatch(addSingleProductsReviews(values));
        if (addSingleProductsReviews.fulfilled.match(res)) {
          formik.resetForm();
          toast.success("Review Submited Succesfully!!");
          dispatch(getSingleProductsReviews(id));
        }
      } else {
        navigate("/login");
        toast.info("you need to login first");
      }
    },
  });
  //******************** Add  Review  End ******************** */

  //********************fetch Start********************* */

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getSingleProductsReviews(id));
  }, [dispatch, id]);

  const { isLoading, singleProduct, singleProductsReviewList } = useSelector(
    (state) => state.products,
    shallowEqual
  );

  //********************fetch End********************* */

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-6">
              {/* <div className="flex items-center"></div> */}
              <Link
                to={-1}
                className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-800"
              >
                Back
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-10">
              <div class="shrink-0 max-w-sm lg:max-w-sm mx-auto">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: `${singleProduct && singleProduct[0][0]?.title}`,
                      isFluidWidth: true,
                      src: `${singleProduct && singleProduct[0][0]?.image}`,
                    },
                    largeImage: {
                      src: `${singleProduct && singleProduct[0][0]?.image}`,
                      width: 1000,
                      height: 1000,
                    },
                  }}
                />
              </div>
              <div className="w-full lg:w-1/2 mt-6 lg:mt-0 text-gray-900">
                <h1 className="text-3xl font-bold">
                  {singleProduct && singleProduct[0][0]?.title}
                </h1>
                {/* <p className="text-2xl mt-2">${singleProduct[0][0]?.price}</p> */}
                <div className="mt-2 flex items-center gap-2">
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={
                      singleProduct && singleProduct[2][0]?.avg_rating
                    }
                  />
                  <span className=" text-gray-700">
                    {singleProduct &&
                      `${
                        singleProduct[2][0]?.total_review == undefined
                          ? 0
                          : singleProduct[2][0]?.total_review
                      }`}{" "}
                    Reviews
                  </span>
                </div>
                <div className="mt-2">
                  <Collapse
                    defaultActiveKey={["1"]}
                    size="small"
                    items={[
                      {
                        key: "1",
                        label: "Description",
                        children: (
                          <p
                            className="mt-4 text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: singleProduct?.[0][0]?.description,
                            }}
                          ></p>
                        ),
                      },
                    ]}
                  />
                </div>

                {!isAlreadyAdded ? (
                  <>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold">Colors</h3>
                      <div className="flex space-x-2 mt-2">
                        {singleProduct &&
                          singleProduct[1]?.map((color, index) => (
                            <div
                              onClick={() => {
                                handleColorId(color?.color_id);
                              }}
                              key={index}
                              className={`w-8 h-8 rounded-full border-2 ${
                                colorId === color?.color_id
                                  ? "border-gray-900"
                                  : "border-gray-300 hover:border-gray-500"
                              }`}
                              style={{
                                backgroundColor: `${color?.color_code}`,
                              }}
                            ></div>
                          ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold">Size</h3>
                      <div className="flex space-x-2 mt-2">
                        {singleProduct &&
                          singleProduct[0][0]?.size?.map((item, index) => (
                            <button
                              key={index}
                              className={`px-3 py-1 rounded-md ${
                                size === item
                                  ? "bg-gray-900 text-white"
                                  : "bg-gray-200 hover:bg-gray-300"
                              }`}
                              onClick={() => {
                                handleSize(item);
                              }}
                            >
                              {item}
                            </button>
                          ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold">Quantity</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          className="px-3 py-1 bg-gray-200 rounded-md text-gray-700"
                          onClick={() => handleQuantityChange(-1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 bg-gray-200 rounded-md text-gray-700">
                          {quantity}
                        </span>
                        <button
                          className="px-3 py-1 bg-gray-200 rounded-md text-gray-700"
                          onClick={() => handleQuantityChange(1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      isAlreadyAdded ? navigate("/cart") : handleAddToCart();
                    }}
                    className="w-1/2 py-2 bg-gray-900 text-white font-semibold rounded-md"
                  >
                    {isAlreadyAdded ? "Go To Cart" : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 text-gray-900">
              <h3 className="text-2xl font-semibold">Reviews</h3>
              <div className="mt-6">
                <h3 className="text-xl font-semibold">Add Your Review</h3>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-2">
                    <Rate
                      allowHalf
                      onChange={(value) => {
                        formik.setFieldValue("rating", value);
                      }}
                      onBlur={formik.handleBlur("rating")}
                      value={formik.values.rating}
                    />
                    <div className="text-red-700">
                      {formik.touched.rating && formik.errors.rating}
                    </div>
                  </div>
                  <textarea
                    className="w-full mt-2 p-4 bg-gray-100 rounded-md text-gray-900"
                    rows="4"
                    placeholder="Write your review here..."
                    value={formik.values.review}
                    onChange={formik.handleChange("review")}
                    onBlur={formik.handleBlur("review")}
                  ></textarea>
                  <div className="text-red-700">
                    {formik.touched.review && formik.errors.review}
                  </div>
                  <button
                    type="submit"
                    className="w-1/4 py-2 mt-2 bg-gray-900  text-white font-semibold rounded-md"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
              {singleProductsReviewList &&
                singleProductsReviewList?.map((item, index) => (
                  <div className="mt-4 space-y-4" key={index}>
                    <div className="bg-gray-100 p-4 rounded-md">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full bg-gray-300 `}>
                          <Image width={50} src={item?.profile_pic} />
                        </div>
                        <div className="ml-4">
                          <div className="flex gap-2 items-center">
                            <h4 className="font-semibold">{item?.name}</h4>
                            <Rate
                              allowHalf
                              disabled
                              defaultValue={item?.ratting}
                            />
                          </div>
                          <p className="text-gray-600">{item?.review}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
