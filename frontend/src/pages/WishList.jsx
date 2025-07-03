import React, { useEffect, useState } from "react";
import ProductCard from "@/features/product/ProductCard";
import { useWishList } from "../hooks/useWishList";

function WishList() {
  const discount = true;

  const {wishList, fetchWishListProducts, products} = useWishList();

  // Get product IDs
  const productIds = wishList.map(item => item.productId);

  const totalProduct = wishList.length

  const productCardSettings = {
    wishlist: false,
    deleteBtn: true,
    view: false,
  };

  useEffect(() => {
    if (totalProduct >= 1) {
      fetchWishListProducts(productIds)
    }
  }, [wishList])


  return (
    <div>
      <div className="container">
        <div className="max-md:mb-[4px] mt-[50px] mb-[20px] flex justify-between items-center">
          <h1 className="text-2xl font-bold">Wishlist ({totalProduct})</h1>
          <button
            type="button"
            className="max-md:w-[150px] w-[233px] h-[56px] flex justify-center items-center border border-[rgba(0,0,0,0.5)] rounded-md font-semibold"
          >
            Move All To Bag
          </button>
        </div>

        <div className="grid max-md:pb-[15px] mb-[50px] max-md:grid-flow-col auto-cols-[100%] overflow-x-auto snap-mandatory snap-x md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
          {
            products.map((product, index) => (
              <ProductCard key={index} product={product} settings={productCardSettings} />
            ))
          }
        </div>
      </div>

      {/* <JustForYou /> */}
    </div>
  );
}

export default WishList;
