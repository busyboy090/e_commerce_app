import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import user from '@/services/user.js';

// AddressCard Component
function AddressCard(props) {
  const deleteAddress = () => {
    Swal.fire({
      title: 'Remove this Address?',
      text: "You'll no longer be able to use this address for future orders.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
      confirmButtonColor: '#DB4444',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await user.deleteAddress(props.address_id);
          toast.success('Address removed successfully');
          window.location.reload();
        } catch (err) {
          toast.error(err?.msg || 'Failed to remove address');
        }
      }
    });
  }
  return (
    <div className="shadow p-[15px] flex flex-col gap-[10px] rounded-[4px]">
      <p className="font-bold text-[1.5rem]">{props.first_name} {props.last_name}</p>
      <p>Country: {props.country.name}</p>
      <p>State: {props.state.name}</p>
      <p>City: {props.city.name}</p>
      <p>Address: {props.address}</p>
      <p>Phone Number: {props.phone}</p>
      {props.is_default && (
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
            disabled={props.is_default}
            className={`${props.is_default ? 'text-[rgba(0,0,0,0.5)]' : 'text-[#DB4444]'} font-semibold`}
          >
            Set As Default
          </button>
        </div>
        <div className="flex gap-[25px] items-center">
          <FontAwesomeIcon icon={faTrash} className="text-[#DB4444]" onClick={deleteAddress} />
          <Link to={`/account/addresses/${props.address_id}/edit`}>
            <FontAwesomeIcon icon={faPen} className="text-[#DB4444]"/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddressCard