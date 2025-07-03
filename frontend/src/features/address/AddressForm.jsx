import React, { useEffect, useState, useRef } from "react";
import "react-phone-input-2/lib/style.css";
import CheckboxInput from "@/components/ui/CheckboxInput";
import { CountryInput, StateInput, CityInput } from '@/features/components';
import country from "@/api/country";
import { validateText, validateNumber } from '@/utils/validator.js'
import { PhoneInputField } from "../components";
import{ useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Reusable InputField
function InputField({ label, id, value, onChange }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
      />
    </div>
  );
}

//Main Address Form
export function AddressForm({ initialData = {}, mode = 'add', handleSubmit}) {
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || "",
    last_name: initialData?.last_name || "",
    country_id: initialData?.country_id || null,
    state_id: initialData?.state_id || null,
    city_id: initialData?.city_id || null,
    phone_number: initialData?. phone_number || "",
    additional_phone_number: initialData?.phone_number || "",
    address: initialData?.address || "",
    additional_information: initialData?.additional_information || "",
    is_default: initialData?.is_default || false,
  });
  const isValid = useRef(false);

  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    country_id: false,
    state_id: false,
    city_id: false,
    phone_number: false,
    additional_phone_number: false,
    additional_information: false,
    address: false,
  });

  const [countryCode, setCountryCode] = useState('');

  const handleChange = (field,value) => {
    setFormData((prev) => ({...prev, [field]: value}));
  }

  const navigate = useNavigate();

  //Validate fields
  const validateForm = () => {
    const newErrors = {
      first_name: validateText(formData.firstName),
      last_name: validateText(formData.lastName),
      country_id: validateNumber(formData.country_id),
      state_id: validateNumber(formData.state_id),
      city_id: validateNumber(formData.city_id),
      phone_number: validateText(formData.phone_number),
      additional_phone_number: validateText(formData.additional_phone_number),
      additional_information: validateText(formData.additional_information),
      address: validateText(formData.address),
    };
    setErrors(newErrors);
    isValid.current = Object.values(newErrors).every(Boolean);
  };

  const handleCancel = () => {
    navigate('/account/addresses')
  }

  //Submit handler
  const submit = (e) => {
    e.preventDefault();
    validateForm();
    if (!isValid.current) return;
    handleSubmit(formData);
  };

  return (
    <form onSubmit={submit}>
      {/* First + Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <InputField
            label="First Name"
            id="first-name"
            value={formData.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
          {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
        </div>
        <div>
          <InputField
            label="Last Name"
            id="last-name"
            value={formData.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
          {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
        </div>
      </div>

      {/* Country, State, Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <CountryInput handleChange={handleChange} value={formData.country_id} setCountryCode={setCountryCode}/>
          {errors.country_id && <p className="text-red-500">{errors.country_id}</p>}
        </div>
        <div>
          <StateInput handleChange={handleChange} value={formData.state_id} country_id={formData.country_id}/>
          {errors.state_id && <p className="text-red-500">{errors.state_id}</p>}
        </div>
        <div>
          <CityInput handleChange={handleChange} value={formData.city_id} state_id={formData.state_id}/>
          {errors.city_id && <p className="text-red-500">{errors.city_id}</p>}
        </div>
        <div>
          <PhoneInputField
            label="Phone Number"
            id="phone"
            country={countryCode}
            value={formData.phone_number}
            onChange={(value) => handleChange("phone_number", value)}
          />
          {errors.phone_number && <p className="text-red-500">{errors.phone_number}</p>}
        </div>
        <div>
          <PhoneInputField
            label="Additional Phone (optional)"
            id="phone2"
            country={countryCode}
            value={formData.additional_phone_number}
            onChange={(value) => handleChange("additional_phone_number", value)}
          />
          {errors.additional_phone_number && <p className="text-red-500">{errors.additional_phone_number}</p>}
        </div>
      </div>

      {/* Address + Notes */}
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <InputField
            label="Address"
            id="address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <div>
          <InputField
            label="Additional Information"
            id="additional-info"
            value={formData.additional_information}
            onChange={(e) => handleChange("additional_information", e.target.value)}
          />
          {errors.additional_information && <p className="text-red-500">{errors.additional_information}</p>}
        </div>
      </div>

      {/* Default Address */}
      <div className="mt-4">
        <CheckboxInput
          label="Set as Default Address"
          checked={formData.is_default}
          onChange={() => handleChange("is_default", !formData.is_default)}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <button type="button" onClick={() => {
          handleCancel()
        }}>
          Cancel
        </button>
        <button
          type="submit"
          className="text-white bg-[#DB4444] w-[150px] h-[56px] rounded"
        >
          { mode === 'edit' ? 'Update Address' : 'Add Address' }
        </button>
      </div>
    </form>
  );
}

export default AddressForm;