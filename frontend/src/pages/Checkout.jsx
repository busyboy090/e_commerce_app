import { React, useState } from "react";
import WhiteTick from "@/assets/icons/white-tick.svg";
import './checkout.css';
import Bkash from '@/assets/payment-method-logo/bkash.svg'
import Visa from '@/assets/payment-method-logo/visa.svg'
import Mastercard from '@/assets/payment-method-logo/mastercard.svg'
import Nagad from '@/assets/payment-method-logo/nagad.svg';
import { useCart } from '@/hooks/useCart.jsx';
import {generateCart} from '@/utils/cart.utils.js';
import CheckoutCartCard from "@/features/checkout/CheckoutCartCard.jsx";
import { formatCurrency } from "@/utils/money.js";

function InputField({label,id,onChange, value, type}) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id} className="text-[rgba(0,0,0,0.5)]">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
      />
    </div>
  )
}

function Checkout() {
  const [formData, setFormData] = useState({

  }) 
  const [isChecked, setIsChecked] = useState(false);
  const {products, cartItems} = useCart();
  const cart = generateCart(products, cartItems);
  const totalProduct = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleChange = (field,value) => {
    setFormData((prev) => ({...prev, [field]: value}));
  }
  return (
    <div className="container mb-[50px!important] lg:mb-[100px!important]">
      <p className="my-[40px] lg:my-[80px]">Home / checkout</p>
      <h2 className="text-[2.25rem] mb-[48px]">Billing Details</h2>

      <div className="grid grid-cols-12 gap-[25px] lg:gap-[150px]">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <form>
            <div className="flex flex-col gap-[20px]">
              {/* first name */}
              <InputField type='text' label='First Name*' id='first-name' onChange={handleChange} value={formData.first_Name}/>

              {/* company name */}
              <InputField type='text' label='Company Name*' id='company-name' onChange={handleChange} value={formData.company_Name}/>

              {/* street address */}
              <InputField type='text' label='Street Address*' id='street-address' onChange={handleChange} value={formData.street_address}/>

              {/* Apartment, floor, etc. (optional)*/}
              <InputField type='text' label='Apartment, floor, etc. (optional)' id='apartment' onChange={handleChange} value={formData.apartment}/>
              
              {/* Town / City */}
              <InputField type='text' label='Town/City*' id='town/city' onChange={handleChange} value={formData.town_city}/>

              {/* Phone Number* */}
              <InputField type='tel' label='Phone Number' id='phone-number' onChange={handleChange} value={formData.phone_number}/>
              
              {/* Email Address*/}
              <InputField type='email' label='Email' id='email' onChange={handleChange} value={formData.email}/>

              <div className="flex gap-[16px] items-center">
                <div className="relative mt-[6px]">
                  {/* Checkbox Box */}
                  <input
                    type="checkbox"
                    className="bg-[#DB4444] appearance-none h-[24px] w-[24px] rounded-[4px]"
                    onChange={() => {
                      setIsChecked(!isChecked);
                    }}
                  />
                  {/* White Tick Appears When Checked */}
                  <img
                    src={WhiteTick}
                    alt=""
                    className={`${
                      isChecked ? "block" : "hidden"
                    } absolute top-[40%] left-[50%] translate-[-50%]`}
                    onClick={() => {
                      setIsChecked(!isChecked);
                    }}
                  />
                </div>
                <label htmlFor="">
                  Save this information for faster check-out next time
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-6 mt-[25px]">
          <div className="lg:w-[70%] flex flex-col gap-[32px]">
            
            {
              cart.map((product) => (
                <CheckoutCartCard product={product} key={product.productId} />
              ))
            }
          
            <p className="flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[20px] items-center">
              Subtotal <span>{formatCurrency(cartSubTotal)}</span>
            </p>
            <p className="flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[20px] items-center">
              Shipping <span>Free</span>
            </p>
            <p className="flex justify-between items-center">
              Total <span>{formatCurrency(cartTotal)}</span>
            </p>

            {/* payment options */}
            <div className="flex flex-col gap-[20px]">
              {/* bank payment option */}
              <div className="flex max-md:flex-col max-md:items-start justify-between items-center">
                <div className="flex gap-5.5 items-center">
                  <input
                    type="radio"
                    value="bank"
                    id="bank"
                    name="payment"
                  />
                  <label htmlFor="bank">Bank</label>
                </div>
                <div className="flex gap-[10px]">
                    {/* visa */}
                    <img src={Bkash} alt="Bkash"  className="w-[70px]"/>
                    <img src={Visa} alt="Visa"  className="w-[70px]"/>
                    <img src={Mastercard} alt="Mastercard" className="w-[70px]"/>
                    <img src={Nagad} alt="Nagad" className="w-[70px]"/>
                </div>
              </div>

              {/* cash on delivery */}
              <div className="flex gap-5.5 items-center">
                <input type="radio" value="cash" id="cash" name="payment" />
                <label htmlFor="cash">Cash on delivery</label>
              </div>
            </div>
          </div>

          <div className="flex gap-[16px] mt-[50px]">
            <input
              type="text"
              placeholder="Coupon Code"
              className="h-[56px] max-md:w-[200px] w-[300px] border rounded-[4px] p-[15px]"
            />
            <button
              type="button"
              className="max-md:w-[150px] w-[211px] h-[56px] flex justify-center items-center bg-[#DB4444] text-white rounded-[4px] font-semibold"
            >
              Apply Coupon
            </button>
          </div>

          <button
            type="button"
            className="bg-[#DB4444] text-white rounded-[4px] w-[191px] h-[56px] mt-[30px]"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
