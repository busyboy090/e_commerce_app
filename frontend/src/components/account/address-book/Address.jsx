import React from "react";
import { Link } from "react-router-dom";
import AddressCard from "./AddressCard";
import './address.css';

// import WhiteTick from "../../assets/icons/white-tick.svg";


// Main Address Component
function Address({ component }) {
//   const [showNewAddressForm, setShowNewAddressForm] = useState(false);
//   const [showEditAddressForm, setShowEditAddressForm] = useState(false);
//   const [editData, setEditData] = useState(null);

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
          <div className="flex justify-end mt-[10px]">
            <Link to='/account/manage-account/address-book/add-address'>
                <button
                type="button"
                className="text-white bg-[#DB4444] w-[100%] md:w-[214px] h-[56px] rounded-[4px]"
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