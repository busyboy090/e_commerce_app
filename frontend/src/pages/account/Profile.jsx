import { useEffect, useRef, useState } from 'react'
import { Pencil } from 'lucide-react'
import ProfilePics from '@/assets/images/profile-pics.jpg';
import useAuth from '@/hooks/useAuth';
import CheckboxInput from '@/components/Input/CheckboxInput';
import TextInput from '@/components/Input/TextInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/utils/schemas';

function Profile() {
  const { user, profile } = useAuth();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imageInput = useRef(null);
  const [imageUrl, setImageUrl] = useState(user?.picture);
  const [changePassword, setChangePassword] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  useEffect(() => {
    if (user) {
      // Values will be set via reset if needed, but for now using defaultValues
    }
  }, [user]);

  const onSubmit = (data) => {
    // TODO: integrate with profile update service
  };

  const uploadFromGallery = () => {
    imageInput.current.click();
    imageInput.current.onchange = (e) => {
      let file = e.target.files[0];
      if (file) {
        let blob = new Blob([file], { type: file.type });
        setImageUrl(URL.createObjectURL(blob));
      }
    };
  };

  return (
    <>
      {/* profile pics */}
      <div className='profile-pics skeleton h-[150px] w-[150px] mx-auto relative group'>
        <input type="file" accept='image/*' ref={imageInput} className='hidden' />
        <img src={imageUrl || user?.picture} alt={`${user?.first_name || 'User'} profile picture`} className='h-[100%] w-[100%] object-cover rounded-[50%]' />
        <button type='button' className='bg-[#DB4444] absolute top-[75%] left-[75%] w-[30px] h-[30px] rounded-[50%]' onClick={uploadFromGallery}>
          <Pencil size={14} className='text-white mx-auto' />
        </button>
      </div>

      {/* user information */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className='text-[#DB4444] font-semibold text-center md:text-start text-[1.25rem]'>Edit Your Profile</h3>
        <div className='mt-[16px] grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[50px]'>
          <TextInput label='First Name' id='first_name' type='text' {...register('first_name')} error={errors.first_name?.message} />
          <TextInput label='Last Name' id='last_name' type='text' {...register('last_name')} error={errors.last_name?.message} />
        </div>

        <div className='mt-[16px] grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[50px]'>
          <div>
            <TextInput label='Email' id='email' type='email' {...register('email', { onChange: () => setEmailChanged(true) })} error={errors.email?.message} />
            {emailChanged && (
              <p className="text-xs text-yellow-600 mt-1">
                You'll receive a verification email to confirm this change.
              </p>
            )}
          </div>
          <TextInput label='Address' id='address' type='text' {...register('address')} />
        </div>

        {/* Toggle for password change */}
        <CheckboxInput label='Change password' checked={changePassword} onChange={() => setChangePassword((prev) => !prev)} />

        {/* password changes */}
        {changePassword && (
          <div className='flex flex-col gap-[16px] mt-[16px]'>
            <p>Password Changes</p>
            <TextInput type='password' placeholder='Current Password' id='old_password' {...register('old_password')} error={errors.old_password?.message} />
            <TextInput type='password' placeholder='New Password' id='new_password' {...register('new_password')} error={errors.new_password?.message} />
            <TextInput type='password' placeholder='Confirm New Password' id='confirm_new_password' {...register('confirm_new_password')} error={errors.confirm_new_password?.message} />
          </div>
        )}

        <div className='flex justify-end items-center mt-[24px] gap-[32px]'>
          <button type='button'>Cancel</button>
          <button type="submit" className='text-white bg-[#DB4444] w-[214px] h-[56px] rounded-[4px]' disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </>
  );
}

export default Profile;
