import React, {useState, useRef, useEffect } from "react";
import SideImage from "../../assets/images/login-register-image.svg";
import { InputField } from "./components";
import { validateText } from "../../utils/validator";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../api/axios';
import useAuth from "../../hooks/useAuth";
import { CheckboxField } from "../account/address-book/AddressForm";
import { encryptData, decryptData} from "../Encryption";
import GoogleLogin from "./GoogleLogin";


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })

  useEffect(() => {
    if(localStorage.getItem('password') && localStorage.getItem('email') ) {
      handleChange('email', decryptData('email'));
      handleChange('password', decryptData('password'));
      setRememberMe(true);
    }
  
  }, [])

  const isValid = useRef(false);
  const [loading, setLoading] = useState(false);

  const  { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'
  
  const handleChange = (field,value) => {
    setFormData((prev) => ({...prev, [field]: value}));
  }

  // validate the form to check for errors
  const validateForm = () => {
    const {email,password} = formData;

    let newErrors = {
      email: validateText(email),
      password: validateText(password),
    }

    setErrors(newErrors);

    isValid.current = Object.values(newErrors).every(value => value === true);
  }

  // submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    validateForm();

    if(!isValid.current) {
      setLoading(false);

      return
    }

    try {
        
      const response = await api.post('/auth/login',
        JSON.stringify({
          email: formData.email,
          password: formData.password
        }),{
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
  
      const access_token = response?.data?.access_token;
      const user = response?.data?.user;

      if(response.status === 200) {
        localStorage.setItem('authenticated', JSON.stringify(true));
        // store the user credentials when the remember me functionality is checked
          if(rememberMe === true) {
            encryptData(formData.email, 'email')
            encryptData(formData.password, 'password')
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          }

      }

      // save the userdetais
      login(response?.data);

      // show notification
      toast.success(response?.data?.msg);

      // Redirect
      navigate(from, { replace: true });

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[129px] mt-[60px] mb-[140px] lg:pe-[139px] md:px-[20px]">
        <img src={SideImage} alt="" className="lg:col-span-6 max-lg:hidden lg:h-[100%] object-cover" />
        <div className="max-lg:px-[20px] col-span-4">
          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>
            <h2 className="text-[2.25rem] mb-[24px] max-md:text-center">Log in to Exclusive</h2>
            <p className="text-[1rem] max-md:text-center">Enter your details below</p>
            <div className="flex flex-col gap-[15px]">
              {/* email input */}
              <InputField id='email' label='Email'  onChange={(e) => handleChange('email', e.target.value)} inputType='email'  value={formData.email}/>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              {/* password input */}
              <InputField id='password' label='Password' onChange={(e) => handleChange('password', e.target.value)} inputType='Password' value={formData.password} />
              {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            </div>

            <div className="mt-[40px] flex justify-between items-center">
                {/* Remember me checkbox */}
                <div className="flex items-center">
                    <CheckboxField label='Remember me' checked={rememberMe} onChange={setRememberMe}/>
                </div>

                {/* Forgot password */} 
                <a href={`/forgot-password?email=${formData.email}`} className="text-[#DB4444] block">Forgot Password?</a>
            </div>

            {/* login button to submit the Form */}
            <button type="submit" className={`w-full bg-[#DB4444] mt-[40px] h-[56px] rounded-[4px] text-white flex items-center justify-center`} disabled={loading} >
              <svg aria-hidden="true" role="status" className={`${loading ? 'inline' : 'hidden'} w-4 h-4 mr-3 text-white animate-spin`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
              </svg>
              Log In
            </button>

            {/* signin with Google */}
            <GoogleLogin />
              

            {/* signup link */}
            <p className="text-center mt-[20px]">Not a user? <a href="/register" className="underline underline-offset-9 ms-2">Sign Up</a> </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
