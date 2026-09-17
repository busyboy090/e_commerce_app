import { login, refreshToken, logout, getUserInformations } from "@/store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartFromDatabase, syncCartToDatabase, clearCart } from "@/store/cartSlice.js";

function useAuth() {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const cartState = useSelector(state => state.cart);
  const cartItems = JSON.parse(localStorage.getItem('exclusive_cart'))

  const loginUser = (user) => {
    dispatch(login(user));
    if(cartItems) {
      dispatch(syncCartToDatabase(cartItems));
      dispatch(fetchCartFromDatabase())
    }
  };

  const refreshUserToken = () => {
    return dispatch(refreshToken());
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearCart())
  };

  return {
    ...authState,
    login: loginUser,
    refreshToken: refreshUserToken,
    logout: logoutUser,
    getUserDetails: () => dispatch(getUserInformations())
  };
}

export default useAuth
