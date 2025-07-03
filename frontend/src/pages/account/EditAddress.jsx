import React, { useEffect, useState  } from 'react'
import AddressForm from '@/features/address/AddressForm';
import { useParams } from 'react-router-dom';
import user from '@/api/user.js';


function EditAddress() {
  const [address, setAddress] = useState([])
  const { id } = useParams() ;

  useEffect(()=>{
    user.getAddress(id)
      .then(data => setAddress(data)
      .catch(err => console.log(err))
      )
  },[])

  const handleSubmit = (data) => {

  }
  
  return (
    <>
        <AddressForm mode='edit' handleSubmit={handleSubmit} initialData={address}/>
    </>
  )
}

export default EditAddress