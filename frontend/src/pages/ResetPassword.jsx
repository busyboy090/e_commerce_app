import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import api from '../api/axios';
import TextInput from '@/components/ui/TextInput';

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
            toast.error(err?.response?.data?.msg || 'Something went wrong')
        }

    }

  return (
    <div>
        <h1 className='text-center text-[2rem] font-bold'>Set new password</h1>
        {/* <p className='text-center'>We sent a code to <span className='font-medium'>{email} </span></p> */}

        <div className='mt-[25px] flex flex-col gap-[25px]'>
            {/* password field*/}
            <TextInput label='Password' id="password" type="password" value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} />

            {/* password field*/}
            <TextInput label='Confirm password' id="confirm-password" type="password" value={confirmPassword} onChange={(e) => {
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