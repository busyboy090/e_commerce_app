import React from 'react';
import { AddressForm } from './AddressForm';

function AddNewAddress() {
    const onSubmit = () => {

    }
  return (
    <div> 
        <AddressForm onSubmit={onSubmit}/>
    </div>
  )
}

export default AddNewAddress