import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddressCard from "@/features/address/components/AddressCard";
import './address.css';
import user from '@/services/user.js';

// Main Address Component
function Address() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    user.getUserAddresses()
      .then(data => {
        setAddresses(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load addresses');
        setLoading(false)
      });
  }, [])

  const refreshAddresses = () => {
    setLoading(true);
    user.getUserAddresses()
      .then(data => {
        setAddresses(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

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
          onClick={refreshAddresses} 
          className="mt-4 px-4 py-2 bg-[#DB4444] text-white rounded"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-[20px]">
        {addresses.map((item, index) => (
          <AddressCard
            key={index}
            {...item}
            onDeleted={refreshAddresses}
          />
        ))}

        {
          addresses.length < 1 ? <p className="text-3xl text-center my-10">No address found</p>: ''
        }
        <div className="flex justify-end mt-[10px]">
          <Link to='/account/addresses/new'>
              <button
              type="button"
              className="text-white bg-[#DB4444] w-[200px] md:w-[214px] h-[56px] rounded-[4px]"
              >
              Add New Address
              </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Address;
