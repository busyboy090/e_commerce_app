import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '@/services/axios';
import TextInput from '@/components/Input/TextInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/utils/schemas';

function ResetPassword({ email, otp }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirm_password: '' },
  });

  useEffect(() => {
    if (!email || !otp) {
      navigate('/forgot-password', { replace: true });
    }
  }, [email, otp, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/forgot-password/reset-password',
        JSON.stringify({ email, otp, password: data.password })
      );
      toast.success(response?.data?.msg);
      navigate('/login');
    } catch (err) {
      toast.error(err?.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1 className='text-center text-[2rem] font-bold'>Set new password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-[25px] flex flex-col gap-[25px]'>
        <TextInput label='Password' id="password" type="password" {...register('password')} error={errors.password?.message} />
        <TextInput label='Confirm password' id="confirm_password" type="password" {...register('confirm_password')} error={errors.confirm_password?.message} />

        <button type='submit' disabled={isSubmitting} className='bg-[#DB4444] text-[white] h-[50px] w-[100%] rounded-[7px] font-semibold'>
          {isSubmitting ? 'Resetting...' : 'Continue'}
        </button>
      </form>

      <Link to="/login" className='inline-flex items-center gap-2 text-center mt-[20px]'>
        <ArrowLeft size={18} />
        <span className='font-medium'>Back to log in</span>
      </Link>
    </div>
  );
}

export default ResetPassword;
