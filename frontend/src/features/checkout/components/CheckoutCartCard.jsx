import React from 'react'

function CheckoutCartCard({product}) {
    const {name, image, subtotal} = product;
  return (
    <div className="flex justify-between items-center">
        <div className="flex gap-[24px] items-center">
        <img
            src={image}
            alt={name}
            className="w-[54px] h-[54px]"
        />
        <span>{name}</span>
        </div>
        <p>{subtotal}</p>
    </div>
  )
}

export default CheckoutCartCard
