import React, { useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function SelectInput({ label, id, value, dropdown, handleChange}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownArray, setDropdownArray] = useState([]);
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setDropdownArray(dropdown)
  },[dropdown])

  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id}>{label}</label>
      <div className="relative group">
        <div className="select-field-container h-[56px] flex justify-between items-center border border-slate-500 p-[10px] rounded-[4px] cursor-pointer">
          <input
            type="text"
            id={id}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              const country = dropdown.filter(n => n.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
              if(country.length > 0) {
                setDropdownArray(country)
                setIsDropdownOpen(true)
              }
            }}
            className="w-full focus:outline-none"
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
          />
        </div>
        {
          isDropdownOpen && (
            <div className='select-field-dropdown flex group-focus-within:flex absolute w-full bg-white shadow-lg mt-[5px] rounded-[4px] z-10'>
              {dropdownArray &&
                dropdownArray.map((item, index) => (
                  <button
                  type="button"
                    key={index}
                    className="p-[10px] hover:bg-[#F5F5F5] cursor-pointer"
                    onClick={() => {
                      handleChange(item);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default SelectInput;