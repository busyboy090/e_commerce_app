import { React, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faEye as faEyeRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faEye as faEyeSolid,
  faStar,
  faStarHalfStroke
} from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import CartIcon from "../../assets/icons/cart-black-icon.svg";
import DeleteIcon from '../../assets/icons/icon-delete.svg';
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { useWishList } from "../../hooks/useWishList";

function ProductCard({ product, settings }) {
  const image = product?.product_colors[0]?.image;
  const price = product?.product_variants[0]?.price;
  const productId = product?.product_id;
  const name = product?.name
  const discount = 40;
  const newProduct = true

 const { addToCart } = useCart();
 const { addToWishList, removeFromWishList, wishList } = useWishList();

  // Check if product exists
  const productExists = (productId) => {
    wishList.some(item => item.productId === productId);
  }

  const productCard = useRef()

  const { view, wishlist, deleteBtn } = settings;
  const [isWishlisted, setIsWishlisted] = useState(productExists(productId));
  const [isViewed, setIsViewed] = useState(false);
  const imageContainer = useRef();

  const rendenderRatings = (ratings) => {
    let ratingsArray = [];
    const firstHalf = ratings.split(".")[0];
    const secondHalf = ratings.split(".")[1];

    if (firstHalf) {
      for (let i = 0; i < parseInt(firstHalf); i++) {
        ratingsArray.push(<FontAwesomeIcon key={i} icon={faStar} />);
      }
    }

    if (secondHalf === '5') {
      ratingsArray.push(<FontAwesomeIcon key={ratings} icon={faStarHalfStroke} />);
    }

    return ratingsArray;
  };

  <FontAwesomeIcon icon={faStarHalfStroke} />

  return (
    <div className="mt-[40px]" ref={productCard}>
      <div className="max-sm:w-[100%] snap-center w-[270px] bg-[#F5F5F5] h-[250px] relative rounded-[4px] overflow-hidden product-card">
        <div ref={imageContainer}>
          <img className="product-image" src={image} alt="Gamepad" onError={() => {
          imageContainer.current.classList.add('image-skeleton')
        }} />
        </div>
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
              onClick={() => {
                  setIsWishlisted(!isWishlisted)
                  if (!isWishlisted) {
                    // Add to wishlist logic here
                    addToWishList(productId)
                  } else {
                    // Remove from wishlist logic here
                    removeFromWishList(productId);
                    
                  }
                }
              }
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
              <button type='button' className='w-[34px] h-[34px] bg-[#FFFFFF] flex justify-center items-center rounded-full' 
              onClick={() => {
                removeFromWishList(productId)
                productCard.current.remove();
              }}>
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
        <button type="button" className="gap-[8px] add-to-cart bg-black h-[41px] w-[100%] text-white flex justify-center items-center absolute bg-opacity-50 rounded-b-[inherit]" onClick={() => {
          addToCart(productId)
          toast.success('Product added to cart successfully')
        }}>
          <img src={CartIcon} alt="Add To Cart" />
          <span className="text-[1rem]">Add To Cart</span>
        </button>
      </div>

      {/* product details */}
      <div className="mt-[16px] flex flex-col gap-[8px]">
        <p>{name}</p>
        <div className="flex gap-[12px]">
          <p className="text-[#DB4444] text-[1rem]">${price}</p>
          {discount ? <p className="line-through opacity-25">$160</p> : " "}
          {!discount ? (
            <ul className="flex gap-[4px]">
              {rendenderRatings(product?.averageRating).map((item, index) => {
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
            {rendenderRatings(product?.averageRating).map((item, index) => {
              return (
                <li className="text-[#FFAD33]" key={index}>
                  {item}
                </li>
              );
            })}

            <span className="ms-1">({product?.totalReviews})</span>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ProductCard;
