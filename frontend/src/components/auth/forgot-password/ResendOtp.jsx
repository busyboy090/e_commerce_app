import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../../api/axios';

function startCountdown(durationInSeconds, setTime, endTime, setCountdownDisplay) {
    const now = Date.now();
    endTime.current = now + durationInSeconds * 1000;
    setTime(true);

    const countdown = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, Math.floor((endTime.current - now) / 1000));

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        setCountdownDisplay(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            setTime(false);
        }
    }, 1000);

    const resetTimer = () => {
        clearInterval(countdown);
        startCountdown(durationInSeconds, setTime, endTime, setCountdownDisplay); // Reset the countdown
    };

    return resetTimer;
}

function ResendOtp({ email }) {
    const [time, setTime] = useState(true);
    const [countdownDisplay, setCountdownDisplay] = useState('');
    const endTime = useRef(null); 

    const sendNewCode = async () => {
        try {
            const response = await api.post('/auth/forgot-password/email', 
                JSON.stringify({ email })
            );

            if (response.status === 200) {
                startCountdown(180, setTime, endTime, setCountdownDisplay); // Start countdown for 3 minutes
                setKey((prev) => prev + 1); // Trigger the key update (presumably to reset OTP form/input)
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Cleanup when the component unmounts
    useEffect(() => {
        return () => {
            if (endTime.current) clearInterval(endTime.current); // Clear the countdown if the component is unmounted
        };
    }, []);

    console.log(time)

    return (
        <div className='flex justify-center gap-[10px] items-center mt-[20px]'>
            <p>Didn't receive a code? </p>
            <button 
                type='button' 
                disabled={!time} 
                onClick={sendNewCode}
                className='text-[#DB4444] font-medium text-[1rem] disabled:text-[rgba(128,128,128,0.4)] underline'>
                Resend code
            </button>
            {time && <span className='font-medium'>{countdownDisplay}</span>}
        </div>
    );
}

export default ResendOtp;