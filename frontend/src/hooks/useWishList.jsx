import { useSelector, useDispatch } from 'react-redux';
import {
  addToWishList,
  removeFromWishList,
  fetchProducts
} from '@/store/wishListSlice';

export const useWishList = () => {
    const dispatch = useDispatch();
    const wishList = useSelector(state => state.wishList);

  return {
    ...wishList,
    addToWishList: (productId) => dispatch(addToWishList(productId)),
    removeFromWishList: (productId) => dispatch(removeFromWishList(productId)),
    fetchWishListProducts: (ids) => dispatch(fetchProducts(ids)),
  }
}