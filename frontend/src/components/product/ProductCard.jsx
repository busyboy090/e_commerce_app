import {React, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular, faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid, faEye as faEyeSolid, faStar } from "@fortawesome/free-solid-svg-icons";
import Gamepad from '../../assets/products/Gamepad.svg';
import './ProductCard.css';

function ProductCard(props) {
    const {image, name, discount, price, ratings} = props;
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isViewed, setIsViewed] = useState(false);

    const rendenderRatings = (ratings) => {
        let ratingsArray = [];
        for (let i = 0; i < ratings; i++) {
            ratingsArray.push(<FontAwesomeIcon key={i} icon={faStar} />);
        }
        return ratingsArray;
    }

  return (
    <div className='mt-[40px]'>
        <div className='max-sm:w-[100%] w-[270px] bg-[#F5F5F5] h-[250px] relative rounded-[4px]'>
            <img className='product-image' src={Gamepad} alt="Gamepad" />
            <p className='discount absolute top-[12px] left-[12px] w-[55px] h-[26px] bg-[#DB4444] flex justify-center items-center text-white rounded-[4px] text-[0.75rem]'>
                -40%
            </p>

            <div className='absolute top-[12px] right-[12px] flex flex-col gap-[8px]'>
                {/* wishlist icon */}
                <button  className={`wishlist w-[34px] h-[34px] bg-[#FFFFFF] ${isWishlisted ? 'text-[#DB4444]': ''} flex justify-center items-center font-[] rounded-full`} onClick={() => setIsWishlisted(!isWishlisted)}>
                    <FontAwesomeIcon icon={isWishlisted ? faHeartSolid : faHeartRegular}  />
                </button>

                {/* view */}
                <button  className='view w-[34px] h-[34px] bg-[#FFFFFF] flex justify-center items-center font-[] rounded-full' onClick={() => setIsViewed(!isViewed)}>
                    <FontAwesomeIcon icon={isViewed ? faEyeSolid : faEyeRegular} />
                </button>
            </div>
        </div>

        {/* product details */}
        <div className='mt-[16px] flex flex-col gap-[8px]'>
            <p>HAVIT HV-G92 Gamepad</p>
            <div className='flex gap-[12px]'>
                <p className='text-[#DB4444] text-[1rem]'>${120}</p>
                <p className='line-through opacity-25'>$160</p>
            </div>
            <ul className='flex gap-[4px]'>
                {rendenderRatings(5).map((item, index) =>{
                    return <li className='text-[#FFAD33]' key={index}>{item}</li>
                })}

                <span className='ms-1'>(88)</span>
            </ul>
        </div>
    </div>
  )
}

export default ProductCard