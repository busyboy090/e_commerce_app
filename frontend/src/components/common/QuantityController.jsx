import React from 'react';

function QuantityController({ quantity, onChange, min = 1, max = 10 }) {
  const increment = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  const decrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  return (
    <div className="flex border rounded">
      <button type="button" onClick={decrement} className="px-3">-</button>
      <span className="px-3 border-x">{quantity}</span>
      <button type="button" onClick={increment} className="px-3">+</button>
    </div>
  );
}

export default QuantityController;
