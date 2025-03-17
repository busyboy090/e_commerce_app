import {React, useState } from 'react';
import WhiteTick from '../../assets/icons/white-tick.svg';
import 

function Checkout() {
    const [isChecked, setIsChecked] = useState(false)
  return (
    <div className='container'>
        <p className='my-[40px] lg:my-[80px]'>Home / checkout</p>

        <div className='grid grid-cols-12 lg:gap-[150px]'>
            <div className='col-span-12 md:col-span-5'>
                <form>
                    <h2 className='text-[2.25rem] mb-[48px]'>Billing Details</h2>

                    <div className='flex flex-col gap-[20px]'>
                        {/* first name */}
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="first-name" className='text-[rgba(0,0,0,0.5)]'>First Name*</label>
                            <input type="text" id='first-name' className='h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]'/>
                        </div>

                        {/* company name */}
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="company-name" className='text-[rgba(0,0,0,0.5)]'>Company Name</label>
                            <input type="text" id='company-name' className='h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]'/>
                        </div>

                        {/* street address */}
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="street-address" className='text-[rgba(0,0,0,0.5)]'>Street Address*</label>
                            <input type="text" id='street-address' className='h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]'/>
                        </div>

                        {/* Apartment, floor, etc. (optional)*/}
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="apartment" className='text-[rgba(0,0,0,0.5)]'>Apartment, floor, etc. (optional)</label>
                            <input type="text" id='apartment' className='h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]'/>
                        </div>

                        {/* Town / City */}
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="Town/City" className='text-[rgba(0,0,0,0.5)]'>Town/City*</label>
                            <input type="text" id='Town/City' className='h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]'/>
                        </div>

                        {/* Phone Number* */}
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="phone-number" className='text-[rgba(0,0,0,0.5)]'>Phone Number</label>
                            <input type="tel" id='phone-number' className='h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]'/>
                        </div>

                        {/* Email Address*/}
                        <div className='flex flex-col gap-[5px]'>
                            <label htmlFor="email" className='text-[rgba(0,0,0,0.5)]'>Email Address</label>
                            <input type="email" id='email' className='h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]'/>
                        </div>

                        <div className='flex gap-[16px] items-center'>
                            <div className='relative mt-[6px]'>
                                {/* Checkbox Box */}
                                <input type="checkbox" className='bg-[#DB4444] appearance-none h-[24px] w-[24px] rounded-[4px]' onChange={() => {
                                    setIsChecked(!isChecked);
                                }}/>
                                {/* White Tick Appears When Checked */}
                                <img src={WhiteTick} alt="" className={`${isChecked ? 'block' : 'hidden'} absolute top-[40%] left-[50%] translate-[-50%]`} onClick={() => {
                                    setIsChecked(!isChecked);
                                }} />
                            </div>
                            <label htmlFor=''>Save this information for faster check-out next time</label>
                        </div>
                    </div>
                </form>
            </div>

            <div>

            </div>
        </div>
    </div>
  )
}

export default Checkout