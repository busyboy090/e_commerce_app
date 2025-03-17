import React from "react";
import Gamepad from "../../assets/products/Gamepad.svg";
import WiredKeyboard from "../../assets/products/Wired-Keyboard.svg";
import JustForYou from "../product/JustForYou";
import ProductCard from "../product/ProductCard";

function Wishlist() {
  const discount = true;

  const productCardSettings = {
    wishlist: false,
    deleteBtn: true,
    view: false,
  };
  return (
    <div>
      <div className="container">
        <div className="max-md:mb-[4px] mt-[50px] mb-[20px] flex justify-between items-center">
          <h1 className="text-2xl font-bold">Wishlist (4)</h1>
          <button
            type="button"
            className="max-md:w-[150px] w-[233px] h-[56px] flex justify-center items-center border border-[rgba(0,0,0,0.5)] rounded-md font-semibold"
          >
            Move All To Bag
          </button>
        </div>

        <div className="grid max-md:pb-[15px] max-md:grid-flow-col auto-cols-[100%] overflow-x-auto snap-mandatory snap-x md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
          <ProductCard
            image={Gamepad}
            name="AK-900 Wired Keyboard"
            discount={discount}
            newProduct={true}
            {...productCardSettings}
          />
          <ProductCard
            image={Gamepad}
            name="AK-900 Wired Keyboard"
            discount={discount}
            newProduct={true}
            {...productCardSettings}
          />
          <ProductCard
            image={Gamepad}
            name="AK-900 Wired Keyboard"
            discount={discount}
            newProduct={true}
            {...productCardSettings}
          />
          <ProductCard
            image={Gamepad}
            name="AK-900 Wired Keyboard"
            discount={discount}
            newProduct={true}
            {...productCardSettings}
          />
          <ProductCard
            image={Gamepad}
            name="AK-900 Wired Keyboard"
            discount={discount}
            newProduct={true}
            {...productCardSettings}
          />
          <ProductCard
            image={Gamepad}
            name="AK-900 Wired Keyboard"
            discount={discount}
            newProduct={true}
            {...productCardSettings}
          />
          <ProductCard
            image={Gamepad}
            name="AK-900 Wired Keyboard"
            discount={discount}
            newProduct={true}
            {...productCardSettings}
          />
          <ProductCard
            image={Gamepad}
            name="AK-900 Wired Keyboard"
            discount={discount}
            newProduct={true}
            {...productCardSettings}
          />
        </div>
      </div>

      <JustForYou />
    </div>
  );
}

export default Wishlist;
