import React, { useEffect, useState, useRef} from "react";
import { ChevronDown } from "lucide-react";

function SelectInput({ label, id, value, dropdown, handleChange}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownArray, setDropdownArray] = useState([]);
  const [inputValue, setInputValue] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    setDropdownArray(dropdown)
  },[dropdown])

  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  const toggle = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(prev => !prev);
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if(ref.current && !ref.current.contains(e.target)){
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [])

  return (
    <div className="flex flex-col gap-[5px]" ref={ref}>
      <label htmlFor={id} className="text-[rgba(0,0,0,0.5)]">{label}</label>
      <div className="relative group">
        <div className="select-field-container h-[50px] flex justify-between items-center bg-[#F5F5F5] p-[10px] rounded-[4px] cursor-pointer">
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
          <ChevronDown
            size={16}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
            className="cursor-pointer"
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
                      setInputValue(item?.name)
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
