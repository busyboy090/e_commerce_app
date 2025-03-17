import React from "react";
import SideImage from "../../assets/images/login-register-image.svg";

function Register() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[129px] mt-[60px] mb-[140px] lg:pe-[139px] md:px-[20px]">
        <img src={SideImage} alt="" className="lg:col-span-6 max-lg:hidden" />
        <div className="max-lg:px-[20px] col-span-4">
          {/* Registration form */}
          <form action="">
            <h2 className="text-[2.25rem] mb-[24px] max-md:text-center">Create an account</h2>
            <p className="text-[1rem] max-md:text-center">Enter your details below</p>
            <div className="flex flex-col gap-[15px]">
                {/* name input */}
                <div className="mt-5">
                    <div className="relative">
                        <input
                        id="username"
                        name="username"
                        type="text"
                        className="border-b border-gray-300 py-1 focus:border-b-2 focus:outline-none peer w-full"
                        />
                        <label
                        htmlFor="username"
                        className="absolute left-0 top-1 text-gray-300 peer-focus:text-xs peer-focus:-top-4 transition-all"
                        >
                        Name
                        </label>
                    </div>
                </div>
                {/* email and phone number input */}
                <div className="mt-5">
                    <div className="relative">
                        <input
                        id="Email or Phone Number"
                        name="username"
                        type="text"
                        className="border-b border-gray-300 py-1 focus:border-b-2 focus:outline-none peer w-full"
                        />
                        <label
                        htmlFor="Email or Phone Number"
                        className="absolute left-0 top-1 text-gray-300 peer-focus:text-xs peer-focus:-top-4 transition-all"
                        >
                            Email or Phone Number
                        </label>
                    </div>
                </div>
                {/* password */}
                <div className="mt-5">
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="border-b border-gray-300 py-1 focus:border-b-2 focus:outline-none peer w-full"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-0 top-1 text-gray-300 peer-focus:text-xs peer-focus:-top-4 transition-all"
                        >
                            Password
                        </label>
                    </div>
                </div>
            </div>

            {/* Create account button to submit the form */}
            <input type="submit" value='Create Account' className="w-full bg-[#DB4444] h-[56px] mt-[40px] rounded-[4px] text-white"/>

            {/* signup with Google */}
            <a href="" className="w-full flex justify-center items-center gap-[16px] mt-[16px] h-[56px] rounded-[4px] border border-[rgba(0,0,0,0.4)]">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" className="size-[24px]" />
                <span className="text-[1rem]">Sign up with Google</span>
            </a>

            <p className="text-center mt-[20px]">Already have an account? <a href="/login" className="underline underline-offset-9 ms-2">Log in</a> </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
