import {React, useRef, useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel'
import CategoryCard from './CategoryCard';
import { api } from '../../api/axios'


function Categories() {
    const nextSlideRef = useRef();
    const prevSlideRef = useRef();
    const [categories, setCategories] = useState([]);

    const swiperBreakPoint = {
      320: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 5,
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await api.get('/products/categories')

        setCategories(response?.data?.categories);

      } catch (error) {
        console.log(error);
      }
    } 

    useEffect(() => {

      fetchCategories();

    }, [])


  return (
    <div className='container'>
        <div className='mt-[90px] mb-[50px] pb-[15px] border-b-1 border-[#E0E0E0]'>
            <div className='flex gap-[10px] items-center mb-[20px]'>
                <span className='w-[20px] bg-[#DB4444] rounded-sm h-[40px]'></span>
                <p className='text-[#DB4444] font-semibold'>Categories</p>
            </div>

            {/* categories */}
            <div className='flex justify-between max-md:items-start items-center'>
                <div className='flex flex-col md:flex-row md:gap-[50px] lg:gap-[87px] md:items-end'>
                    <h1 className='text-[2.25rem] font-semibold'>Browse By Category</h1>
                </div>

                <div className='flex gap-[10px] items-center'>
                    <button className='w-[46px] h-[46px] bg-[#F5F5F5] rounded-full' ref={prevSlideRef}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    <button className='w-[46px] h-[46px] bg-[#F5F5F5] rounded-full' ref={nextSlideRef}>   
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>

            {/* product */}
            <div className='category-list mb-[40px] mt-[30px]'>
                <Swiper modules={[Navigation, Mousewheel, Autoplay]} spaceBetween={50} slidesPerView={5} breakpoints={swiperBreakPoint} 
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
                      categories.map((category, index) => (
                        <SwiperSlide key={index}>
                          <CategoryCard name={category.name}/>
                        </SwiperSlide>
                      ))
                    }
                </Swiper>
            </div>
        </div>
    </div>
  )
}

export default Categories