import { React, useRef } from "react";
import Countdown from "react-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../product/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FashSales.css";
import Gamepad from "../../assets/products/Gamepad.svg";
import WiredKeyboard from "../../assets/products/Wired-Keyboard.svg";

function FashSales() {
  const flashSalesEndDate = new Date();
  flashSalesEndDate.setDate(flashSalesEndDate.getDate() + 5);

  const formatNumber = (num) => String(num).padStart(2, "0");

  const sliderRef = useRef(null);

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
    arrows: true, // Hide arrows
    pauseOnHover: true, // Pause auto slide on hover
    ref: sliderRef,
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

  const productCardSettings = {
    wishlist: true,
    deleteBtn: false,
    view:true,
    discount: true
  };

  return (
    <div className="container">
      <div className="mt-[90px] mb-[50px] pb-[50px] border-b-1 border-[#E0E0E0]">
        <div className="flex gap-[10px] items-center mb-[20px]">
          <span className="w-[20px] bg-[#DB4444] rounded-sm h-[40px]"></span>
          <p className="text-[#DB4444]">Today's</p>
        </div>

        {/* flash sales */}
        <div className="flex justify-between max-lg:items-start items-center">
          <div className="flex flex-col md:flex-row md:gap-[50px] lg:gap-[87px] md:items-end">
            <h1 className="text-[2.25rem] font-semibold">Flash Sales</h1>
            <Countdown
              date={flashSalesEndDate}
              renderer={({ days, hours, minutes, seconds }) => (
                <div>
                  <div className="title flex gap-[10px] items-center">
                    <div className="">
                      <span className="block text-[0.75rem] font-semibold">
                        Days
                      </span>
                      <span className="text-[2rem] font-bold">
                        {formatNumber(days)}
                      </span>
                    </div>
                    <span className="text-[#E07575] text-[25px]">:</span>
                    <div>
                      <span className="block text-[0.75rem] font-semibold">
                        Hours
                      </span>
                      <span className="text-[2rem] font-bold">
                        {formatNumber(hours)}
                      </span>
                    </div>
                    <span className="text-[#E07575] text-[25px]">:</span>
                    <div>
                      <span className="block text-[0.75rem] font-semibold">
                        Minutes
                      </span>
                      <span className="text-[2rem] font-bold">
                        {formatNumber(minutes)}
                      </span>
                    </div>
                    <span className="text-[#E07575] text-[25px]">:</span>
                    <div>
                      <span className="block text-[0.75rem] font-semibold">
                        Seconds
                      </span>
                      <span className="text-[2rem] font-bold">
                        {formatNumber(seconds)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>

          <div className="flex gap-[10px] items-center">
            <button
              className="w-[46px] h-[46px] bg-[#F5F5F5] rounded-full"
              onClick={() => {
                sliderRef.current.slickPrev();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <button
              className="w-[46px] h-[46px] bg-[#F5F5F5] rounded-full"
              onClick={() => {
                sliderRef.current.slickNext();
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>

        {/* product */}
        <div className="product-list mb-[40px]">
          <Slider {...settings} className="product-slider">
            <ProductCard
              image={Gamepad}
              name="HAVIT HV-G92 Gamepad"
              discount={discount}
              {...productCardSettings}
            />
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings}/>
            <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings} />
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings}/>
            <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings}/>
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
            <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings}/>
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings}/>
          </Slider>
        </div>

        <a
          href="/product"
          className="bg-[#DB4444] text-white w-[234px] h-[56px] flex justify-center items-center rounded-[4px] mx-auto"
        >
          View All Products
        </a>
      </div>
    </div>
  );
}

export default FashSales;
