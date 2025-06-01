import { React, useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../product/ProductCard";
import Gamepad from "../../assets/products/Gamepad.svg";
import WiredKeyboard from "../../assets/products/Wired-Keyboard.svg";
import "./product.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Mousewheel, Navigation, Autoplay, Pagination, Grid } from "swiper/modules";
import 'swiper/css';
import "swiper/css/grid";
import {api} from '../../api/axios';

function Product() {
  const nextSlideRef = useRef();
  const prevSlideRef = useRef();
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
      grid: {
        rows: 2,
        fill: 'row',
      },
      navigation:false,
    }
  }

  const [products, setProducts] = useState([])

  const fetchProduct = async () => {
    try {

      const response = await api.get('/products/paginate-products?limit=8');

      setProducts(response?.data?.products);

    } catch (error) {
      console.log('Error fetching product')
    }
  }

  useEffect(() => {

    fetchProduct();

  },[])

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
          <button className="w-[46px] h-[46px] bg-[#F5F5F5] rounded-full" ref={prevSlideRef}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <button className="w-[46px] h-[46px] bg-[#F5F5F5] rounded-full" ref={nextSlideRef}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      {/* product */}
      <div className="product-list mb-[40px]">
          <Swiper modules={[Navigation, Autoplay, Mousewheel, Grid]} breakpoints={swiperBreakPoint} 
            autoplay={{
              delay: 2500,
              disableOnInteraction: false, 
            }}
            mousewheel={{
              forceToAxis: true
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevSlideRef.current;
              swiper.params.navigation.nextEl = nextSlideRef.current;
            }}
          >
              {
                products.map((product, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard product={product} settings={productCardSettings} />
                  </SwiperSlide>
                ))
              }
          </Swiper>
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
