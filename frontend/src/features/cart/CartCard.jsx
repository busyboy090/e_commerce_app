import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import DeleteCart from '../../assets/icons/delete-cart.svg';
import { formatCurrency } from '../../utils/money';
import { useCart } from '../../hooks/useCart';

function CartCard({ product }) {
  const { image, name, price, quantity, productId } = product;

  const [qty, setQty] = useState(quantity);
  const [showComponent, setShowComponent] = useState(true);
  
  const { removeFromCart, updateCart } = useCart();
  useEffect(() => {
    const id = setTimeout(() => {
      updateCart(productId, qty);
    }, 500);
  
    return () => clearTimeout(id);
  }, [qty]);
  
  const increment = () => {
    if (qty < 10) setQty(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const changeQuantity = (e) => {
    const newQty = Number(e.target.value);
    if (newQty >= 1 && newQty <= 10) {
      setQty(newQty);
    }
  };

  const handleDelete = () => {
    removeFromCart(productId);
  };

  return (
    <tr className="h-[100px] shadow px-[20px] md:px-[40px]">
      <td className='w-[300px] text-center ps-5'>
        <div className="flex max-md:flex-col items-center relative">
          <button
            type="button"
            className="absolute left-[1px] md:left-[-10px] top-[-3px]"
            onClick={handleDelete}
          >
            <img src={DeleteCart} alt="Delete Icon" />
          </button>
          <img src={image} alt={`${name}-image`} className="w-[60px] h-[60px]" />
          <span className="md:ms-[20px] text-center">{name}</span>
        </div>
      </td>

      <td className="font-normal text-center">{formatCurrency(price)}</td>

      <td className="font-normal text-center flex justify-center items-center h-[100px]">
        <div className="w-[72px] h-[44px] py-[10px] border border-[rgba(0,0,0,0.4)] rounded-[4px] relative">
          <select
            value={qty}
            onChange={changeQuantity}
            className="appearance-none focus:outline-0 w-[72px] px-[10px]"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {String(i + 1).padStart(2, '0')}
              </option>
            ))}
          </select>

          <div className="absolute top-1 right-2 flex flex-col gap-[2px]">
            <FontAwesomeIcon icon={faChevronUp} onClick={increment} className="cursor-pointer" />
            <FontAwesomeIcon icon={faChevronDown} onClick={decrement} className="cursor-pointer" />
          </div>
        </div>
      </td>

      <td className="font-normal text-center ms-[15px] lg:text-center">
        {formatCurrency(price * qty)}
      </td>
    </tr>
  );
}

export default CartCard;
