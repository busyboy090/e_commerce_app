import React from 'react';
import Ps5 from '@/assets/products/PS5.svg';
import WomensCollection from '@/assets/products/Womens-Collection.svg';
import Perfume from '@/assets/products/Perfume.svg';
import Speakers from '@/assets/products/Speakers.svg';
import './NewArrival.css';

function NewArrival() {
  return (
    <div className='container mt-[60px!important]'>
        <div className="flex gap-[10px] items-center mb-[20px]">
            <span className="w-[20px] bg-[#DB4444] rounded-sm h-[40px]"></span>
            <p className="text-[#DB4444] font-semibold">Featured</p>
        </div>

        <h1 className='text-[2.25rem] font-semibold'>New Arrival</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-[32px] lg:gap-[30px] mt-[15px]'>
            <div className='bg-[black] max-md:h-[380px] w-[100%] h-[100%] new-arrival-product'>
                <img src={Ps5} alt="PlayStation 5" className='absolute bottom-0 left-[50%] translate-x-[-50%]' />
                <div className='content max-md:w-[60%!important]'>
                    <h2 className='mb-[16px] text-[1.5rem]'>PlayStation 5</h2>
                    <p className='mb-[16px] text-[0.8rem]'>Black and white version of the PS5 coming out on sale</p>

                    <a href="" className='underline decoration-white underline-offset-[5px]'>
                        Shop Now
                    </a>
                </div>
            </div>
            <div className='grid grid-rows-2 gap-[32px]'>
                <div className='w-[100%] h-[284px] new-arrival-product bg-[#0D0D0D]'>
                    <img src={WomensCollection} alt="Women's Collection" className='absolute bottom-0 left-[70%] translate-x-[-50%]' />
                    <div className='content'>
                        <h2 className='mb-[16px] text-[1.5rem]'>Women's Collection</h2>
                        <p className='mb-[16px] text-[0.8rem]'>Featured woman collections that give you another vibe.</p>

                        <a href="" className='underline decoration-white underline-offset-[5px]'>
                            Shop Now
                        </a>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-[15px]'>
                    <div className='bg-black w-[100%] h-[284px] new-arrival-product'>
                        <img src={Speakers} alt="Speaker's" className='absolute top-[50%] left-[50%] translate-[-50%]' />
                        <div className='content w-[80%!important]'>
                            <h2 className='mb-[8px] text-[1.5rem]'>Speaker's</h2>
                            <p className='mb-[8px] text-[0.8rem]'>Amazon wireless speakers</p>

                            <a href="" className='underline decoration-white underline-offset-[5px]'>
                                Shop Now
                            </a>
                        </div>
                    </div>
                    <div className='bg-[rgba(0,0,0,0.9)] w-[100%] h-[284px] new-arrival-product'>
                        <img src={Perfume} alt="Perfume" className='absolute top-[50%] left-[50%] translate-[-50%]' />
                        <div className='content w-[80%!important]'>
                            <h2 className='mb-[8px] text-[1.5rem]'>Perfume</h2>
                            <p className='mb-[8px] text-[0.8rem]'>GUCCI INTENSE OUD EDP</p>

                            <a href="" className='underline decoration-white underline-offset-[5px]'>
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewArrival
