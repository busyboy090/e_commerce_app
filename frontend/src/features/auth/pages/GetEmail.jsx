import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '@/services/axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/utils/schemas';

function GetEmail({ setEmail, setVerifyEmail, setVerifyOtp }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/forgot-password',
        JSON.stringify({ email: data.email }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        setEmail(data.email);
        setVerifyEmail(false);
        setVerifyOtp(true);
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <>
      <h1 className='text-center text-[2rem] font-bold'>Forgot password?</h1>
      <p className='text-center'>No worries, we'll send you reset instructions.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='my-[30px]'>
          <label htmlFor="email" className='font-medium'>Email</label>
          <input
            type="email"
            placeholder='Enter your email'
            {...register('email')}
            id="email"
            className='block w-[100%] h-[40px] p-[15px] mt-[8px] border border-[gray] rounded-[7px] focus:outline-0 border-solid font-[500]'
          />
          {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
        </div>

        <button type='submit' disabled={isSubmitting} className='bg-[#DB4444] text-[white] h-[50px] w-[100%] rounded-[7px] font-semibold'>
          {isSubmitting ? 'Sending...' : 'Reset password'}
        </button>
      </form>

      <Link to="/login" className='inline-flex items-center gap-2 text-center mt-[20px]'>
        <ArrowLeft size={18} strokeWidth={1.5} />
        <span className='font-medium'>Back to log in</span>
      </Link>
    </>
  );
}

export default GetEmail;
