import {useContext} from 'react'
import { AuthContext } from '../components/auth/AuthProvider'

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth