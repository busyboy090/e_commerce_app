import {React, use, useRef, useState} from 'react'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePics from '../../assets/images/profile-pics.jpg';

function Profile() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoContainer, setVideoContainer] = useState(false);
  const imageInput = useRef(null);
  const [imageUrl, setImageUrl] = useState(ProfilePics);
  // const [editProfilePics, setEditProfilePics] = useState(false);
  

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
              <div className="flex flex-col gap-[5px]">
                  <label htmlFor="first-name">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                  />
              </div>

              {/* last name */}
              <div className="flex flex-col gap-[5px ">
                  <label htmlFor="last-name">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                  />
              </div>
          </div>

          <div className='mt-[16px] grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[50px]'>
              {/* email  */}
              <div className="flex flex-col gap-[5px]">
                  <label htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                  />
              </div>

              {/* address */}
              <div className="flex flex-col gap-[5px]">
                  <label htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
                  />
              </div>
          </div>

          {/* password changes */}
          <div className='flex flex-col gap-[16px] mt-[16px]'>
              <p>Password Changes</p>
              {/* current passowrd */}
              <input
                  type="password"
                  placeholder='Current Password'
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
              />

              {/* new password */}
              <input
                  type="password"
                  placeholder='New Password'
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
              />

              {/* confirm new password */}
              <input
                  type="password"
                  placeholder='Confirm New Password'
                  className="h-[50px] w-full bg-[#F5F5F5] rounded-[4px] focus:outline-0 p-[10px]"
              />
          </div>

          <div className='flex justify-end items-center mt-[24px] gap-[32px]'>
              <button className=''>Cancel</button>
              <input type="submit" value="Save Changes" className='text-white bg-[#DB4444] w-[214px] h-[56px] rounded-[4px]'/>
          </div>
          
        </form>
    </>
  )
}

export default Profile