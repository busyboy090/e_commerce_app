import { useNavigate } from 'react-router-dom';
import AddressForm from '@/features/address/components/AddressForm';
import user from '@/services/user.js';
import { toast } from 'react-toastify';

function AddAddress() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const data = await user.createNewAddress(formData);
      toast.success(data?.msg || 'Address added successfully');
      navigate('/account/addresses');
    } catch (err) {
      toast.error(err?.msg || 'Failed to add address')
    }
  }

  return (
    <>
      <AddressForm handleSubmit={handleSubmit} mode='add'/>
    </>
  )
}

export default AddAddress
