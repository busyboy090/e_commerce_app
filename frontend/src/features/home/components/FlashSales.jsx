import { useRef, useEffect, useState } from "react";
import Countdown from "react-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "@/features/products/components/ProductCard";
import { SwiperSlide, Swiper } from "swiper/react";
import { Mousewheel, Navigation, Autoplay, Pagination, Grid } from "swiper/modules";
import 'swiper/css';
import "./flashSales.css";
import api from '@/services/axios'
import { toast } from 'react-toastify';

function FlashSales() {
  const flashSalesEndDate = new Date();
  flashSalesEndDate.setDate(flashSalesEndDate.getDate() + 5);

  const formatNumber = (num) => String(num).padStart(2, "0");

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
      spaceBetween: 30
    }
  }

  const [products, setProducts] = useState([])
  const [error, setError] = useState(null);
  
  const fetchProduct = async () => {
    try {

      const response = await api.get('/products/paginate-products?limit=8');

      setProducts(response?.data?.products);

    } catch (error) {
      setError('Failed to load flash sales');
    }
  }
  
  useEffect(() => {

    fetchProduct();

  },[])

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
          <Swiper modules={[Navigation, Autoplay, Mousewheel]} breakpoints={swiperBreakPoint} 
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

        {error && !products.length && (
          <p className="text-center text-gray-500 my-4">{error}</p>
        )}

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

export default FlashSales;
