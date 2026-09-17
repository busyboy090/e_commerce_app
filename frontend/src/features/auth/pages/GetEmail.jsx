import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '@/services/axios';
import { toast } from 'react-toastify';

function GetEmail(props) {
  const {email, setEmail, setVerifyEmail, setVerifyOtp } = props;

  const submit = async (e) => {
    e.preventDefault()
    if(!email) {
      toast.error('Email field is required')
      return
    }

    try {

      const response = await api.post('/auth/forgot-password',
        JSON.stringify({email}),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if(response.status === 200) {
        setVerifyEmail(false)
        setVerifyOtp(true);
      }


    } catch (err) {
      toast.error(err?.response?.data?.msg || 'Something went wrong');
    }
  }

  return (
    <>
      <h1 className='text-center text-[2rem] font-bold'>Forgot password?</h1>
      <p className='text-center'>No worries, we'll send you reset instructions.</p>

      <form onSubmit={submit}>
          <div className='my-[30px]'>
            <label htmlFor="email" className='font-medium'>
                Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your email' name="email" id="email" className='block w-[100%] h-[40px] p-[15px] mt-[8px] border border-[gray] rounded-[7px] focus:outline-0 border-solid font-[500]' />
          </div>

          {/* reset password */}
          <button type='submit' className='bg-[#DB4444] text-[white] h-[50px] w-[100%] rounded-[7px] font-semibold'>Reset password</button>
      </form>

      <Link to="/login" className='text-center block mt-[20px]'>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className='ms-[10px] font-medium'>Back to log in</span>
      </Link>
    </>
  )
}

export default GetEmail