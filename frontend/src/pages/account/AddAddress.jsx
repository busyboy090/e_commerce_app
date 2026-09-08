import React, { useEffect, useState, useRef } from 'react';
import AddressForm from '@/features/address/AddressForm';
import { getUserCountry } from '@/utils/geolocation.js';
import user from '@/api/user.js';
import { validateEmail, validatePassword, validateText, validateNumber } from "@/utils/validator.js";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function AddAddress() {
  const handleSubmit = async (formData) => {
    try {
      const data = await user.createNewAddress(formData);
      toast.error(data?.msg)
    } catch (err) {
      console.log(err)
      toast.error(err?.msg)
    }
  }

  return (
    <>
      <AddressForm handleSubmit={handleSubmit} mode='add'/>
    </>
  )
}

export default AddAddress