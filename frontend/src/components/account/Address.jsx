import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import "./address.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


// AddressCard Component
function AddressCard({ edit, ...props }) {
  const [isDefaultAddress, setIsDefaultAddress] = useState(props.setAsDefault);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="shadow p-[15px] flex flex-col gap-[10px] rounded-[4px]">
      <p className="font-bold text-[1.5rem]">{props.firstName} {props.lastName}</p>
      <p>Country: {props.country}</p>
      <p>State: {props.state}</p>
      <p>City: {props.city}</p>
      <p>Address: {props.address}</p>
      <p>Phone Number: {props.phone}</p>
      {isDefaultAddress && (
        <div className="flex gap-[15px] my-[10px] items-center">
          <svg width="25" height="25" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="green" strokeWidth="3">
            <path d="M50 5 A45 45 0 1 1 49.9 5 Z" />
            <path d="M50 30 V60" strokeWidth="4" />
            <circle cx="50" cy="70" r="3" fill="green" />
          </svg>
          <p className="text-[green]">Default Address</p>
        </div>
      )}
      <div className="flex justify-between items-center mt-[5px]">
        <div>
          <button
            type="button"
            disabled={isDefaultAddress}
            className={`${isDefaultAddress ? 'text-[rgba(0,0,0,0.5)]' : 'text-[#DB4444]'} font-semibold`}
          >
            Set As Default
          </button>
        </div>
        <div className="flex gap-[25px] items-center">
          <FontAwesomeIcon icon={faTrash} className="text-[#DB4444]" onClick={() => setVisible(false)} />
          <FontAwesomeIcon icon={faPen} className="text-[#DB4444]" onClick={() => edit(props)} />
        </div>
      </div>
    </div>
  );
}

// Main Address Component
function Address() {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showEditAddressForm, setShowEditAddressForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const addresses = [
    {
      firstName: 'Busayo',
      lastName: 'Josiah',
      address: 'No 21 Jesutedo Street Odolu',
      country: 'Nigeria',
      countryCode: 'ng',
      state: 'Kogi',
      city: 'Kabba',
      phone: '8065068854',
      additionalInfo: 'Blue gate',
      setAsDefault: false,
    },
    {
      firstName: 'Busayo',
      lastName: 'Josiah',
      country: 'Nigeria',
      countryCode: 'ng',
      address: 'No 21 Jesutedo Street Odolu',
      state: 'Kogi',
      city: 'Kabba',
      phone: '8065068854',
      additionalInfo: 'Blue gate',
      setAsDefault: true,
    },
  ];

  const handleSave = (data) => {
    console.log("Saved Data:", data);
    setShowNewAddressForm(false);
    setShowEditAddressForm(false);
  };

  return (
    <div>
      {showNewAddressForm && (
        <AddressForm
          cancel={() => setShowNewAddressForm(false)}
          onSubmit={handleSave}
        />
      )}

      {showEditAddressForm && (
        <AddressForm
          initialValues={editData}
          cancel={() => setShowEditAddressForm(false)}
          onSubmit={handleSave}
        />
      )}

      {!showNewAddressForm && !showEditAddressForm && (
        <div className="flex flex-col gap-[20px]">
          {addresses.map((item, index) => (
            <AddressCard
              key={index}
              {...item}
              edit={(data) => {
                setEditData(data);
                setShowEditAddressForm(true);
              }}
            />
          ))}
          <div className="flex justify-end mt-[10px]">
            <button
              type="button"
              className="text-white bg-[#DB4444] w-[100%] md:w-[214px] h-[56px] rounded-[4px]"
              onClick={() => setShowNewAddressForm(true)}
            >
              Add New Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Address;