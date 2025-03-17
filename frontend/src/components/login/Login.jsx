import React from "react";
import SideImage from "../../assets/images/login-register-image.svg";

function Login() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[129px] mt-[60px] mb-[140px] lg:pe-[139px] md:px-[20px]">
        <img src={SideImage} alt="" className="lg:col-span-6 max-lg:hidden" />
        <div className="max-lg:px-[20px] col-span-4">
          {/* Sign In Form */}
          <form action="">
            <h2 className="text-[2.25rem] mb-[24px] max-md:text-center">Log in to Exclusive</h2>
            <p className="text-[1rem] max-md:text-center">Enter your details below</p>
            <div className="flex flex-col gap-[15px]">
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

            <div className="mt-[40px] flex justify-between items-center">
                {/* Remember me checkbox */}
                <div className="flex items-center">
                    <input type="checkbox" id="remember" name="remember" className="mr-[10px]"/>
                    <label htmlFor="remember" className="text-[#333333]">Remember me</label>
                </div>

                {/* Forgot password */} 
                <a href="/htmlForgot-password" className="text-[#DB4444] block">Forgot Password?</a>
            </div>

            {/* login button to submit the Form */}
            <input type="submit" value='Log In' className="mt-[40px] w-full bg-[#DB4444] h-[56px] rounded-[4px] text-white"/>

            {/* signup link */}
            <p className="text-center mt-[20px]">Not a user? <a href="/register" className="underline underline-offset-9 ms-2">Sign Up</a> </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
