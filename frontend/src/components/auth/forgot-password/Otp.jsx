import React, { useState, useRef, useEffect} from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import ResendOtp from './ResendOtp';

// InputField Component
function InputField({ input, nextInput, backInput }) {
    let disable = true;
    
    if(backInput) {
        disable = backInput.current.value ? false : true
    } else {
        disable = false
    }

    const handleKeyDown = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        } else {
            e.preventDefault();
            input.current.value = e.key;

            if(nextInput) {
                nextInput.current.disabled = false
            }

            if (input.current.value && nextInput) nextInput.current.focus();
        }

        if (e.key === 'Backspace') {
            input.current.value = '';
            if(nextInput) {
                nextInput.current.disabled = true
            }

            if (backInput && !input.current.value) {
                backInput.current.focus();
            }
        }

        // Update border color based on value
        input.current.style.borderColor = input.current.value ? '#DB4444' : 'rgb(128,128,128,0.4)';
    };

    return (
        <input
            type="text"
            className='w-[40px] md:w-[60px] h-[40px] md:h-[60px] rounded-[7px] border-2 border-[rgb(128,128,128,0.4)] focus:outline-[#DB4444] text-center text-[1.5rem] md:text-[2rem] font-medium'
            maxLength='1'
            ref={input}
            onKeyDown={handleKeyDown}
            disabled={disable}
        />
    );
}

function Otp(props) {
    const { email, setVerifyEmail, setOtp, setVerifyOtp, setResetPassword } = props;
    const input1 = useRef('');
    const input2 = useRef('');
    const input3 = useRef('');
    const input4 = useRef('');
    const input5 = useRef('');
    const input6 = useRef('');

    const submit = async (e) => {
        e.preventDefault();
        let otp = input1.current.value + input2.current.value + input3.current.value + input4.current.value + input5.current.value + input6.current.value;

        // Validate OTP
        if (!otp || otp.length !== 6) {
            toast.error('Invalid OTP');
            return;
        }

        setOtp(otp);

        try {
            const response = await api.post('auth/forgot-password/verify-otp', 
                JSON.stringify({ email, otp })
            );

            if (response.status === 200) {
                setVerifyOtp(false);
                setResetPassword(true);
            }

            toast.success(response?.data?.msg);
        } catch (err) {
            toast.error(err?.response?.data?.msg);
            console.log(err);
        }
    };

    const changeEmail = () => {
        setVerifyOtp(false);
        setVerifyEmail(true);
    };

    return (
        <form onSubmit={submit}>
            <h1 className='text-center text-[2rem] font-bold'>Password Reset Code</h1>
            <p className='text-center'>
                We sent a 6 digit code to <span className='font-medium'>{email}</span>
                <button type='button' className='ms-[5px] underline text-[#DB4444]' onClick={changeEmail}>Change</button>
            </p>

            <div className='mt-[25px] flex gap-[15px] justify-center'>
                <InputField input={input1} nextInput={input2}/>
                <InputField input={input2} backInput={input1} nextInput={input3} />
                <InputField input={input3} backInput={input2} nextInput={input4} />
                <InputField input={input4} backInput={input3} nextInput={input5} />
                <InputField input={input5} backInput={input4} nextInput={input6} />
                <InputField input={input6} backInput={input5} />
            </div>

            <button type='submit' className='bg-[#DB4444] mt-[20px] text-[white] h-[50px] w-[100%] rounded-[7px] font-semibold'>
                Continue
            </button>

            <ResendOtp email={email}/>

            <a href="/login" className='text-center block mt-[20px]'>
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className='ms-[10px] font-medium'>Back to login</span>
            </a>
        </form>
    );
}

export default Otp;
