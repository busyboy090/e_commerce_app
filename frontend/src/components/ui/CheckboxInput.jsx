import React from "react";
import WhiteTick from "@/assets/icons/white-tick.svg";

function CheckboxInput({ label, checked, onChange }) {
    return (
      <div className="flex gap-[16px] items-center mt-[16px]">
        <div className="relative mt-[6px]">
          <input
            type="checkbox"
            className="bg-[#DB4444] appearance-none h-[24px] w-[24px] rounded-[4px]"
            checked={checked}
            onChange={() => {
              onChange(prev => !prev)
            }}
          />
          <img
            src={WhiteTick}
            alt=""
            className={`${
              checked ? "block" : "hidden"
            } absolute top-[40%] left-[50%] translate-[-50%]`}
            onClick={() => {
              onChange(prev => !prev)
            }}
          />
        </div>
        <label>{label}</label>
      </div>
    );
}

export default CheckboxInput;