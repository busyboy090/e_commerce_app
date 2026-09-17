import React, { useState, useRef, useEffect } from "react";
import SideImage from "@/assets/images/login-register-image.svg";
import PhoneInput from "react-phone-input-2";
import './register.css';
import { validateEmail, validatePassword, validateText, validateNumber } from "@/utils/validator.js";
import TextInput from "@/components/ui/TextInput";
import { CountryInput } from "@/features/components.jsx";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import GoogleLogin from "@/features/auth/GoogleLogin.jsx";
import auth from '@/api/auth.js';
import { getUserCountry } from "@/utils/geolocation.js";

function Form ({ handleChange, handleSubmit, formData, loading, errors}) {
  const [countryCode, setCountryCode] = useState('');
  useEffect(() => {
    getUserCountry()
      .then(data => setCountryCode(data?.code))
      .catch(() => {});
  },[])
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl mb-6 text-center">Create an account</h2>
      <p className="text-center mb-6">Enter your details below</p>

      <div className="flex flex-col gap-4">
        <TextInput id='first_name' label='Firstname' onChange={(e) => handleChange('first_name', e.target.value)} type='text' value={formData.first_name} />
        {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}

        <TextInput id='last_name' label='Lastname' onChange={(e) => handleChange('last_name', e.target.value)} type='text' value={formData.last_name} />
        {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}

        <TextInput id='email' label='Email' onChange={(e) => handleChange('email', e.target.value)} type='email' value={formData.email} />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <PhoneInput country={countryCode.toLowerCase()} onChange={(value) => handleChange('phone', value)} className='phone' value={formData.phone} />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}

        <TextInput id='password' label='Password' onChange={(e) => handleChange('password', e.target.value)} type='password' value={formData.password} />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <TextInput id='confirmation_password' label='Confirm Password' onChange={(e) => handleChange('confirm_password', e.target.value)} type='password' value={formData.confirm_password} />

        {/* Country Dropdown */}
        <CountryInput handleChange={handleChange}/>
        {errors.country_id && <p className="text-red-500">{errors.country_id}</p>}
      </div>

      <button type="submit" className="w-full bg-[#DB4444] mt-6 h-14 rounded text-white flex items-center justify-center" disabled={loading}>
        {loading && <svg aria-hidden="true" role="status" className="w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none">
          <path d="M100 50.5908C100 78.2051..." fill="currentColor" />
        </svg>}
        Create Account
      </button>

      <GoogleLogin />
    </form>
  )
}


function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    country_id: null
  });

  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    phone: false,
    country_id: false
  });

  const isValid = useRef(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('customer');


  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';


  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { first_name, last_name, email, password, confirm_password, phone, country_id } = formData;
    const newErrors = {
      first_name: validateText(first_name),
      last_name: validateText(last_name),
      email: validateEmail(email),
      password: validatePassword(password, confirm_password),
      phone: validateText(phone),
      country_id: validateNumber(country_id)
    };
    setErrors(newErrors);
    isValid.current = Object.values(newErrors).every(value => value === true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    validateForm();
    if (!isValid.current) return;

    try {
      if(step === 2) {
        let data;
        if(role === 'customer') {
          data = await auth.registerCustomer(formData)
        }else {
          data = await auth.registerVendor(formData)
        }

        toast.success(data?.msg);
        window.location.href = '/login';
      }
    } catch (err) {
      toast.error(err?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-[129px] mt-[60px] mb-[140px] lg:pe-[139px] md:px-[20px]">
      <img src={SideImage} alt="" className="lg:col-span-6 max-lg:hidden lg:h-full object-cover" />

      <div className="max-lg:px-[20px] col-span-4">
        {step === 1 ? (
          <div className="flex flex-col justify-center h-full">
            <h3 className="text-2xl mb-5">Choose account type</h3>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 text-xl">
                <input type="radio" name="role" value="customer" onChange={() => setRole('customer')} checked={role === 'customer'} />
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.2 6h12.4l-1.2-6M9 21h.01M15 21h.01" />
                  </svg>
                  I'm a Customer
                </span>
              </label>

              <label className="flex items-center gap-3 text-xl">
                <input type="radio" name="role" value="vendor" onChange={() => setRole('vendor')} checked={role === 'vendor'} />
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M11 11V3H5v8h6zM19 21V10h-6v11h6zM5 21h6v-5H5v5z" />
                  </svg>
                  I'm a Vendor
                </span>
              </label>

              <button className="bg-[#DB4444] text-white py-2 rounded" onClick={() => setStep(1)}>Continue</button>
            </div>
          </div>
        ) : <Form handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} formData={formData} loading={loading} />}
        <p className="text-center mt-6">Already have an account? <a href="/login" className="underline">Log in</a></p>
      </div>
    </div>
  );
}

export default Register;