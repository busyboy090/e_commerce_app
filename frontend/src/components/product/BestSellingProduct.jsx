import { React, useRef } from "react";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BestSellingProduct.css";
import Gamepad from "../../assets/products/Gamepad.svg";
import WiredKeyboard from "../../assets/products/Wired-Keyboard.svg";

function BestSellingProduct() {
  const discount = {
    isTrue: true,
  };

  const settings = {
    dots: false, // Show navigation dots
    infinite: false, // Infinite loop
    speed: 500, // Animation speed
    slidesToShow: 4, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto slide
    arrows: false, // Hide arrows
    pauseOnHover: true, // Pause auto slide on hover

    responsive: [
      {
        breakpoint: 1440, // Large desktops
        settings: {
          slidesToShow: 4,
          arrows: true,
        },
      },
      {
        breakpoint: 1280, // Medium desktops
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 890, // Tablets
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 700, // Large phones & small tablets
        settings: {
          slidesToShow: 2.1,
        },
      },
      {
        breakpoint: 640, // Small phones
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Extra small phones
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // product card settings
  const productCardSettings = {
    wishlist: true,
    deleteBtn: false,
    view:true,
  };

  return (
    <div className="container">
      <div className="mt-[90px] lg:mb-[50px] lg:pb-[50px]">
        <div className="flex gap-[10px] items-center mb-[20px]">
          <span className="w-[20px] bg-[#DB4444] rounded-sm h-[40px]"></span>
          <p className="text-[#DB4444] font-semibold">This Month</p>
        </div>

        {/* best seeling product */}
        <div className="flex justify-between max-md:items-start items-center">
          <div className="flex flex-col md:flex-row md:gap-[50px] lg:gap-[87px] md:items-end">
            <h1 className="text-[2.25rem] font-semibold">
              Best Selling Products
            </h1>
          </div>

          <div className="flex gap-[10px] items-center">
            <button className="view-all max-lg:w-[100px] w-[158px] h-[56px] bg-[#DB4444] text-white rounded-[4px]">
              View All
            </button>
          </div>
        </div>

        {/* product */}
        <div className="product-list mb-[40px] mt-[15px]">
          <Slider {...settings} className="slick-container">
            <ProductCard
              image={Gamepad}
              name="HAVIT HV-G92 Gamepad"
              discount={discount}
              {...productCardSettings}
            />
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings}/>
            <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings}/>
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings}/>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default BestSellingProduct;
