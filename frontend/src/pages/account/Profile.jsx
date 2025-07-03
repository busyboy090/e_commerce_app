import {React, useEffect, useRef, useState} from 'react'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePics from '@/assets/images/profile-pics.jpg';
import useAuth from '@/hooks/useAuth';
import CheckboxInput from '@/components/ui/CheckboxInput';

// InputField
function InputField({label, id, onChange, inputType, value}) {
  return (
    <div className="flex flex-col gap-[5px]">
        <label htmlFor={id}>
          {label}
        </label>
        <input
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
          className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
        />
    </div>
  )
}

function Profile() {
  const { auth } = useAuth()

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoContainer, setVideoContainer] = useState(false);
  const imageInput = useRef(null);
  const [imageUrl, setImageUrl] = useState(auth?.user?.picture);  
  // const [editProfilePics, setEditProfilePics] = useState(false);

  const { user, profile } = useAuth()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    old_Password: '',
    new_password: '',
    confirm_new_password: ''
  })

  useEffect(() => {
    setFormData((prev) => ({...prev, 
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      address: profile?.address
    }));
  }, [user])
  
  const handleChange = (field, value) => {
    setFormData((prev) => ({...prev, [field] : value}))
  }

  const [changePassword, setChangePassword] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);

  const uploadFromGallery = () => {
    imageInput.current.click()
    imageInput.current.onchange = (e) => {
      let file = e.target.files[0];
      
      if(file) {
        let blob = new Blob([file], {type: file.type});

        let imageUrl = URL.createObjectURL(blob);

        setImageUrl(imageUrl);
      }
    }
  }


  return (
    <>
      {/* profile pics */}
        <div className='profile-pics skeleton h-[150px] w-[150px] mx-auto relative group'>
          <input type="file" accept='image/*' ref={imageInput} className='hidden'/>
          <img src={imageUrl || user?.picture} alt="" className='h-[100%] w-[100%] object-cover rounded-[50%]'/>
          <button type='button' className='bg-[#DB4444] absolute top-[75%] left-[75%] w-[30px] h-[30px] rounded-[50%]' onClick={uploadFromGallery}>
            <FontAwesomeIcon icon={faPencil}  className='text-white'/>
          </button>
        </div>
      {/* user information */}
        <form>
          <h3 className='text-[#DB4444] font-semibold text-center md:text-start text-[1.25rem]'>Edit Your Profile</h3>
          <div className='mt-[16px] grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[50px]'>
              {/* first name */}
              <InputField label='First Name' id='first_name' inputType='text' value={formData.first_name} onChange={(e) => {
                handleChange('first_name', e.target.value)
              }} />

              {/* last name */}
              <InputField label='Last Name' id='last_name' inputType='text' value={formData.last_name} onChange={(e) => {
                handleChange('last_name', e.target.value)
              }} />
          </div>

          <div className='mt-[16px] grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[50px]'>
              <div>
                {/* email  */}
                <InputField label='Email' id='email' inputType='email' value={formData.email} onChange={(e) => {
                  setEmailChanged(true)
                  handleChange('email', e.target.value)
                }} />

                {emailChanged && (
                  <p className="text-xs text-yellow-600 mt-1">
                    You'll receive a verification email to confirm this change.
                  </p>
                )}
              </div>

              {/* address */}
              <InputField label='Address' id='address' inputType='text' value={formData.address} onChange={(e) => {
                handleChange('address', e.target.value)
              }} />
          </div>

          {/* Toggle for password change */}
          <CheckboxInput label='Change password' checked={changePassword} onChange={() => {
            setChangePassword((prev) => !prev)
          }}/>

          {/* password changes */}
          {
            changePassword && (
              <div className='flex flex-col gap-[16px] mt-[16px]'>
                  <p>Password Changes</p>
                  {/* current passowrd */}
                  <input
                      type="password"
                      placeholder='Current Password'
                      className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                      value={formData.old_Password}
                      onChange={(e) => {
                        handleChange('old_password', e.target.value)
                      }}
                  />

                  {/* new password */}
                  <input
                    type="password"
                    placeholder='New Password'
                    className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                    value={formData.new_password}
                    onChange={(e) => {
                      handleChange('new_password', e.target.value)
                    }}
                  />

                  {/* confirm new password */}
                  <input
                    type="password"
                    placeholder='Confirm New Password'
                    className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                    value={formData.confirm_new_password}
                    onChange={(e) => {
                      handleChange('confirm_new_password', e.target.value)
                    }}
                  />
              </div>
            )
          }

          <div className='flex justify-end items-center mt-[24px] gap-[32px]'>
              <button className=''>Cancel</button>
              <button type="submit" className='text-white bg-[#DB4444] w-[214px] h-[56px] rounded-[4px]'>
                Save Changes
              </button>
          </div>
          
        </form>
    </>
  )
}

export default Profile