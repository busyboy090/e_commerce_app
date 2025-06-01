import React, { useEffect, useState } from 'react';
import CartCard from './CartCard';
import { useCart } from '../../hooks/useCart';

function Cart() {
  const { cartItems, products, fetchCartProducts } = useCart();

  const [isCartEmpty, setIsCartEmpty] = useState(cartItems.length < 1);

  // Join cartItems with product details
  const itemMap = new Map(cartItems.map((item) => [item.productId, item]));

  const cart = products
    .map((product) => {
      const item = itemMap.get(product.product_id);
      if (!item) return 1;

      const price = Number(product?.product_variants?.[0]?.price || 0);
      const subtotal = (price * item.quantity).toFixed(2);

      return {
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        price,
        image: product?.product_colors?.[0]?.image || '',
        subtotal,
      };
    })
    .filter(Boolean);

  const totalProduct = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    setIsCartEmpty(totalProduct < 1);
  }, [totalProduct]);

  useEffect(() => {
    const ids = cartItems.map(item => item.productId);
    if (ids.length > 0) {
      fetchCartProducts(ids);
    }
  }, [cartItems]);

  return (
    <div className='container mt-[60px!important] mb-[140px!important]'>
      <p>Home / Cart</p>

      {!isCartEmpty ? (
        <>
          <div className='mt-[60px] flex flex-col gap-[40px] mb-[24px]'>
            <div className='grid grid-cols-4 w-full h-[72px] shadow items-center px-[20px] md:px-[40px]'>
              <p className='font-normal'>Product</p>
              <p className='font-normal text-center'>Price</p>
              <p className='font-normal text-center'>Quantity</p>
              <p className='font-normal text-end'>Subtotal</p>
            </div>

            {cart.map((product, index) => (
              <CartCard product={product} key={index} />
            ))}
          </div>

          <div className='flex justify-end items-center mb-[80px]'>
            <a
              href='/shop'
              className='max-md:w-[150px] w-[218px] h-[56px] flex justify-center items-center border border-[rgba(0,0,0,0.5)] rounded-md font-semibold'
            >
              Return To Shop
            </a>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[100px] lg:gap-[173px]'>
            <div className='flex gap-[16px]'>
              <input
                type='text'
                placeholder='Coupon Code'
                className='h-[56px] max-md:w-[200px] w-[300px] border rounded-[4px] p-[15px]'
              />
              <button
                type='button'
                className='max-md:w-[150px] w-[211px] h-[56px] flex justify-center items-center bg-[#DB4444] text-white rounded-[4px] font-semibold'
              >
                Apply Coupon
              </button>
            </div>

            <div className='flex flex-col gap-[16px] border-[1.5px] border-black py-[32px] px-[24px] rounded-[4px]'>
              <h2 className='mb-[24px] text-[1.25rem] font-medium'>Cart Total</h2>
              <p className='flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[4px] items-center'>
                Subtotal <span>${cartTotal}</span>
              </p>
              <p className='flex justify-between border-b-2 border-[rgba(0,0,0,0.1)] rounded-[4px] pb-[4px] items-center'>
                Shipping <span>Free</span>
              </p>
              <p className='flex justify-between items-center'>
                Total <span>${cartTotal}</span>
              </p>
              <a
                href='/checkout'
                className='max-md:w-[180px] w-[218px] h-[56px] flex justify-center items-center bg-[#DB4444] text-white rounded-[4px] font-semibold mx-auto'
              >
                Proceed To Checkout
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className='mt-[60px] text-center text-lg font-semibold'>Your cart is empty</div>
      )}
    </div>
  );
}

export default Cart;