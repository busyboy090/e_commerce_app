import React from "react";
import Gamepad from "../../assets/products/Gamepad.svg";
import WiredKeyboard from "../../assets/products/Wired-Keyboard.svg";
import ProductCard from "./ProductCard";

function JustForYou() {
  // product card settings
  const productCardSettings = {
    wishlist: false,
    deleteBtn: false,
    view: true,
    discount: true,
  };

  return (
    <div className="container my-[100px!important]">
      <div className="flex justify-between items-center mb-[10px]">
        <div className="flex gap-[10px] items-center">
          <span className="w-[20px] bg-[#DB4444] rounded-sm h-[40px]"></span>
          <p className="font-semibold">Just For You</p>
        </div>

        {/* see all button */}
        <button
          type="button"
          className="w-[150px]  h-[56px] flex justify-center items-center border border-[rgba(0,0,0,0.5)] rounded-md font-semibold"
        >
          Sell All
        </button>
      </div>

      <div className="grid max-md:pb-[15px] max-md:grid-flow-col auto-cols-[100%] overflow-x-auto snap-mandatory snap-x md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
        <ProductCard
          image={Gamepad}
          name="HAVIT HV-G92 Gamepad"
          {...productCardSettings}
        />
        <ProductCard
          image={WiredKeyboard}
          name="AK-900 Wired Keyboard"
          {...productCardSettings}
        />
        <ProductCard
          image={Gamepad}
          name="HAVIT HV-G92 Gamepad"
          {...productCardSettings}
        />
        <ProductCard
          image={WiredKeyboard}
          name="AK-900 Wired Keyboard"
          {...productCardSettings}
        />
      </div>
    </div>
  );
}

export default JustForYou;
