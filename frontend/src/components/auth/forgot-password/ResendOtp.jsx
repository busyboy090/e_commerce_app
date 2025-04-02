import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/axios';

function ResendOtp() {
    const email = JSON.parse(localStorage.getItem('reset-password-email'));

    const navigate = useNavigate();
    const [time, setTime] = useState(false);
    const [countdownDisplay, setCountdownDisplay] = useState('');

    useEffect(() => {
        const endTime = localStorage.getItem("countdownEndTime");
        if (endTime) {
            const now = Date.now();
            const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000));
            if (remainingTime > 0) {
                setTime(true);
                startCountdown(remainingTime);
            }
        }
    }, []);

    function startCountdown(durationInSeconds) {
        const now = Date.now();
        const endTime = now + durationInSeconds * 1000;
        localStorage.setItem('countdownEndTime', endTime);
        setTime(true);

        const countdown = setInterval(() => {
            const now = Date.now();
            const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));

            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            setCountdownDisplay(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

            if (timeLeft <= 0) {
                clearInterval(countdown);
                setTime(false);
                localStorage.removeItem("countdownEndTime");
            }
        }, 1000);
    }

    const sendNewCode = async () => {
        try {
            const response = await api.post('/auth/forgot-password/email',
                JSON.stringify({ email })
            );

            if (response.status === 200) {
                startCountdown(180);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex justify-center gap-[10px] items-center mt-[20px]'>
            <button type='button' disabled={time} onClick={sendNewCode}
                className='text-[#DB4444] font-medium text-[1rem] disabled:text-[rgba(128,128,128,0.4)]'>
                Resend code
            </button>
            {time && <span>{countdownDisplay}</span>}
        </div>
    );
}

export default ResendOtp;