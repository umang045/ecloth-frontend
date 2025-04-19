import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  Input,
  Button,
  Skeleton,
  Select,
  Switch,
  Modal,
  ColorPicker,
  Image,
} from "antd";
import { useDropzone } from "react-dropzone";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addSellerProduct,
  deleteImgFromCloudinary,
  getAllProductColor,
  sellerUpdateProduct,
  uploadImgToCloudinary,
} from "../../../Feature/Products/ProductSlice";
import { MdDelete } from "react-icons/md";

//define validation schema for form
let addProductSchema = yup.object({
  title: yup.string().required("Title is required"),
  price: yup.string().required("Price is Required!!"),
  stock: yup.string().required("Stock is Required!!"),
  category_id: yup.string().required("Category is Required!!"),
});

const SellerAddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editProductData = location?.state;
  const { product_id } = useParams();

  useEffect(() => {
    if (product_id != undefined) {
      dispatch(getAllProductColor(product_id));
    }
  }, [product_id]);

  const { quill, quillRef } = useQuill();
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [colors, setColors] = useState([]);
  const [sizeOptions] = useState(["S", "M", "L", "XL", "XXL"]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tag, setTag] = useState("");
  const [listOfOption, setListOfOption] = useState([]);
  const [selectedTagColor, setSelectedTagColor] = useState("#ffffff");
  const [tagActive, setTagActive] = useState(false);
  const [cloudImagePublicId, setCloudImagePublicId] = useState(null);

  //set product data for edit 
  useEffect(() => {
    if (editProductData) {
      setSelectedSizes(editProductData?.size || []);
      setTag(editProductData?.product_tag || "");
      setSelectedTagColor(editProductData?.product_tag_color || "#ffffff");
      setTagActive(editProductData?.tag_active || false);
      setUploadedImgUrl(editProductData?.image || null);
      setCloudImagePublicId(editProductData?.img_public_id || null);
    }
  }, [editProductData]);

