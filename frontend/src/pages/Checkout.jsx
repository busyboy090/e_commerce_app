import { useState } from "react";
import WhiteTick from "@/assets/icons/white-tick.svg";
import './checkout.css';
import Bkash from '@/assets/payment-method-logo/bkash.svg'
import Visa from '@/assets/payment-method-logo/visa.svg'
import Mastercard from '@/assets/payment-method-logo/mastercard.svg'
import Nagad from '@/assets/payment-method-logo/nagad.svg';
import { useCart } from '@/hooks/useCart.jsx';
import { generateCart } from '@/utils/cart.utils.js';
import CheckoutCartCard from "@/features/checkout/components/CheckoutCartCard.jsx";
import { formatCurrency } from "@/utils/money.js";
import TextInput from "@/components/Input/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/utils/schemas";

function Checkout() {
  const [isChecked, setIsChecked] = useState(false);
  const { products, cartItems } = useCart();
  const cart = generateCart(products, cartItems);
  const cartSubTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      first_name: '', company_name: '', street_address: '',
      apartment: '', town_city: '', phone_number: '', email: '',
    },
  });

  const onSubmit = (data) => {
    // TODO: integrate with order service
  };

  return (
    <div className="container mb-[50px!important] lg:mb-[100px!important]">
      <p className="my-[40px] lg:my-[80px]">Home / checkout</p>
      <h2 className="text-[2.25rem] mb-[48px]">Billing Details</h2>

      <div className="grid grid-cols-12 gap-[25px] lg:gap-[150px]">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[20px]">
              <TextInput type='text' label='First Name*' id='first_name' {...register('first_name')} error={errors.first_name?.message} />
              <TextInput type='text' label='Company Name' id='company_name' {...register('company_name')} />
              <TextInput type='text' label='Street Address*' id='street_address' {...register('street_address')} error={errors.street_address?.message} />
              <TextInput type='text' label='Apartment, floor, etc. (optional)' id='apartment' {...register('apartment')} />
              <TextInput type='text' label='Town/City*' id='town_city' {...register('town_city')} error={errors.town_city?.message} />
              <TextInput type='tel' label='Phone Number*' id='phone_number' {...register('phone_number')} error={errors.phone_number?.message} />
              <TextInput type='email' label='Email*' id='email' {...register('email')} error={errors.email?.message} />

              <div className="flex gap-[16px] items-center">
                <div className="relative mt-[6px]">
                  <input
                    type="checkbox"
                    className="bg-[#DB4444] appearance-none h-[24px] w-[24px] rounded-[4px]"
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <img
                    src={WhiteTick}
                    alt=""
                    className={`${isChecked ? "block" : "hidden"} absolute top-[40%] left-[50%] translate-[-50%]`}
                    onClick={() => setIsChecked(!isChecked)}
                  />
                </div>
                <label>Save this information for faster check-out next time</label>
              </div>
            </div>
          </form>
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-6 mt-[25px]">
          <div className="lg:w-[70%] flex flex-col gap-[32px]">
            {cart.map((product) => (
              <CheckoutCartCard product={product} key={product.productId} />
            ))}

            <p className="flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[20px] items-center">
              Subtotal <span>{formatCurrency(cartSubTotal)}</span>
            </p>
            <p className="flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[20px] items-center">
              Shipping <span>Free</span>
            </p>
            <p className="flex justify-between items-center">
              Total <span>{formatCurrency(cartTotal)}</span>
            </p>

            <div className="flex flex-col gap-[20px]">
              <div className="flex max-md:flex-col max-md:items-start justify-between items-center">
                <div className="flex gap-5.5 items-center">
                  <input type="radio" value="bank" id="bank" name="payment" />
                  <label htmlFor="bank">Bank</label>
                </div>
                <div className="flex gap-[10px]">
                  <img src={Bkash} alt="Bkash" className="w-[70px]" />
                  <img src={Visa} alt="Visa" className="w-[70px]" />
                  <img src={Mastercard} alt="Mastercard" className="w-[70px]" />
                  <img src={Nagad} alt="Nagad" className="w-[70px]" />
                </div>
              </div>

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
