import { React, useState } from "react";
import WhiteTick from "../../assets/icons/white-tick.svg";
import Gamepad from "../../assets/products/Gamepad.svg";
import WiredKeyboard from "../../assets/products/Wired-Keyboard.svg";
import './checkout.css';
import Bkash from '../../assets/payment-method-logo/bkash.svg'
import Visa from '../../assets/payment-method-logo/visa.svg'
import Mastercard from '../../assets/payment-method-logo/mastercard.svg'
import Nagad from '../../assets/payment-method-logo/nagad.svg'

function Checkout() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="container mb-[50px!important] lg:mb-[100px!important]">
      <p className="my-[40px] lg:my-[80px]">Home / checkout</p>
      <h2 className="text-[2.25rem] mb-[48px]">Billing Details</h2>

      <div className="grid grid-cols-12 gap-[25px] lg:gap-[150px]">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <form>
            <div className="flex flex-col gap-[20px]">
              {/* first name */}
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="first-name" className="text-[rgba(0,0,0,0.5)]">
                  First Name*
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                />
              </div>

              {/* company name */}
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="company-name"
                  className="text-[rgba(0,0,0,0.5)]"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company-name"
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                />
              </div>

              {/* street address */}
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="street-address"
                  className="text-[rgba(0,0,0,0.5)]"
                >
                  Street Address*
                </label>
                <input
                  type="text"
                  id="street-address"
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                />
              </div>

              {/* Apartment, floor, etc. (optional)*/}
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="apartment" className="text-[rgba(0,0,0,0.5)]">
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                />
              </div>

              {/* Town / City */}
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="Town/City" className="text-[rgba(0,0,0,0.5)]">
                  Town/City*
                </label>
                <input
                  type="text"
                  id="Town/City"
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                />
              </div>

              {/* Phone Number* */}
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="phone-number"
                  className="text-[rgba(0,0,0,0.5)]"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone-number"
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                />
              </div>

              {/* Email Address*/}
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="email" className="text-[rgba(0,0,0,0.5)]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                />
              </div>

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
            <div className="flex justify-between items-center">
              <div className="flex gap-[24px] items-center">
                <img
                  src={Gamepad}
                  alt="Gamepad"
                  className="w-[54px] h-[54px]"
                />
                <span>LCD Monitor</span>
              </div>
              <p>$650</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-[24px] items-center">
                <img
                  src={Gamepad}
                  alt="Gamepad"
                  className="w-[54px] h-[54px]"
                />
                <span>LCD Monitor</span>
              </div>
              <p>$650</p>
            </div>

            <p className="flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[20px] items-center">
              Subtotal <span>$540</span>
            </p>
            <p className="flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[20px] items-center">
              Shipping <span>Free</span>
            </p>
            <p className="flex justify-between items-center">
              Total <span>$540</span>
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
