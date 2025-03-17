import { React, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../product/ProductCard";
import Gamepad from "../../assets/products/Gamepad.svg";
import WiredKeyboard from "../../assets/products/Wired-Keyboard.svg";
import "./product.css";

function Product() {
  const sliderRef = useRef(null);
  const discount = {
    isTrue: true,
  };

  const settings = {
    dots: false, // Show navigation dots
    infinite: false, // Infinite loop
    speed: 500, // Animation speed
    slidesToShow: 3,
    autoplay: false, // Auto slide
    pauseOnHover: true, // Pause auto slide on hover
    ref: sliderRef,
    responsive: [
      {
        breakpoint: 890, // Tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Large phones & small tablets
        settings: {
          slidesToShow: 2.5,
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
  };

  return (
    <div className="container mt-[70px!important]">
      <div className="flex gap-[10px] items-center mb-[20px]">
        <span className="w-[20px] bg-[#DB4444] rounded-sm h-[40px]"></span>
        <p className="text-[#DB4444] font-semibold">Our Products</p>
      </div>

      {/* products */}
      <div className="flex justify-between max-md:items-start items-center">
        <div className="flex flex-col md:flex-row md:gap-[50px] lg:gap-[87px] md:items-end">
          <h1 className="text-[2.25rem] font-semibold">Explore Our Products</h1>
        </div>

        <div className="flex gap-[10px] items-center lg:hidden">
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
      <div className="product-list mb-[40px] mt-[15px]">
        <div className="lg:hidden">
          <Slider {...settings} className="products">
            <ProductCard
              image={Gamepad}
              name="HAVIT HV-G92 Gamepad"
              discount={discount}
              {...productCardSettings}
            />
            <ProductCard
              image={WiredKeyboard}
              name="AK-900 Wired Keyboard"
              NewProduct={true}
              {...productCardSettings}
            />
            <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings} />
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
            <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings} />
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard"  {...productCardSettings}/>
            <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings} />
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
            <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" />
            <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard"  {...productCardSettings}/>
          </Slider>
        </div>

        <div className="max-lg:hidden product-desktop">
          <ProductCard
            image={Gamepad}
            name="HAVIT HV-G92 Gamepad"
            NewProduct={true}
            {...productCardSettings}
          />
          <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
          <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings} />
          <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
          <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad"  {...productCardSettings}/>
          <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard"  {...productCardSettings}/>
          <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings}/>
          <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
        </div>
      </div>

      <a
        href="/product"
        className="bg-[#DB4444] text-white w-[234px] h-[56px] flex justify-center items-center mt-[15px] rounded-[4px] mx-auto"
      >
        View All Products
      </a>
    </div>
  );
}

export default Product;
