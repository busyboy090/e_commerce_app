import {React, useEffect, useRef, useState} from 'react'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePics from '../../assets/images/profile-pics.jpg';
import useAuth from '../../hooks/useAuth';

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

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    email: '',
    address: '',
    new_password: '',
    confirm_new_password: ''
  })

  useEffect(() => {
    setFormData((prev) => ({...prev, 
      first_name: auth?.user?.first_name,
      last_name: auth?.user?.last_name,
      email: auth?.user?.email,
    }));
  }, [])
  
  const handleChange = (field, value) => {
    setFormData((prev) => ({...prev, [field] : value}))
  }

  const takePicture = () => {
    setVideoContainer(true);
    navigator.mediaDevices.getUserMedia({
      video:true
    }).then(stream => {
      videoRef.current.srcObject = stream;
    }).catch(error => {
      console.log('Error accessing Camera:', error);
    })
  }

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if(canvas && video) {
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0,0,canvas.width,canvas.height);

      const imageDataURL = canvas.toDataURL('image/png');

      setImageUrl(imageDataURL);

      setVideoContainer(false);
    }
  }

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
      <div className={`${videoContainer ? 'block' : 'hidden'} bg-white fixed top-0 left-0 bottom-0 right-0 h-screen w-screen pt-1 z-50`}>
        <video ref={videoRef} className='h-[80vh]'  autoPlay></video>
        <div className='flex justify-end pe-5'>
          <button type='button' className='bg-white w-[120px] h-[50px] rounded-[4px] mt-4' onClick={() => {
            setVideoContainer(false);
          }}>Cancel</button>
          <button type='button' className='bg-[#DB4444] w-[120px] h-[50px] text-white rounded-[4px] mt-4' onClick={capture}>Capture</button>
        </div>
        <canvas ref={canvasRef} className='hidden'></canvas>
      </div>
      <form>
        <div className='profile-pics skeleton h-[150px] w-[150px] mx-auto relative group'>
          <input type="file" accept='image/*' ref={imageInput} className='hidden'/>
          <img src={imageUrl} alt="" className='h-[100%] w-[100%] object-cover rounded-[50%]'/>
          <button type='button' className='bg-[#DB4444] absolute top-[75%] left-[75%] w-[30px] h-[30px] rounded-[50%]'>
            <FontAwesomeIcon icon={faPencil}  className='text-white'/>
          </button>
          <ul className={`hidden shadow p-4 group-focus-within:flex absolute left-[40%] md:left-[100%] w-[200px] bg-white rounded-[1px] bottom-[-110px] md:bottom-[-70px] flex-col gap-[20px]`}>
            <li>
              <button type='button' onClick={takePicture}>
                Take a photo
              </button>
            </li>
            <li>
              <button type='button' onClick={uploadFromGallery}>
                Upload from gallery
              </button>
            </li>
          </ul>
        </div>
      </form>
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
              {/* email  */}
              <InputField label='Email' id='email' inputType='email' value={formData.email} onChange={(e) => {
                handleChange('email', e.target.value)
              }} />

              {/* address */}
              <InputField label='Address' id='address' inputType='text' value={formData.address} onChange={(e) => {
                handleChange('address', e.target.value)
              }} />
          </div>

          {/* password changes */}
          <div className='flex flex-col gap-[16px] mt-[16px]'>
              <p>Password Changes</p>
              {/* current passowrd */}
              <input
                  type="password"
                  placeholder='Current Password'
                  className="h-[50px] w-full text-gray-300 bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                  value={1222334}
                  readOnly
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