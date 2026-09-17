import { useEffect, useState } from 'react'
import AddressForm from '@/features/address/components/AddressForm';
import { useParams, useNavigate } from 'react-router-dom';
import user from '@/services/user.js';
import { toast } from 'react-toastify';


function EditAddress() {
  const [address, setAddress] = useState([])
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAddress = () => {
    setLoading(true);
    setError(null);
    user.getAddress(id)
      .then(data => {
        setAddress(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load address');
        setLoading(false)
      })
  };

  useEffect(()=>{
    fetchAddress();
  },[])

  if(loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-transparent"></div>
      </div>
    )
  }

  if(error) {
    return (
      <div className="text-center my-10">
        <p className="text-red-500 text-lg">{error}</p>
        <button 
          onClick={fetchAddress} 
          className="mt-4 px-4 py-2 bg-[#DB4444] text-white rounded"
        >
          Retry
        </button>
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
