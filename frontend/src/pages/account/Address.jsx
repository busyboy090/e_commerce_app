import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddressCard from "@/features/address/AddressCard";
import './address.css';
import user from '@/api/user.js'

// import WhiteTick from "../../assets/icons/white-tick.svg";


// Main Address Component
function Address({ component }) {
//   const [showNewAddressForm, setShowNewAddressForm] = useState(false);
//   const [showEditAddressForm, setShowEditAddressForm] = useState(false);
//   const [editData, setEditData] = useState(null);

  const [addresses, setAddresses] = useState([]);

  const handleSave = (data) => {
    console.log("Saved Data:", data);
    setShowNewAddressForm(false);
    setShowEditAddressForm(false);
  };

    useEffect(() => {
      user.getUserAddresses()
        .then(data => setAddresses(data))
        .catch(err => console.log(err));
    }, [])

  return (
    <div>
      { component ? 
        <>
            { component }
        </> :
        <div className="flex flex-col gap-[20px]">
          {addresses.map((item, index) => (
            <AddressCard
              key={index}
              {...item}
              edit={(data) => {
                setEditData(data);
                setShowEditAddressForm(true);
              }}
              id={index + 1}
            />
          ))}

          {
            addresses.length < 1 ? <p className="text-3xl text-center my-10">No adddress found</p>: ''
          }
          <div className="flex justify-end mt-[10px]">
            <Link to='/account/addresses/new'>
                <button
                type="button"
                className="text-white bg-[#DB4444] w-[200px] md:w-[214px] h-[56px] rounded-[4px]"
                >
                Add New Address
                </button>
            </Link>
          </div>
        </div>
    }
    </div>
  );
}

export default Address;