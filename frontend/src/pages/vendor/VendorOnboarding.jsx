import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import vendor from "@/api/vendor.js";
import PhoneInput from "react-phone-input-2";
import { InputField, CountryInput, BusinessTypeInput } from "@/features/components.jsx";
import { getUserCountry } from "@/utils/geolocation.js";

const VendorOnboarding = () => {
    const [form, setForm] = useState({
        business_name: "",
        business_type_id: null,
        country_id: null,
        address: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        business_name: false,
        business_type_id: false,
        address: false,
        phone: false,
        country_id: false
    });

    const isValid = useRef(false);

      const validateForm = () => {
        const { business_name, business_type_id, phone, country_id } = formData;
        const newErrors = {
          business_name_name: validateText(business_name),
          business_type_id: validateNumber(business_type_id),
          address: validateText(form.address),
          phone: validateText(phone),
          country_id: validateNumber(country_id)
        };
        setErrors(newErrors);
        isValid.current = Object.values(newErrors).every(value => value === true);
      };

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const [countryCode, setCountryCode] = useState();

      useEffect(() => {
        getUserCountry()
          .then(data => setCountryCode(data.code))
          .catch(err => console.log(err));
      },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        validateForm();
        if (!isValid.current) return;
        try {
            await vendor.completeProfile(form);
            toast.success("Profile completed!");
            navigate("/vendor/dashboard");
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Something went wrong");
        } finally {
        setLoading(false);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-center">Complete Your Vendor Profile</h2>

        <InputField id='business_name' label='Business Name' inputType='text' value={form.business_name} onChange={(e) => handleChange("business_name", e.target.value)}/>

        <BusinessTypeInput handleChange={handleChange} />

        <PhoneInput country={countryCode.toLowerCase()} onChange={(value) => handleChange('phone', value)} className='phone' value={form.phone} />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}

        <CountryInput handleChange={handleChange}/>
        {errors.country_id && <p className="text-red-500">{errors.country_id}</p>}

        <div>
          <label className="block mb-1 text-gray-300">Business Address</label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-0"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#DB4444] text-white py-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          {loading ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
};

export default VendorOnboarding;