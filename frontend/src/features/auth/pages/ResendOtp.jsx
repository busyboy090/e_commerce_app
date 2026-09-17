import React, { useState, useRef, useEffect } from 'react';
import api from '@/services/axios';
import { toast } from 'react-toastify';

function startCountdown(durationInSeconds, setTime, endTime, countdownDisplay) {
    const now = Date.now();
    endTime.current = now + durationInSeconds * 1000;
    setTime(true);

    const countdown = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, Math.floor((endTime.current - now) / 1000));

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownDisplay.current.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            setTime(false);
        }
    }, 1000);

    const resetTimer = () => {
        clearInterval(countdown);
        startCountdown(durationInSeconds, setTime, endTime, countdownDisplay); // Reset the countdown
    };

    return resetTimer;
}

function ResendOtp({ email }) {
    const [time, setTime] = useState(false);
    const countdownDisplay = useRef();
    const endTime = useRef(null); 

    const sendNewCode = async () => {
        try {
            const response = await api.post('/auth/forgot-password', 
                JSON.stringify({ email }),
                {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                startCountdown(180, setTime, endTime, countdownDisplay); // Start countdown for 3 minutes
            }
        } catch (err) {
            toast.error(err?.response?.data?.msg || 'Failed to send code');
        }
    };

    // Cleanup when the component unmounts
    useEffect(() => {
        return () => {
            if (endTime.current) clearInterval(endTime.current); // Clear the countdown if the component is unmounted
        };
    }, []);

    return (
        <div className='flex justify-center gap-[10px] items-center mt-[20px]'>
            <p>Didn't receive a code? </p>
            {
                time ? (
                    <button 
                        type='button'
                        onClick={sendNewCode}
                        className='text-[#DB4444] font-medium text-[1rem] disabled:text-[rgba(128,128,128,0.4)] underline'>
                        Resend code
                    </button>
                ) : <p className='text-[#DB4444] font-medium text-[1rem]'>Resend in</p>
            }
            {time && <span className='font-medium' ref={countdownDisplay}></span>}
        </div>
    );
}

export default ResendOtp;