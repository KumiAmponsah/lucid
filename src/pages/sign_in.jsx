import React, { useState } from 'react';
import BackgroundImage from '../assets/background.png';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFacebookSignin = () => {
    
    navigate('/edit');
  };
  const handleFacebookSignup = () => {
    navigate('/clientsignprofile');
  };
  const SSignin = () => {
    navigate('/accountsettings');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-300">
        <div
          className="hero flex-1 w-full"
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="items-center text-center font-['Roboto']">
            {/* Title */}
            <h1 className="text-black font-semibold text-3xl my-10">
              Create an account
            </h1>

            {/* Login form */}
            <div className="flex justify-center px-4 mb-14 mt-6">
              <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
                <fieldset className="fieldset w-full p-4">
                  {/* Email */}
                  <label className="label font-medium text-base text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input w-full px-2 bg-gray-300 text-black text-base"
                    placeholder="Email"
                  />

                  {/* Password Field */}
                  <label className="label font-medium text-base text-black ">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input w-full px-3 pr-10 bg-gray-300 text-black focus:outline-none text-base"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 z-20"
                    >
                      <div className='relative w-5 h-5 flex items-center justify-center'>
                        <span className={`transition-all duration-300 ease-in-out transform ${
                          showPassword ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                          } absolute`}>
                          {/* Eye Slash (Hide Password) */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 
                            18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 
                            8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 
                            1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                          </span>

                        <span
                          className={`transition-all duration-300 ease-in-out transform ${
                            showPassword ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                          } absolute`}
                        >
                          {/* Eye (Show Password) */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 
                            11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </span>

                      </div>
                    </button>
                  </div>

                  {/* Buttons */}
                  <button onClick={SSignin} className="btn text-xl text-white bg-blue-700 hover:bg-blue-600 hover:tracking-wide mt-4 font-medium">
                    Sign in
                  </button>

                  {/* OR Divider */}
                  <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* Google Login */}
                  <Link to="/userProfile">
                  <button onClick={handleFacebookSignup} className="btn text-base bg-white hover:border-orange-600 border-2 font-medium text-black border-blue-700 w-full flex items-center justify-center gap-2">
                    <svg
                      aria-label="Google logo"
                      width="17"
                      height="17"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Sign-in with Google
                  </button>
                  </Link>

                  {/* Facebook Login */}
                  <Link to="/userProfile">
                  <button 
                    onClick={handleFacebookSignin}
                    className="btn text-base hover:border-orange-600 bg-white border-2 font-medium text-black border-blue-700 w-full flex items-center justify-center gap-2 mt-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="#1877F2"
                        d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                      />
                      <path
                        fill="#FFF"
                        d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"
                      />
                    </svg>
                    Sign-in with Facebook
                  </button>
                  </Link>
                </fieldset>
              </div>
            </div>
            <div className='mb-6 mt-2 mx-2 p-2 text-black cursor-default'>
              <div> Don't have an account? <span className='px-2'><Link to="/signup" className='text-blue-700 hover:text-orange-600 cursor-pointer'>Sign Up</Link></span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;