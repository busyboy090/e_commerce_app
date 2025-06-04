import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProductToCart, removeProductFromCart, updateProductQuantity,clearCart, syncCartToDatabase, fetchCartFromDatabase } from "../store/cartSlice";

export const useCart = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart);

  
    return {
      ...cartState,
      addToCart: (id) => dispatch(addProductToCart(id)),
      removeFromCart: (id) => dispatch(removeProductFromCart(id)),
      updateCart: (id, q) => dispatch(updateProductQuantity({ productId: id, quantity: q })),
      clearCart: () => dispatch(clearCart()),
      fetchCartProducts: (ids) => dispatch(fetchProducts(ids)),
      syncCartToDatabase: (cartItems) => dispatch(syncCartToDatabase(cartItems)),
      fetchCartFromDatabase: () => dispatch(fetchCartFromDatabase())
    };
};
  