//formik and submit value for update or insert
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: editProductData?.title || "",
      category_id: editProductData?.category_id || "",
      price: editProductData?.price || "",
      stock: editProductData?.stock || "",
    },
    validationSchema: addProductSchema,
    onSubmit: async (values) => {
      let errors = [];
      if (!description.trim()) {
        errors.push("Product description is required!");
      }
      if (!selectedSizes.length) {
        errors.push("At least one size must be selected!");
      }
      if (!colors.length) {
        errors.push("At least one color must be selected!");
      }
      if (!uploadedImgUrl) {
        errors.push("Product image is required!");
      }
      if (errors.length > 0) {
        errors.forEach((err) => toast.info(err));
        return;
      }
      const addProdData = {
        ...values,
        product_tag: tag,
        product_tag_color: selectedTagColor,
        size: selectedSizes,
        tag_active: tagActive,
        description: description,
        colors: colors,
        image: uploadedImgUrl,
        public_id: cloudImagePublicId,
        product_id: product_id != undefined ? product_id : null,
      };
      if (product_id != undefined) {
        const res = await dispatch(sellerUpdateProduct(addProdData));
        if (sellerUpdateProduct?.fulfilled?.match(res)) {
          toast.success("Product Updated!!");
          setTimeout(() => {
            navigate("/seller/sellerProductList");
          }, 1000);
        }
      } else {
        const res = await dispatch(addSellerProduct(addProdData));
        if (addSellerProduct?.fulfilled?.match(res)) {
          toast.success("Product Added!!");
          setTimeout(() => {
            navigate("/seller/sellerProductList");
          }, 1000);
        }
      }
    },
  });

  //get quill data for description
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setDescription(quill.root.innerHTML);
      });
    }
    if (quill && editProductData?.description) {
      quill.root.innerHTML = editProductData.description;
    }
  }, [quill, editProductData]);

  //******************Handle Colors Start ********************** */

  const addColors = (value) => {
    setColors([...colors, value]);
  };

  const removeColors = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  //******************Handle Colors End********************** */

  //***************************File Drop & Upload To Cloud Start ***************/

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("image", file);
    cloudImagePublicId != null
      ? dispatch(deleteImgFromCloudinary(public_id))
      : dispatch(uploadImgToCloudinary(formData));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
  });
  //***************************File Drop & Upload To Cloud End ***************/

  const { uploadImageToCloud, productColorList, isLoading } = useSelector(
    (state) => state?.products,
    shallowEqual
  );

  //fetch color and set to selected color for edit colors
  useEffect(() => {
    if (product_id != undefined && productColorList) {
      setColors((prevColors) => [
        ...prevColors,
        ...productColorList?.map((item) => item?.color_code),
      ]);
    }
  }, [productColorList, product_id]);

  //fetch image url & public id from data base and set here for update
  useEffect(() => {
    if (uploadImageToCloud) {
      setUploadedImgUrl(uploadImageToCloud?.data?.url);
      setCloudImagePublicId(uploadImageToCloud?.data?.public_id);
    }
  }, [uploadImageToCloud, dispatch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg ">
      <h1 className="text-2xl font-bold mb-4">
        {" "}
        {product_id != undefined ? "Edit" : "ADD"} Product
      </h1>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="product-title"
            className="text-sm font-semibold text-gray-500"
          >
            Product Title
          </label>
          <Input
            type="text"
            id="product-title"
            placeholder="Enter title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
          />
          <div className="text-red-700">
            {formik.touched.title && formik.errors.title}
          </div>
        </div>
        <div className="w-full flex flex-col space-y-1">
          <label
            htmlFor="product-title"
            className="text-sm font-semibold text-gray-500"
          >
            Description
          </label>

          <div style={{ width: "100%", height: 200 }}>
            <div ref={quillRef} />
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-1 pt-14">
          <div className="w-1/3 flex flex-col space-y-1">
            <label
              htmlFor="product-category"
              className="text-sm font-semibold text-gray-500"
            >
              Category
            </label>
            <Select
              id="product-category"
              name="category_id"
              placeholder="Select Category"
              value={formik.values.category_id}
              onChange={formik.handleChange("category_id")}
              onBlur={formik.handleBlur("category_id")}
            >
              {/* <Option value=""></Option> */}
              <Option value="1">mens</Option>
              <Option value="2">womens</Option>
              <Option value="3">kids</Option>
            </Select>
            <div className="text-red-700">
              {formik.touched.category_id && formik.errors.category_id}
            </div>
          </div>
          <div className="w-1/3 flex flex-col space-y-1">
            <label
              htmlFor="product-title"
              className="text-sm font-semibold text-gray-500"
            >
              Product Price
            </label>
            <Input
              type="number"
              id="product-title"
              placeholder="Enter title"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
            />
            <div className="text-red-700">
              {formik.touched.price && formik.errors.price}
            </div>
          </div>
          <div className="w-1/3 flex flex-col space-y-1">
            <label
              htmlFor="product-title"
              className="text-sm font-semibold text-gray-500"
            >
              Product Stock
            </label>
            <Input
              type="number"
              id="product-title"
              placeholder="Enter title"
              name="stock"
              value={formik.values.stock}
              onChange={formik.handleChange("stock")}
              onBlur={formik.handleBlur("stock")}
            />
            <div className="text-red-700">
              {formik.touched.stock && formik.errors.stock}
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-1 pt-14">
          <div className="w-1/3 flex flex-col space-y-1">
            <label
              htmlFor="product-title"
              className="text-sm font-semibold text-gray-500"
            >
              Select Size
            </label>
            <Select
              id="product-category"
              name="category_id"
              mode="multiple"
              value={selectedSizes}
              placeholder="Select Size"
              onChange={(value) => {
                setSelectedSizes(value);
              }}
            >
              {sizeOptions?.map((item, index) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </div>
          <div className="w-1/3 flex flex-col space-y-1">
            <label
              htmlFor="product-title"
              className="text-sm font-semibold text-gray-500"
            >
              Select Colors
            </label>
            <div className="flex items-center ">
              <ColorPicker
                defaultValue="#1677ff"
                format="hex"
                onChangeComplete={(value) => {
                  addColors(value.toHexString());
                }}
              />
              {colors?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative h-6 w-6 m-1 rounded-full cursor-pointer group"
                    style={{ backgroundColor: `${item}` }}
                  >
                    <MdDelete
                      size={30}
                      className="absolute text-red-500 bg-transparent h-full w-full rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition duration-300"
                      onClick={() => removeColors(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/3  flex flex-col space-y-1">
            <label
              htmlFor="product-title"
              className="text-sm font-semibold text-gray-500"
            >
              Select Tag || Tag Color || Active or Not
            </label>
            <div className="flex justify-between">
              <Select
                id="product-category"
                name="category_id"
                value={tag}
                placeholder="Select Tags"
                onChange={(value) => {
                  setTag(value);
                }}
              >
                <Option value="Popular">Popular</Option>
                <Option value="Featured">Featured</Option>
                <Option value="Special">Special</Option>
              </Select>
              <ColorPicker
                defaultValue="#1677ff"
                size="small"
                showText
                onChange={(value) => {
                  setSelectedTagColor(value?.toHexString());
                }}
              />
              <Switch
                value={tagActive}
                onChange={(value) => {
                  setTagActive(value);
                }}
              />{" "}
            </div>
          </div>
        </div>

        <div className="mt-2 w-full">
          <label
            htmlFor="product-image"
            className="text-sm font-semibold text-gray-500"
          >
            Product Image
          </label>
          <div
            {...getRootProps({ className: "dropzone" })}
            className="px-4 py-2 border border-gray-500 h-24 flex items-center justify-center w-full outline-none rounded"
          >
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>

          {uploadedImgUrl && (
            <>
              <div className="relative mt-2 inline-block rounded-lg">
                {/* <Image width={200} src={uploadedImgUrl} className="rounde-lg" /> */}
                {isLoading ? (
                  <Skeleton.Image style={{ width: 200, height: 200 }} />
                ) : (
                  <Image
                    width={200}
                    src={uploadedImgUrl}
                    className="rounde-lg"
                  />
                )}

                <div className="absolute top-0 right-0">
                  <MdDelete
                    color="red"
                    size={20}
                    className="cursor-pointer"
                    onClick={async (public_id) => {
                      // handleImageDelete(public_id);
                      await dispatch(deleteImgFromCloudinary(public_id)).then(
                        () => {
                          setUploadedImgUrl(null);
                          setCloudImagePublicId(null);
                        }
                      );
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-gray-950 mt-2 w-1/3 font-bold text-lg p-2 rounded-lg text-white"
          >
            {product_id != undefined ? "Edit" : "ADD"} Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerAddProduct;
