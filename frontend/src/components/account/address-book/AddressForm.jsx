import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import WhiteTick from "../../../assets/icons/white-tick.svg";
import { useNavigate } from "react-router-dom";

// Reusable InputField Component
function InputField({ label, id, value, onChange }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
        onChange={onChange}
      />
    </div>
  );
}

// Reusable SelectField Component
function SelectField({ label, id, value, dropdown, handleChange, onChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id}>{label}</label>
      <div className="relative group">
        <div className="select-field-container h-[56px] flex justify-between items-center border border-slate-500 p-[10px] rounded-[4px] cursor-pointer">
          <input
            type="text"
            id={id}
            value={value}
            onChange={onChange}
            className="w-full focus:outline-none"
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
          />
        </div>
        <div
          className={`select-field-dropdown ${
            isDropdownOpen ? "flex" : "hidden"
          } group-focus-within:flex absolute w-full bg-white shadow-lg mt-[5px] rounded-[4px] z-10`}
        >
          {dropdown &&
            dropdown.map((item, index) => (
              <button
                key={index}
                className="p-[10px] hover:bg-[#F5F5F5] cursor-pointer"
                onClick={() => {
                  handleChange(id, item.name);
                  setIsDropdownOpen(false);
                }}
              >
                {item.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

// Reusable PhoneInputField Component
function PhoneInputField({ label, id, country, value, onChange }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id}>{label}</label>
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        placeholder="Enter phone number"
        enableSearch={true}
      />
    </div>
  );
}

// Reusable CheckboxField Component
function CheckboxField({ label, checked, onChange }) {
  return (
    <div className="flex gap-[16px] items-center mt-[16px]">
      <div className="relative mt-[6px]">
        <input
          type="checkbox"
          className="bg-[#DB4444] appearance-none h-[24px] w-[24px] rounded-[4px]"
          checked={checked}
          onChange={onChange}
        />
        <img
          src={WhiteTick}
          alt=""
          className={`${
            checked ? "block" : "hidden"
          } absolute top-[40%] left-[50%] translate-[-50%]`}
          onClick={onChange}
        />
      </div>
      <label>{label}</label>
    </div>
  );
}

// AddressForm Component
export function AddressForm({ initialValues, onSubmit }) {
    const navigate = useNavigate();
  const isoCode = (place, location, countryName) => {
    if (place == "country") {
        const countryCode = Country.getAllCountries().find(
            (c) => c.name === location
        )?.isoCode;

      return countryCode;
    } else if (place == "state") {
        const countryCode = isoCode('country',countryName)
        const stateCode = State.getStatesOfCountry(countryCode).find(
            (s) => s.name.toLowerCase() === location.toLowerCase()
        )?.isoCode;

      return stateCode;
    }

    return null
  };

  const [formData, setFormData] = useState({
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    country: initialValues?.country || "",
    state: initialValues?.state || "",
    city: initialValues?.city || "",
    phone: initialValues?.phone || "",
    address: initialValues?.address || "",
    additionalInfo: initialValues?.additionalInfo || "",
    countryCode: initialValues?.countryCode || "ng",
    isChecked: initialValues?.setAsDefault || false,
  });

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch states based on the selected country
  useEffect(() => {
    if (formData.country) {
      const countryCode = Country.getAllCountries().find(
        (c) => c.name === formData.country
      )?.isoCode;

      if (countryCode) {
        const states = State.getStatesOfCountry(countryCode);
        setStates(states);
        setFormData((prev) => ({
          ...prev,
          countryCode: countryCode.toLowerCase(),
        }));
      }
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      const countryCode = isoCode('country', formData.country)
      const stateCode = isoCode('state',formData.state,formData.country)
      const cities = City.getCitiesOfState(countryCode, stateCode);
      setCities(cities);
    }
  }, [formData.state]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {firstName, lastName,country,state,city,phone,address,additionalInfo,isChecked} = formData;

    const formDetails = {
        firstName,
        lastName,
        country,
        state,
        city,
        phone,
        address,
        additionalInfo,
        defaultAddress: isChecked
    }

    console.log(formDetails);
    // onSubmit(formData);
  };

  const reset = () => {
    setFormData(() => ({
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      country: initialValues?.country || "",
      state: initialValues?.state || "",
      city: initialValues?.city || "",
      phone: initialValues?.phone || "",
      address: initialValues?.address || "",
      additionalInfo: initialValues?.additionalInfo || "",
      countryCode: initialValues ? isoCode('country',initialValues.country) : "ng",
      isChecked: initialValues?.setAsDefault || false,
    }));

    navigate('/account/manage-account/address-book');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* First Name and Last Name */}
      <div className="mt-[16px] grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[50px]">
        <InputField
          label="First Name"
          id="first-name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <InputField
          label="Last Name"
          id="last-name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </div>

      {/* Country, State, Phone Number */}
      <div className="mt-[16px] grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-x-[50px] lg:gap-y-[16px]">
        <SelectField
          label="Select Country"
          id="country"
          value={formData.country}
          dropdown={countries}
          handleChange={handleChange}
          onChange={(e) => {
            const value = e.target.value;
            handleChange("country", value);
            const countries = Country.getAllCountries().filter((c) =>
              c.name.toLowerCase().startsWith(value.toLowerCase())
            );
            setCountries(countries);
          }}
        />
        <SelectField
          label="Select State"
          id="state"
          value={formData.state}
          dropdown={states}
          handleChange={handleChange}
          onChange={(e) => {
            const value = e.target.value;
            handleChange("state", value);
            const countryCode = isoCode("country", formData.country);
            const states = State.getStatesOfCountry(countryCode).filter((s) =>
              s.name.toLowerCase().startsWith(value.toLowerCase())
            );
            setStates(states);
          }}
        />
        <SelectField
          label="Select City"
          id="city"
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          dropdown={cities}
          handleChange={handleChange}
        />
        <PhoneInputField
          label="Enter Phone Number"
          id="phone"
          country={formData.countryCode}
          value={formData.phone}
          onChange={(value) => handleChange("phone", value)}
        />
      </div>

      {/* Address and Additional Information */}
      <div className="flex flex-col mt-[16px] gap-[16px]">
        <InputField
          label="Address"
          id="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <InputField
          label="Additional Information"
          id="additional-information"
          value={formData.additionalInfo}
          onChange={(e) => handleChange("additionalInfo", e.target.value)}
        />
      </div>

      {/* Set Default Address */}
      <CheckboxField
        label="Set as Default Address"
        checked={formData.isChecked}
        onChange={() => handleChange("isChecked", !formData.isChecked)}
      />

      {/* Form Actions */}
      <div className="flex justify-end items-center mt-[24px] gap-[32px]">
        <button type="button" onClick={reset}>
          Cancel
        </button>
        <button
          type="submit"
          className="text-white bg-[#DB4444] w-[150px] h-[56px] rounded-[4px]"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </form>
  );
}
