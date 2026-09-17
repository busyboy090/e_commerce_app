import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartRegular,
  faEye as faEyeRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faEye as faEyeSolid,
} from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import CartIcon from "@/assets/icons/cart-black-icon.svg";
import DeleteIcon from '@/assets/icons/icon-delete.svg';
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import { useWishList } from "@/hooks/useWishList";
import Ratings from '@/components/Ratings/Ratings';
import DiscountBadge from '@/components/common/DiscountBadge';

 function ProductCard({ product, settings }) {
  const navigate = useNavigate();
  const image = product?.product_colors[0]?.image;
  const price = product?.product_variants[0]?.price;
  const productId = product?.product_id;
  const name = product?.name
  const discount = product?.discount || 0;
  const isNew = product?.isNew || false;

 const { addToCart } = useCart();
 const { addToWishList, removeFromWishList, wishList } = useWishList();


  // Check if product exists in wishlist
  const productExists = (productId) => {
    return wishList.some(item => item.productId === productId);
  }

  const { view, wishlist, deleteBtn } = settings;
  const [isWishlisted, setIsWishlisted] = useState(productExists(productId));
  const [isViewed, setIsViewed] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) return null;

  return (
    <div className="mt-[40px]">
      <div className="max-sm:w-[100%] snap-center w-[270px] bg-[#F5F5F5] h-[250px] relative rounded-[4px] overflow-hidden product-card">
        <div onClick={() => {
          navigate(`/product/${productId}`); 
        }}>
          <img className={`product-image ${imgError ? 'image-skeleton' : ''}`} src={image} alt={name || 'Product image'} onError={() => {
          setImgError(true)
        }} />
        </div>
        <DiscountBadge discount={discount} isNew={isNew} />

        <div className="absolute top-[12px] right-[12px] flex flex-col gap-[8px]">
          {/* wishlist icon */}
          { wishlist ? (
            <button
              className={`wishlist w-[34px] h-[34px] bg-[#FFFFFF] ${
                isWishlisted ? "text-[#DB4444]" : ""
              } flex justify-center items-center font-[] rounded-full`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
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
              aria-label="Remove from wishlist"
              onClick={() => {
                removeFromWishList(productId)
                setIsDeleted(true);
              }}>
                <img src={DeleteIcon} alt="Remove from wishlist" />
              </button>
            ) : ''
          }

          {/* view */}
          {
            view ? (
              <button
                className="view w-[34px] h-[34px] bg-[#FFFFFF] flex justify-center items-center rounded-full"
                aria-label="Quick view"
                onClick={() => setIsViewed(!isViewed)}
              >
                <FontAwesomeIcon icon={isViewed ? faEyeSolid : faEyeRegular} />
              </button>
            ) : ''
          }
        </div>
        <button type="button" className="gap-[8px] add-to-cart bg-black h-[41px] w-[100%] text-white flex justify-center items-center absolute bg-opacity-50 rounded-b-[inherit]" onClick={(e) => {
          addToCart(productId, 1)

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
          {discount ? <p className="line-through opacity-25">${(price / (1 - discount / 100)).toFixed(2)}</p> : " "}
          <Ratings ratings={product?.averageRating} />
          <span className="ms-1">({discount ? product?.totalReviews : 88})</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
