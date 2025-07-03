import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
          <Link to={`/account/manage-account/address-book/edit-address/${props.id}`}>
            <FontAwesomeIcon icon={faPen} className="text-[#DB4444]" onClick={() => edit(props)} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddressCard