import React from 'react'
import DropDownArrow from '@/assets/icons/dropdown-arrow.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Hero.css';

function Hero() {
    const settings = {
        dots: true,            // Show navigation dots
        infinite: true,        // Infinite loop
        speed: 500,           // Animation speed
        slidesToShow: 1,       // Show one slide at a time
        slidesToScroll: 1,     // Scroll one slide at a time
        autoplay: true,        // Auto slide
        autoplaySpeed: 2000,   // Slide every 2 seconds
        arrows: false,         // Hide arrows
        pauseOnHover: true,    // Pause auto slide on hover
    };

  return (
    <div className='container'>
        <div className='grid grid-cols-10 grid-rows-1 max-lg:mt-[20px]'>
            <div className='max-lg:hidden col-span-2 flex flex-col gap-y-[17px] pe-[13px] border-r-1 border-[#E5E5E5] pt-[35px]'>
                <div className='flex justify-between'>
                    <p>Woman's Fashion</p>
                    <button>
                        <img src={DropDownArrow} alt="dropdown" />
                    </button>
                </div>
                <div className='flex justify-between'>
                    <p>Men's Fashion</p>
                    <button>
                        <img src={DropDownArrow} alt="dropdown" />
                    </button>
                </div>
                <div className='flex justify-between'>
                    <p>Electronics</p>
                    <button>

                    </button>
                </div>
                <div className='flex justify-between'>
                    <p>Home & Lifestyle</p>
                    <button>
                        
                    </button>
                </div>
                <div className='flex justify-between'>
                    <p>Medicine</p>
                    <button>
                        
                    </button>
                </div>
                <div className='flex justify-between'>
                    <p>Sports & Outdoor</p>
                    <button>
                        
                    </button>
                </div>
                <div className='flex justify-between'>
                    <p>Baby's & Toys</p>
                    <button>
                        
                    </button>
                </div>
                <div className='flex justify-between'>
                    <p>Groceries & Pets</p>
                    <button>
                        
                    </button>
                </div>
                <div className='flex justify-between'>
                    <p>Health & Beauty</p>
                    <button>
                        
                    </button>
                </div>
            </div>
            <div className='max-lg:col-span-10 col-span-8 lg:ms-[35px] lg:mt-[35px] p-0'>
                <Slider {...settings} className='hero-slider'>
                    <div className='bg-[black] text-white w-full h-full'>
                        <div className='flex h-100 justify-center items-center'>
                                Slide 1
                        </div>
                    </div>
                    <div className='bg-[red] text-white w-full h-full'>
                        <div className='flex h-100 justify-center items-center'>
                            Slide 2
                        </div>
                    </div>
                    <div className='bg-[green] text-white w-full h-full'>
                        <div className='flex items-center h-100 justify-center'>
                            Slide 3
                        </div>
                    </div>
                    <div className='bg-slate-500 text-white w-full h-full'>
                        <div className='flex items-center h-100 justify-center'>
                            Slide 4
                        </div>
                    </div>
                    <div className='bg-[yellow] text-white w-full h-full'>
                        <div className='flex items-center h-100 justify-center'>
                            Slide 5
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    </div>
  )
}

export default Hero