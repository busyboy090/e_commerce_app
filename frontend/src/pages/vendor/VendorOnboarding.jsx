import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import vendor from "@/services/vendor.js";
import PhoneInput from "react-phone-input-2";
import TextInput from "@/components/Input/TextInput";
import { CountryInput, BusinessTypeInput } from "@/components/components.jsx";
import { getUserCountry } from "@/utils/geolocation.js";
import { validateText, validateNumber } from "@/utils/validator.js";
import { useFormState } from "@/hooks/useFormState";

const validateVendor = (form) => ({
  business_name: validateText(form.business_name),
  business_type_id: validateNumber(form.business_type_id),
  address: validateText(form.address),
  phone: validateText(form.phone),
  country_id: validateNumber(form.country_id)
});

const VendorOnboarding = () => {
    const { formData: form, errors, loading, setLoading, handleChange, validateForm } = useFormState({
        business_name: "",
        business_type_id: null,
        country_id: null,
        address: "",
        phone: "",
    }, validateVendor);

    const navigate = useNavigate();
    const [countryCode, setCountryCode] = useState();

    useEffect(() => {
        getUserCountry()
          .then(data => setCountryCode(data.code))
          .catch(() => {});
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const isValid = validateForm();
        if (!isValid) return;
        try {
            await vendor.completeProfile(form);
            toast.success("Profile completed!");
            navigate("/vendor/dashboard");
        } catch (err) {
            toast.error(err?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-center">Complete Your Vendor Profile</h2>

        <TextInput id='business_name' label='Business Name' type='text' value={form.business_name} onChange={(e) => handleChange("business_name", e.target.value)}/>

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