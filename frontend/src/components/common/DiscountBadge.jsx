import React from 'react';

function DiscountBadge({ discount, isNew }) {
  if (discount) {
    return (
      <p className="discount absolute top-[12px] left-[12px] w-[55px] h-[26px] bg-[#DB4444] flex justify-center items-center text-white rounded-[4px] text-[0.75rem]">
        -{discount}%
      </p>
    );
  }

  if (isNew) {
    return (
      <p className="discount absolute top-[12px] left-[12px] w-[55px] h-[26px] bg-[#00FF66] flex justify-center items-center text-white rounded-[4px] text-[0.75rem]">
        New
      </p>
    );
  }

  return null;
}

export default DiscountBadge;
