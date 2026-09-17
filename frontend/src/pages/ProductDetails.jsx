import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '@/services/axios';
import Loading from '@/components/Loading/Loading';
import Ratings from '@/components/Ratings/Ratings';
import { toast } from 'react-toastify';


function ProdutcDetails() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [product, setProducts ] = useState([])
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);
  let productId;
  
  useEffect(() => {
    // Fetch product details using the id from the URL
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`products/${id}`);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        setProducts(response?.data || []);
        productId = response?.data.product_id;
      } catch (error) {
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }
  , [id]);

  const increment = () => {
    if (quantity < 10) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  if(loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className='container my-[80px!important]'>
      <p>Account / Gaming / Havic HV G-92 Gamepad </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mt-[40px]">
      {/* Image Gallery */}
      <div className="grid grid-cols-12 gap-4">
        <div className='col-span-3 space-y-4'>
          {product?.product_colors.map((color, index) => (
            <div className='bg-[#F5F5F5] h-[138px] w-full rounded-xl' key={index}>
              <img
                key={index}
                src={color.image}
                className="w-full h-full object-cover rounded-xl shadow-md cursor-pointer"
              />
            </div>
          ))}
        </div>
        <div className='col-span-9 h-full bg-[#F5F5F5] flex justify-center items-center rounded-xl'>
          <img src={product?.product_colors[0]?.image} alt="Main Controller" className="rounded-xl shadow-md h-[500px] w-[75%]" />
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <div className="flex items-center space-x-2 text-yellow-500">
          <Ratings ratings={product?.averageRating}/>
          <span className="text-gray-500 text-sm">({product?.totalReviews} Reviews)</span>
          <span className="text-green-600 ml-2">| In Stock</span>
        </div>

        <p className="text-xl font-semibold">${product?.product_variants[0]?.price}</p>

        <p className="text-sm text-gray-600">
          {product.description || 'No description available for this product.'}
        </p>

        Colour Picker
        <div className="flex items-center space-x-4">
          <span className="font-semibold">Colours:</span>
          <button
            onClick={() => setSelectedColor('blue')}
            className={`w-5 h-5 rounded-full border ${selectedColor === 'blue' ? 'border-black' : ''} bg-blue-600`}
          ></button>
          <button
            onClick={() => setSelectedColor('red')}
            className={`w-5 h-5 rounded-full border ${selectedColor === 'red' ? 'border-black' : ''} bg-red-400`}
          ></button>
        </div>

        {/* Size Picker */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Size:</span>
          {product?.product_variants.map((product, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(product.size.size)}
              className={`border px-2 py-1 rounded ${selectedSize === product.size.size ? 'bg-red-500 text-white' : ''}`}
            >
              {product.size.size}
            </button>
          ))}
        </div>

        {/* Quantity and Buy */}
        <div className="flex items-center space-x-4">
          <div className="flex border rounded">
            <button onClick={decrement} className="px-3">-</button>
            <span className="px-3 border-x">{quantity}</span>
            <button onClick={increment} className="px-3">+</button>
          </div>
          <button className="bg-red-500 hover:bg-red-600">Buy Now</button>
          <button className="border p-2 rounded">♡</button>
        </div>

        {/* Delivery Info */}
        <div className="mt-6 border rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚚</span>
            <div>
              <p className="font-semibold">Free Delivery</p>
              <a href="#" className="text-blue-500 text-sm">Enter your postal code for Delivery Availability</a>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t pt-2">
            <span className="text-lg">↻</span>
            <div>
              <p className="font-semibold">Return Delivery</p>
              <p className="text-sm text-gray-600">Free 30 Days Delivery Returns. <a href="#" className="text-blue-500">Details</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProdutcDetails