import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faEye as faEyeRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faEye as faEyeSolid,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import CartIcon from "../../assets/icons/cart-black-icon.svg";
import DeleteIcon from '../../assets/icons/icon-delete.svg';

function ProductCard(props) {
  const { image, name, discount, price, ratings, newProduct, view, wishlist, deleteBtn } =
    props;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isViewed, setIsViewed] = useState(false);

  const rendenderRatings = (ratings) => {
    let ratingsArray = [];
    for (let i = 0; i < ratings; i++) {
      ratingsArray.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
    return ratingsArray;
  };

  return (
    <div className="mt-[40px]">
      <div className="max-sm:w-[100%] snap-center w-[270px] bg-[#F5F5F5] h-[250px] relative rounded-[4px] overflow-hidden product-card">
        <img className="product-image" src={image} alt="Gamepad" />
        {discount ? (
          <p className="discount absolute top-[12px] left-[12px] w-[55px] h-[26px] bg-[#DB4444] flex justify-center items-center text-white rounded-[4px] text-[0.75rem]">
            -40%
          </p>
        ) : (
          ""
        )}

        {newProduct ? (
          <p className="discount absolute top-[12px] left-[12px] w-[55px] h-[26px] bg-[#00FF66] flex justify-center items-center text-white rounded-[4px] text-[0.75rem]">
            New
          </p>
        ) : (
          ""
        )}

        <div className="absolute top-[12px] right-[12px] flex flex-col gap-[8px]">
          {/* wishlist icon */}
          { wishlist ? (
            <button
              className={`wishlist w-[34px] h-[34px] bg-[#FFFFFF] ${
                isWishlisted ? "text-[#DB4444]" : ""
              } flex justify-center items-center font-[] rounded-full`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FontAwesomeIcon
                icon={isWishlisted ? faHeartSolid : faHeartRegular}
              />
            </button>
          ) : (
            ""
          )}


          {/* Delete button */}
          {
            deleteBtn ? (
              <button type='button' className='w-[34px] h-[34px] bg-[#FFFFFF] flex justify-center items-center rounded-full'>
                <img src={DeleteIcon} alt="" />
              </button>
            ) : ''
          }

          {/* view */}
          {
            view ? (
              <button
                className="view w-[34px] h-[34px] bg-[#FFFFFF] flex justify-center items-center rounded-full"
                onClick={() => setIsViewed(!isViewed)}
              >
                <FontAwesomeIcon icon={isViewed ? faEyeSolid : faEyeRegular} />
              </button>
            ) : ''
          }
        </div>
        <div className="add-to-cart bg-black h-[41px] w-[100%] text-white flex justify-center items-center absolute bg-opacity-50 rounded-b-[inherit]">
          <div className="flex gap-[8px]">
            <img src={CartIcon} alt="Add To Cart" />
            <span className="text-[1rem]">Add To Cart</span>
          </div>
        </div>
      </div>

      {/* product details */}
      <div className="mt-[16px] flex flex-col gap-[8px]">
        <p>{name}</p>
        <div className="flex gap-[12px]">
          <p className="text-[#DB4444] text-[1rem]">${120}</p>
          {discount ? <p className="line-through opacity-25">$160</p> : " "}
          {!discount ? (
            <ul className="flex gap-[4px]">
              {rendenderRatings(5).map((item, index) => {
                return (
                  <li className="text-[#FFAD33]" key={index}>
                    {item}
                  </li>
                );
              })}
              <span className="ms-1">(88)</span>
            </ul>
          ) : (
            ""
          )}
        </div>
        {discount ? (
          <ul className="flex gap-[4px]">
            {rendenderRatings(5).map((item, index) => {
              return (
                <li className="text-[#FFAD33]" key={index}>
                  {item}
                </li>
              );
            })}

            <span className="ms-1">(88)</span>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ProductCard;
