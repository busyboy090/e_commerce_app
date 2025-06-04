import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import api from '../../../api/axios';


// InputField 
function InputField({label, value, onChange, id}) {
    const [passwordType, setPasswordType] = useState('password');

    return (
        <div className='flex flex-col gap-[10px]'>
            <label htmlFor={id} className='font-medium'>
                { label } 
            </label>
            <div className='border-2 border-[rgba(128,128,128,0.4)] focus:outline-[#DB4444] h-[40px] relative rounded-[5px]'>
                <input type={passwordType} value={value} onChange={onChange} id={id} name={id} className='block p-[10px] h-[100%] rounded-[5px] border-0 focus:outline-0' />
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
        </div>
    )
}

function ResetPassword(props) {
    const navigate = useNavigate();
    const {email, otp, password, setPassword, confirmPassword, setConfirmPassword } = props;

    useEffect(() => {
        if(!email || !otp) {
            navigate('/forgot-password',{ replace: true });
        }
    }, [])

    const submit = async () => {
        
        if( password !== confirmPassword) {
            toast.error('Password do not match');
            return;
        }

        try {

            const response = await api.post('/auth/forgot-password/reset-password',
                JSON.stringify({
                    email,
                    otp,
                    password
                })
            );
            
            toast.success(response?.data?.msg)
            
            navigate('/login')
        } catch (err) {
            console.log()
            toast.error(err?.response?.data?.msg)
        }

    }

  return (
    <div>
        <h1 className='text-center text-[2rem] font-bold'>Set new password</h1>
        {/* <p className='text-center'>We sent a code to <span className='font-medium'>{email} </span></p> */}

        <div className='mt-[25px] flex flex-col gap-[25px]'>
            {/* password field*/}
            <InputField label='Password' id="password" value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} />

            {/* password field*/}
            <InputField label='Confirm password' id="confirm-password" value={confirmPassword} onChange={(e) => {
                setConfirmPassword(e.target.value)
            }} />
        </div>

        <button type='button' onClick={submit} className='bg-[#DB4444] mt-[20px] text-[white] h-[50px] w-[100%] rounded-[7px] font-semibold'>Continue</button>


        <a href="/login" className='text-center block mt-[20px]'>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className='ms-[10px] font-medium'>Back to log in</span>
        </a>
    </div>
  )
}

export default ResetPassword