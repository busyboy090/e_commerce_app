import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

function TextInput({ label, id, type = 'text', value, onChange, error, className = '', ...rest }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (passwordVisible ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-[5px] ${className}`}>
      <label htmlFor={id} className="text-[rgba(0,0,0,0.5)]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
          {...rest}
        />
        {isPassword && (
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            className="absolute right-[10px] top-[50%] -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setPasswordVisible(prev => !prev)}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default TextInput;
