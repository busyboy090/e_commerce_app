import React, { useEffect, useState  } from 'react'
import AddressForm from '@/features/address/AddressForm';
import { useParams } from 'react-router-dom';
import user from '@/api/user.js';


function EditAddress() {
  const [address, setAddress] = useState([])
  const { id } = useParams();
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    user.getAddress(id)
      .then(data => {
        setAddress(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  },[])

  if(loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-transparent"></div>
      </div>
    )
  }

  if(!address || address.length < 1) {
    return (
      <p className="text-3xl text-center my-10">No adddress found</p>
    )
  }

  const handleSubmit = (data) => {

  }
  
  return (
    <>
      <AddressForm mode='edit' handleSubmit={handleSubmit} initialData={address}/>
    </>
  )
}

export default EditAddress