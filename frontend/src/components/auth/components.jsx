import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

export function InputField(props) {
  const {id,inputType, label, onChange, value} = props;
  const [passwordType, setPasswordType] = useState('password');
  return (
    <div className="mt-5">
      <div className="relative">
          {
            inputType.toLowerCase() == 'password' ? (
                <div className='w-[100%] border-b border-gray-300 py-1 focus:border-b-2 focus:outline-none relative'>
                    <input
                        id={id}
                        name={id}
                        value={value}
                        type={passwordType}
                        className="border-none py-1 focus:outline-none peer w-full pe-[50px]"
                        onChange={onChange}
                    />

                    {
                        passwordType == 'password' ? (
                            <FontAwesomeIcon className='absolute right-[10px] top-[12px]' icon={faEyeSlash} onClick={
                                () => {
                                    setPasswordType('text')
                                }
                            } /> 
                        ) : (
                            <FontAwesomeIcon className='absolute right-[10px] top-[12px]' icon={faEye} onClick={
                                () => {
                                    setPasswordType('password')
                                }
                            } /> 
                        )
                    }                 
                </div>
            ) : (
                <>
                    <input
                        id={id}
                        name={id}
                        value={value}
                        type={inputType}
                        className="border-b border-gray-300 py-1 focus:border-b-2 focus:outline-none peer w-full"
                        onChange={onChange}
                    />
                </>
            )
          }
          <label
          htmlFor={id}
          className={`${value ? '-top-4' : 'top-1'} absolute left-0 peer-focus:-top-4 text-gray-300 peer-focus:text-xs transition-all`}
          >
          {label}
          </label>
      </div>
    </div>
  )
}

<FontAwesomeIcon icon={faEye} />
