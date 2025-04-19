import React, { useEffect } from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero.jsx";
import Marque from "../../Components/Marquee/Marque.jsx";
import Card from "../../Components/Card/Card.jsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "animate.css";
import ScrollTrigger from "https://cdn.skypack.dev/gsap@3.11.0/ScrollTrigger";
import ProductImgUI from "@/Components/ProductImgUI/ProductImgUI";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getAllProductsWithoutFilter,
  getAllProductsReviews,
} from "@/Feature/Products/ProductSlice";
import { isLogin } from "@/utils/AxiosConfig";
import { getSingleUser } from "@/Feature/User/UserSlice";

gsap.registerPlugin(ScrollTrigger);

//Home
const Home = () => {
  const dispatch = useDispatch();

  //*************************Animation Start *************** */

  useEffect(() => {
    gsap.fromTo(
      ".animated1",
      { x: -10, opacity: 0, delay: 2 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".animated1",
          toggleActions: "restart pause reverse pause",
        },
      }
    );
  }, []);
  //*************************Animation End *************** */

  //*************************Fetch Start *************** */
  useEffect(() => {
    isLogin();
  }, [isLogin(), dispatch]);
  // console.log(isLogin())  

  useEffect(() => {
    if (isLogin()) {
      dispatch(getSingleUser());
    }
  }, [isLogin(), dispatch]);

  useEffect(() => {
    dispatch(getAllProductsWithoutFilter());
    dispatch(getAllProductsReviews());
  }, [dispatch]);

  const { withoutFilterProductList, isLoading, allReviewList } = useSelector(
    (state) => state.products,
    shallowEqual
  );

  const { userInfo } = useSelector((state) => state.user, shallowEqual);
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("role", userInfo?.role);
    }
  }, [userInfo]);

  //*************************Fetch End *************************/

  return (
    <>
      <div>
        <div className="mt-2 z-0">
          <HeroGeometric
            badge="Umangs UI"
            title1={` "Where Style Meets Comfort :) < 3"`}
            title2="E-Cloth Store"
          />
        </div>
        <div className="shadow-lg">
          <div className="text-xl m-4 font-bold animate__animated animate__bounce ">
            Brands
          </div>
          <Marque />
        </div>{" "}
        <div className="mt-2  shadow-lg">
          <ProductImgUI />
        </div>
        <div>
          <div className="text-2xl text-gray-950  m-4 pt-5 font-bold animate__animated animate__bounce ">
            Recently Added
          </div>
          <div class=" main p-2 col-span-3 mb-4 grid  gap-2 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-5">
            {withoutFilterProductList?.slice(-5).map((item, index) => (
              <Card data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
