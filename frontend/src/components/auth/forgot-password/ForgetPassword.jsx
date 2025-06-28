import React, { useState } from 'react';
import GetEmail from './GetEmail';
import Otp from './Otp';
import ResetPassword from './ResetPassword';
import { useLocation } from 'react-router-dom';

function ForgetPassword() {
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);

    const [verifyEmail, setVerifyEmail] = useState(true);
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [resetPassword, setResetPassword] = useState(false)

    const [email, setEmail] = useState(queryParams.get('email') || '')
    const [otp, setOtp] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <div className='container flex justify-center'>
        <div className='shadow p-[20px] md:w-[500px] md:p-[50px] my-[70px] rounded-[4px]'>
            {
                verifyEmail ? <GetEmail email={email} setEmail={setEmail} setVerifyEmail={setVerifyEmail} setVerifyOtp={setVerifyOtp} /> : ''
            }

            {
                verifyOtp ? <Otp email={email} setVerifyEmail={setVerifyEmail} otp={otp} setOtp={setOtp} setVerifyOtp={setVerifyOtp} setResetPassword={setResetPassword}  /> : ''
            }

            {
                resetPassword ? <ResetPassword email={email} otp={otp} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} /> : ''
            }
        </div>
    </div>
  )
}

export default ForgetPassword