import React from 'react';
import api from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

function GoogleLogin() {
    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handleOAuthSubmit = useGoogleLogin({
        onSuccess: async (googleResponse) => {
          const { access_token } = googleResponse;
    
          try {
            const response = await api.post('/auth/google-login',
              JSON.stringify({ token: access_token})
            )
    
            
            localStorage.setItem('authenticated', JSON.stringify(true));
    
            const token = response?.data?.access_token;
            const user = response?.data?.user
    
            login(response?.data);
    
            toast.success(response?.data?.msg);
    
            // Redirect
            navigate(from, { replace: true });
          } catch (err) {
            toast.error(err?.response?.data?.msg || 'Login failed');
          }
        }, 
        onError: () => toast.error('Google login failed')
      })

  return (
    <>
        <button onClick={handleOAuthSubmit} type='button' className="w-full flex justify-center items-center gap-[16px] mt-[16px] h-[56px] rounded-[4px] border border-[rgba(0,0,0,0.4)]">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="size-[24px]" />
            <span className="text-[1rem]">Sign in with Google</span>
        </button>
    </>
  )
}

export default GoogleLogin