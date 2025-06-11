import { useDispatch, useSelector } from "react-redux";
import { 
  fetchProducts, 
  addProductToCart, 
  removeProductFromCart, 
  updateProductQuantity,
  clearCart, 
  syncCartToDatabase, 
  fetchCartFromDatabase, 
  deleteCartProductFromDatabase, 
  updateCartProductQuantity 
} from "../store/cartSlice";

export const useCart = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart);
    const authState = useSelector(state => state.auth);
    const isAuthenticated = authState.isAuthenticated;

    function addToCart (productId,quantity) {
      if(isAuthenticated) {
        dispatch(syncCartToDatabase([
          {
            productId,
            quantity
          }
        ]));
      }else {
        dispatch(addProductToCart(productId))
      }
    }
  
    function removeFromCart (productId) {
      if(isAuthenticated) {
        dispatch(deleteCartProductFromDatabase(productId))
      }else {
        dispatch(removeProductFromCart(productId))
      }
    }

    function updateCart (productId,quantity) {
      if(isAuthenticated) {
        dispatch(updateCartProductQuantity({productId,quantity}))
      }else {
        dispatch(updateProductQuantity({ productId, quantity}))
      }
    }
  
    return {
      ...cartState,
      addToCart,
      removeFromCart,
      updateCart,
      clearCart: () => dispatch(clearCart()),
      fetchCartProducts: (ids) => dispatch(fetchProducts(ids)),
      syncCartToDatabase: (cartItems) => dispatch(syncCartToDatabase(cartItems)),
      fetchCartFromDatabase: () => dispatch(fetchCartFromDatabase()),
    };
};
  