import React, { useState, useEffect } from "react";
import SideImage from "@/assets/images/login-register-image.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./register.css";
import TextInput from "@/components/Input/TextInput";
import { CountryInput } from "@/components/components.jsx";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import GoogleLogin from "@/features/auth/components/GoogleLogin.jsx";
import auth from "@/services/auth.js";
import { getUserCountry } from "@/utils/geolocation.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/schemas";

function Form({ onSubmit }) {
  const [countryCode, setCountryCode] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
      country_id: null,
    },
  });

  useEffect(() => {
    getUserCountry()
      .then((data) => setCountryCode(data?.code || ""))
      .catch(() => {});
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl mb-6 text-center">Create an account</h2>
      <p className="text-center mb-6">Enter your details below</p>

      <div className="flex flex-col gap-4">
        <TextInput id="first_name" label="Firstname" {...register("first_name")} error={errors.first_name?.message} />

        <TextInput id="last_name" label="Lastname" {...register("last_name")} error={errors.last_name?.message} />

        <TextInput id="email" label="Email" type="email" {...register("email")} error={errors.email?.message} />

        <div className="flex flex-col gap-1 phone-input-container">
          <label htmlFor="phone" className="text-[rgba(0,0,0,0.5)]">Phone Number</label>
          <PhoneInput
            country={countryCode ? countryCode.toLowerCase() : "us"}
            value={watch("phone")}
            onChange={(value) => setValue("phone", value, { shouldValidate: true })}
            enableSearch
            inputProps={{ name: "phone", id: "phone" }}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <TextInput id="password" label="Password" type="password" {...register("password")} error={errors.password?.message} />

        <TextInput id="confirm_password" label="Confirm Password" type="password" {...register("confirm_password")} error={errors.confirm_password?.message} />

        <div>
          <CountryInput handleChange={(val) => setValue("country_id", val?.country_id, { shouldValidate: true })} />
          {errors.country_id && <p className="text-red-500 text-sm mt-1">{errors.country_id.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#DB4444] hover:bg-[#c93535] transition-colors mt-6 h-14 rounded text-white flex items-center justify-center font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <svg aria-hidden="true" role="status" className="w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>
        )}
        Create Account
      </button>

      <div className="mt-4">
        <GoogleLogin />
      </div>
    </form>
  );
}

function Register() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let result;
      if (role === "customer") {
        result = await auth.registerCustomer(data);
      } else {
        result = await auth.registerVendor(data);
      }
      toast.success(result?.msg || "Registration successful!");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err?.msg || err?.message || "Registration failed");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-[129px] mt-[60px] mb-[140px] lg:pe-[139px] md:px-[20px]">
      <img src={SideImage} alt="Register backdrop" className="lg:col-span-6 max-lg:hidden lg:h-full object-cover" />

      <div className="max-lg:px-[20px] col-span-4 flex flex-col">
        {step === 0 ? (
          <div className="flex flex-col">
            <h3 className="text-2xl font-medium mb-2">Choose account type</h3>
            <p className="text-gray-500 mb-6">Select how you would like to use the platform</p>

            <div className="flex flex-col gap-4">
              <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${role === "customer" ? "border-[#DB4444] bg-red-50/20" : "border-gray-200 hover:border-gray-300"}`}>
                <input type="radio" name="role" value="customer" onChange={() => setRole("customer")} checked={role === "customer"} className="accent-[#DB4444]" />
                <span className="flex items-center gap-2 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.2 6h12.4l-1.2-6M9 21h.01M15 21h.01" />
                  </svg>
                  I'm a Customer
                </span>
              </label>

              <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${role === "vendor" ? "border-[#DB4444] bg-red-50/20" : "border-gray-200 hover:border-gray-300"}`}>
                <input type="radio" name="role" value="vendor" onChange={() => setRole("vendor")} checked={role === "vendor"} className="accent-[#DB4444]" />
                <span className="flex items-center gap-2 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M11 11V3H5v8h6zM19 21V10h-6v11h6zM5 21h6v-5H5v5z" />
                  </svg>
                  I'm a Vendor
                </span>
              </label>

              <button type="button" className="bg-[#DB4444] hover:bg-[#c93535] transition-colors text-white py-3 mt-2 rounded font-medium" onClick={() => setStep(1)}>
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => setStep(0)} className="text-sm text-gray-500 hover:text-black mb-4 inline-flex items-center gap-1">
              &larr; Back to account type
            </button>
            <Form onSubmit={onSubmit} />
          </div>
        )}

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="underline text-black font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
