import React, { useEffect, useState, useRef } from "react";
import SideImage from "../../assets/images/login-register-image.svg";
import PhoneInput from "react-phone-input-2";
import './register.css';
import { validateEmail, validatePassword, validateText } from "../../utils/validator";
import { InputField } from "./components";
import api from '../../api/axios';
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";


function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    phone: false
  })

  const [message, setMessage] = useState('');
  const isValid = useRef(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'

  const handleChange = (field,value) => {
    setFormData((prev) => ({...prev, [field]: value}));
  }

  const validateForm = () => {
    const {first_name,last_name,email,password,confirm_password,phone} = formData;

    let newErrors = {
      first_name: validateText(first_name),
      last_name: validateText(last_name),
      email: validateEmail(email),
      password: validatePassword(password, confirm_password),
      phone: validateText(phone)
    }

    setErrors(newErrors);

    isValid.current = Object.values(newErrors).every(value => value === true);
  }

  // submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    if(!isValid.current) return

    try {
  
      const response = await api.post('/auth/register',
        JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );      

      // show notification
      toast.success(response?.data?.msg);

      // Redirect to login page
      window.location.href = '/login'
      

    } catch (err) {
      console.error(err);

      // show notification
      toast.error(err?.response?.data?.msg);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[129px] mt-[60px] mb-[140px] lg:pe-[139px] md:px-[20px]">
        <img src={SideImage} alt="" className="lg:col-span-6 max-lg:hidden lg:h-[100%] object-cover" />
        <div className="max-lg:px-[20px] col-span-4">
          {/* Registration form */}
          <form onSubmit={handleSubmit}>
            <h2 className="text-[2.25rem] mb-[24px] max-md:text-center">Create an account</h2>
            <p className="text-[1rem] max-md:text-center">Enter your details below</p>
            <div className="flex flex-col gap-[15px]">

              {/* first name input */}
              <InputField id='first_name' label='Firstname' onChange={(e) => handleChange('first_name', e.target.value)} inputType='text' value={formData.first_name} />
              {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}
              
              {/* first name input */}
              <InputField id='last_name' label='Lastname'  onChange={(e) => handleChange('last_name', e.target.value)} inputType='text' value={formData.last_name} />
              {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}

              {/* email input */}
              <InputField id='email' label='Email'  onChange={(e) => handleChange('email', e.target.value)} inputType='email'  value={formData.email}/>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

              {/* phone input */}
              <PhoneInput country={"ng"}  onChange={(value) => handleChange('phone', value)} className='phone' value={formData.phone} />
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

              {/* password input */}
              <InputField id='password' label='Password' onChange={(e) => handleChange('password', e.target.value)} inputType='password' value={formData.password} />
              {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

              {/* confirm password input */}
              <InputField id='confirmation_password' label='Confrim Password' onChange={(e) => handleChange('confirm_password', e.target.value)} inputType='password' value={formData.confirm_password} />
              {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

            </div>

            {/* Create account button to submit the form */}
            <button type="submit" className={`w-full bg-[#DB4444] mt-[40px] h-[56px] rounded-[4px] text-white flex items-center justify-center`} disabled={loading} >
              <svg aria-hidden="true" role="status" className={`${loading ? 'inline' : 'hidden'} w-4 h-4 mr-3 text-white animate-spin`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
              </svg>
              Create Account
            </button>

            {/* signin with Google */}
            <GoogleLogin />

            <p className="text-center mt-[20px]">Already have an account? <a href="/login" className="underline underline-offset-9 ms-2">Log in</a> </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
