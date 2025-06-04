import { login, refreshToken, logout } from "../store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

function useAuth() {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  const loginUser = (user) => {
    dispatch(login(user));
  };

  const refreshUserToken = () => {
    return dispatch(refreshToken());
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    ...authState,
    login: loginUser,
    refreshToken: refreshUserToken,
    logout: logoutUser
  };
}

export default useAuth