import React, { useEffect, useState  } from 'react'
import AddressForm from '@/features/address/components/AddressForm';
import { useParams, useNavigate } from 'react-router-dom';
import user from '@/services/user.js';
import { toast } from 'react-toastify';


function EditAddress() {
  const [address, setAddress] = useState([])
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(()=>{
    user.getAddress(id)
      .then(data => {
        setAddress(data)
        setLoading(false)
      })
      .catch(err => {
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
      <p className="text-3xl text-center my-10">No address found</p>
    )
  }

  const handleSubmit = async (data) => {
    try {
      await user.updateAddress(id, data);
      toast.success('Address updated successfully');
      navigate('/account/addresses');
    } catch (err) {
      toast.error(err?.msg || 'Failed to update address');
    }
  }
  
  return (
    <>
      <AddressForm mode='edit' handleSubmit={handleSubmit} initialData={address}/>
    </>
  )
}

export default EditAddress