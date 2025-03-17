import {React, useRef} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Phone from '../../assets/icons/phone.svg'
import Computer from '../../assets/icons/Computer.svg'
import CategoryCard from './CategoryCard';
import SmartWatch from '../../assets/icons/category-SmartWatch.svg';
import Camera from '../../assets/icons/category-camera.svg';
import Headphones from '../../assets/icons/category-HeadPhone.svg';
import Gaming from '../../assets/icons/category-gamepad.svg';


function Categories() {
    const sliderRef = useRef(null)

    const settings = {
        dots: false,            // Show navigation dots
        infinite: false,        // Infinite loop
        speed: 500,           // Animation speed
        slidesToShow: 4,       // Show one slide at a time
        slidesToScroll: 1,     // Scroll one slide at a time
        autoplay: true,        // Auto slide 
        arrows: true,         // Hide arrows
        pauseOnHover: true,    // Pause auto slide on hover
        ref:sliderRef,
        responsive: [
            {
              breakpoint: 1440, // Large desktops
              settings: {
                slidesToShow: 6,
                arrows: true
              },
            },
            {
              breakpoint: 1280, // Medium desktops
              settings: {
                slidesToShow: 6,
              },
            },
            {
              breakpoint: 1024, // Tablets
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 890, // Tablets
              settings: {
                slidesToShow: 3.5,
              },
            },
            {
              breakpoint: 768, // Large phones & small tablets
              settings: {
                slidesToShow: 3.5,
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
                slidesToShow: 2,
              },
            },
          ],
    };
  return (
    <div className='container'>
        <div className='mt-[90px] mb-[50px] pb-[50px] border-b-1 border-[#E0E0E0]'>
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
                    <button className='w-[46px] h-[46px] bg-[#F5F5F5] rounded-full' onClick={
                        () => {
                            sliderRef.current.slickPrev()
                        }
                    }>   
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    <button className='w-[46px] h-[46px] bg-[#F5F5F5] rounded-full' onClick={
                        () => {
                            sliderRef.current.slickNext()
                        }
                    }>   
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>

            {/* product */}
            <div className='category-list mb-[40px] mt-[30px]'>
                <Slider {...settings} className='product-slider'>
                    <CategoryCard image={Phone} name='Phone' />
                    <CategoryCard image={Computer} name='Computer'/>
                    <CategoryCard image={SmartWatch} name='SmartWatch'/>
                    <CategoryCard image={Camera} name='Camera' />
                    <CategoryCard image={Headphones} name='HeadPhones'/>
                    <CategoryCard image={Gaming} name='Gaming'/>
                    <CategoryCard image={Gaming} name='Gaming'/>
                </Slider>
            </div>
        </div>
    </div>
  )
}

export default Categories