import {React, useState, useEffect} from 'react';
import Gamepad from "../../assets/products/Gamepad.svg";
import WiredKeyboard from "../../assets/products/Wired-Keyboard.svg";
import CartCard from './CartCard';

function Cart() {
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const [numberProduct, setNumberProduct] = useState(4);

    // update cart
    const updateCart = () => {
        if(numberProduct > 0) {
            setNumberProduct(numberProduct - 1);
        }
    }

    // check if the number of product in the cart is above or below 1 to set iscartempty to true ir false
    useEffect(() => {
        if(numberProduct < 1) {
            setIsCartEmpty(true);
        }else {
            setIsCartEmpty(false);
        }
    }, [numberProduct]);

  return (
    <div>
        <div className='container mt-[60px!important] mb-[140px!important]'>
            <p>Home / Cart</p>
            {
                !isCartEmpty ? (
                    <>
                        <div className='mt-[60px] flex flex-col gap-[40px] mb-[24px]'>
                            <div className='grid grid-cols-4 w-full h-[72px] shadow items-center px-[20px] md:px-[40px]'>
                                <p className='font-normal'>Product</p>
                                <p className='font-normal text-center'>Price</p>
                                <p className='font-normal text-center'>Quanity</p>
                                <p className='font-normal text-end'>Subtotal</p>
                            </div>
        
                            <CartCard image={Gamepad} price={120} name='Hi Gamepad' subtotal={300} quantity={5} updateCart={updateCart}/>
                            <CartCard image={Gamepad} price={120} name='LCD Monitor' subtotal={300} quantity={2} updateCart={updateCart}/>
                            <CartCard image={Gamepad} price={120} name='Hi Gamepad' subtotal={300} quantity={1} updateCart={updateCart}/> 
                            <CartCard image={Gamepad} price={120} name='Hi Gamepad' subtotal={300} quantity={8} updateCart={updateCart}/> 
                        </div>
        
                        <div className='flex justify-between items-center mb-[80px]'>
                            {/* RETURN TO SHOP */}
                            <a href='/shop' className='max-md:w-[150px] w-[218px] h-[56px] flex justify-center items-center border border-[rgba(0,0,0,0.5)] rounded-md font-semibold'>
                                Return To Shop
                            </a>
            
                            {/* UPDATE CART */}
                            <button type='button' className='max-md:w-[150px] w-[218px] h-[56px] flex justify-center items-center border border-[rgba(0,0,0,0.5)] rounded-md font-semibold'>
                                Update Cart
                            </button>
                        </div>
        
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[100px] lg:gap-[173px]'>
                            <div className='flex gap-[16px]'>
                                <input type="text" placeholder='Coupon Code' className='h-[56px] max-md:w-[200px] w-[300px] border rounded-[4px] p-[15px]'/>
                                <button type='button' className='max-md:w-[150px] w-[211px] h-[56px] flex justify-center items-center bg-[#DB4444] text-white rounded-[4px] font-semibold'>
                                    Apply Coupon
                                </button>
                            </div>
        
                            <div className='flex flex-col gap-[16px] border-[1.5px] border-black py-[32px] px-[24px] rounded-[4px]'>
                                <h2 className='mb-[24px] text-[1.25rem] font-medium'>Cart Total</h2>
                                <p className='flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[4px] items-center'>Subtotal <span>$540</span></p>
                                <p className='flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[4px] items-center'>Shipping <span>Free</span></p>
                                <p className='flex justify-between items-center'>Total <span>$540</span></p>
                                <a href='/checkout' className='max-md:w-[180px] w-[218px] h-[56px] flex justify-center items-center bg-[#DB4444] text-white rounded-[4px] font-semibold mx-auto'>
                                    Proceed To Checkout
                                </a>
                            </div>
        
                        </div>
                    </>
                ) : (
                    <div>
                        cart is empty
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Cart