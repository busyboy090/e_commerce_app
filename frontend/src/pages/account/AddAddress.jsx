import React, { useEffect, useState, useRef } from 'react';
import AddressForm from '@/features/address/AddressForm';
import { getUserCountry } from '@/utils/geolocation.js';
import user from '@/api/user.js';
import { validateEmail, validatePassword, validateText, validateNumber } from "@/utils/validator.js";
import { toast } from 'react-toastify';

function AddAddress() {
  const handleSubmit = async (formData) => {
    try {

      const data = await user.createNewAddress(formData);
      toast.success(data?.msg)
    } catch (err) {
      console.log(err)
      toast.error(err)
    }


  }

  return (
    <>
      <AddressForm handleSubmit={handleSubmit} mode='add'/>
    </>
  )
}

export default AddAddress