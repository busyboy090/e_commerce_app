import {React, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp,faChevronDown} from "@fortawesome/free-solid-svg-icons";
import DeleteCart from '../../assets/icons/delete-cart.svg'

function CartCard(props) {
    const {image, name, price, quantity, updateCart} = props;
    const [qty,setQty] = useState(quantity);
    const [showComponent, setShowComponent] = useState(true);

    const increment = () => {
        if(qty < 10){
            setQty(qty + 1);
        }
    }

    const decrement = () => {
        if(qty > 1){
            setQty(qty - 1);
        }
    }

    const changeQuantity = (e) => {
        setQty(e.target.value);
    }

    const removeProductFromCart = () => {
        setShowComponent(!showComponent);
        updateCart()
    }

  return (
    <div className={`${!showComponent ? 'hidden' : 'grid' } grid-cols-4 w-full py-[24px] shadow items-center px-[20px] md:px-[40px]`}>
        <div className='flex max-md:flex-col items-center relative'>
            <button type='button' className='absolute left-[1px] md:left-[-10px] top-[-3px]' onClick={removeProductFromCart}>
                <img src={DeleteCart} alt="Delete Icon" />
            </button>
            <img src={image} alt={`${name}-image`} className='w-[60px] h-[60px]' />
            <span className='md:ms-[20px] text-center'>{name}</span>
        </div>
        <p className='font-normal text-center'>${price}</p>
        <div className='font-normal text-center'>
            <div className='w-[72px] h-[44px] py-[10px] border border-[rgba(0,0,0,0.4)] rounded-[4px] relative'>
                <select value={qty} onChange={changeQuantity} className='appearance-none focus:outline-0 w-[72px] px-[10px]'>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                </select>
                <div className='absolute top-1 right-2 flex flex-col gap-[2px]'>
                    <FontAwesomeIcon icon={faChevronUp} className='font-normal' onClick={increment}/>
                    <FontAwesomeIcon icon={faChevronDown} onClick={decrement}/>
                </div>
            </div>
        </div>
        <p className='font-normal text-center ms-[15px] lg:text-center lg:ms-[190px]'>$
            {
                price * qty
            }
        </p>
    </div>
  )
}

export default CartCard