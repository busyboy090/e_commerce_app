import React, { useState } from "react";
import SideImage from "@/assets/images/login-register-image.svg";
import TextInput from "@/components/Input/TextInput";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import CheckboxInput from "@/components/Input/CheckboxInput";
import GoogleLogin from "@/features/auth/components/GoogleLogin";
import auth from '@/services/auth.js';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/schemas";

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    try {
      const result = await auth.loginUser(data);
      login(result);
      toast.success(result?.msg);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.error || 'Login failed');
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[129px] mt-[60px] mb-[140px] lg:pe-[139px] md:px-[20px]">
        <img src={SideImage} alt="" className="lg:col-span-6 max-lg:hidden lg:h-[100%] object-cover" />
        <div className="max-lg:px-[20px] col-span-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-[10px] mb-[30px]">
              <h2 className="text-[2.25rem] text-center">Log in to Exclusive</h2>
              <p className="text-[1rem] text-center">Enter your details below</p>
            </div>
            <div className="flex flex-col gap-[15px]">
              <TextInput id='email' label='Email' {...register('email')} type='email' error={errors.email?.message} />
              <TextInput id='password' label='Password' {...register('password')} type='password' error={errors.password?.message} />
            </div>

            <div className="mt-[40px] flex justify-between items-center">
              <div className="flex items-center">
                <CheckboxInput label='Remember me' checked={rememberMe} onChange={setRememberMe} />
              </div>
              <Link to="/forgot-password" className="text-[#DB4444] block">Forgot Password?</Link>
            </div>

            <button type="submit" className="w-full bg-[#DB4444] mt-[40px] h-[56px] rounded-[4px] text-white flex items-center justify-center" disabled={isSubmitting}>
              {isSubmitting && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
              </svg>}
              Log In
            </button>

            <GoogleLogin />

            <p className="text-center mt-[20px]">Not a user? <Link to="/register" className="underline underline-offset-9 ms-2">Sign Up</Link> </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
