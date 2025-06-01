import { React, useRef } from "react";
import ProductCard from "./ProductCard";
import "./BestSellingProduct.css";
import Gamepad from "../../assets/products/Gamepad.svg";
import WiredKeyboard from "../../assets/products/Wired-Keyboard.svg";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import 'swiper/css';

function BestSellingProduct() {
  const discount = {
    isTrue: true,
  };

  const swiperBreakPoint = {
    320: {
      slidesPerView: 1,
      spaceBetween:10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween:20
    },
    910: {
      slidesPerView: 3,
      spaceBetween:20
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    }
  }

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
        <div className="product-list mb-[40px]">
          <Swiper modules={[Autoplay, Mousewheel]} breakpoints={swiperBreakPoint} 
            autoplay={{
              delay: 2500,
              disableOnInteraction: false, 
            }}
            mousewheel={{
              forceToAxis: true
            }}
          >
              <SwiperSlide>
                <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard image={Gamepad} name="HAVIT HV-G92 Gamepad" {...productCardSettings} />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard image={WiredKeyboard} name="AK-900 Wired Keyboard" {...productCardSettings} />
              </SwiperSlide>
          </Swiper>
      </div>
      </div>
    </div>
  );
}

export default BestSellingProduct;
