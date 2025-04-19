import React, { useRef } from "react";
import { ImageTrail } from "../../Components/ui/image-trail";

const ProductImgUI = () => {
  const ref = useRef(null);
  const images = [
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1637666532931-b835a227b955?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1673644093928-1511bf77edda?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1558898452-e5c989f41b27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1673853725284-076f71f8c5f2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1558191053-8edcb01e1da3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ].map((url) => `${url}?auto=format&fit=crop&w=300&q=80`);

  return (
    <div className="flex w-full h-screen justify-center items-center bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 z-0" ref={ref}>
        <ImageTrail containerRef={ref}>
          {images.map((url, index) => (
            <div
              key={index}
              className="flex relative overflow-hidden w-52 h-52 rounded-lg"
            >
              <img
                src={url}
                alt={`Trail image ${index + 1}`}
                className="object-cover absolute inset-0 hover:scale-150 transition-transform"
              />
            </div>
          ))}
        </ImageTrail>
      </div>
      <h1 className="text-7xl md:text-9xl font-bold z-10 select-none bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-rose-500 ">
        FASHION
      </h1>
    </div>
  );
};

export default ProductImgUI;



