import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AuthRegister = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile: "",
    firstName: "",
    lastName: "",
    otp: "",
    confirmPassword: "",
  })

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSendOtp = async() => {
    try {
      const mobile = formData.mobile
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/send-otp`,{mobile} )
      if(response.data.success == false){
        console.log("error in response.")
      }
      setOtpSent(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRegister = async() => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/register-mobile`,formData)
      console.log("response registring: ", response)
      navigate('/auth-L')
    } catch (error) {
      console.log("error in registering: ", error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegisterFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    // Handle register logic here

  };

  return (
    <div className="flex min-h-screen w-full flex-wrap items-stretch bg-white dark:bg-gray-800 max-md:pb-20 max-md:pt-32">
      <div className="grow md:flex md:w-1/2 md:flex-col md:items-center md:justify-center md:py-20">
        <div className="w-full px-4 text-center text-xs lg:w-1/2">
          <h1 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">Welcome!! Sign up here</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Access your account to explore our amazing features.
          </p>
          <form className="flex flex-col gap-6"  onSubmit={handleRegisterFormSubmit}>
            <input id="plan" type="hidden" value="" name="plan" />

            <div className = 'flex flex-row gap-3'>

            <div className="relative">
              <label
                className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3"
                htmlFor=""
              >
                <span>First Name</span>
              </label>
              <input
                id="firstName"
                className="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-white dark:border-gray-600 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
                name="firstName"
                onChange={handleChange}
                value = {formData.firstName}
                type="text"
                placeholder="Pappi"
              />
            </div>
            <div className="relative">
              <label
                className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3"
                htmlFor=""
              >
                <span>Last Name</span>
              </label>
              <input
                id="lastName"
                className="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-white dark:border-gray-600 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                type="text"
                placeholder="jija"
              />
            </div>
            </div>

            <div className="relative">
              <label
                className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3"
                htmlFor="email"
              >
                <span>Email Address</span>
              </label>
              <input
                id="email"
                className="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-white dark:border-gray-600 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="relative">
              <label
                className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3"
                htmlFor="email"
              >
                <span>Phone Number (required)</span>
              </label>
              <input
                id="mobile"
                className="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-white dark:border-gray-600 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
                placeholder="+917617231365"
              />
            </div>

            <div className="relative">
              <label
                className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3"
                htmlFor="password"
              >
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-600  transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Your password"
                />
                <button
                  className="lqd-show-password absolute right-3 top-1/2 z-10 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <svg
                      strokeWidth="1.5"
                      className="w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                    </svg>
                  ) : (
                    <svg
                      strokeWidth="1.5"
                      className="w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
                      <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path>
                      <path d="M3 3l18 18"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="relative">
              <label
                className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3"
                htmlFor="password"
              >
                <span>Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-600  transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="confirm your password"
                />
                <button
                  className="lqd-show-password absolute right-3 top-1/2 z-10 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <svg
                      strokeWidth="1.5"
                      className="w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                    </svg>
                  ) : (
                    <svg
                      strokeWidth="1.5"
                      className="w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
                      <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path>
                      <path d="M3 3l18 18"></path>
                    </svg>
                  )}
                </button>
              </div>
              {otpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-600">OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
            </div>

            {/* <div className="my-2 flex justify-between gap-2">
              <div className="grow">
                <div className="relative">
                  <label
                    className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200"
                    htmlFor="remember"
                  >
                    <input
                      id="remember"
                      className="peer rounded border-gray-300 dark:border-gray-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
                      name="remember"
                      type="checkbox"
                    />
                    <span>Remember me</span>
                  </label>
                </div>
              </div>
              <div className="text-right">
                <a className="text-indigo-600 dark:text-indigo-400" href="/forgot-password">
                  Forgot Password?
                </a>
              </div>
            </div> */}

            <input className="hidden" id="recaptcha" value="0" />
            {!otpSent ? (
            <button
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          )}
            {/* <button
              className="lqd-btn group inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl lqd-btn-primary bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:bg-indigo-700 focus-visible:shadow-indigo-300/10 px-5 py-3"
              id="registerFormButton"
              type="submit"
            >
              Register
            </button> */}
            <div className="text-gray-600 dark:text-gray-400">
              By proceeding, you acknowledge and accept our{" "}
              <a className="font-medium text-indigo-600 underline" href="/terms" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a className="font-medium text-indigo-600 underline" href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              .
            </div>
          </form>
          <div className="mt-7 text-gray-600 dark:text-gray-400">
            Have an account?{" "}
            <a className="font-medium text-indigo-600 underline" href="/auth-L">
              Sign in
            </a>
          </div>
        </div>
      </div>

      <div
        className="hidden flex-col justify-center overflow-hidden bg-cover bg-center md:flex md:w-1/2"
        style={{
          backgroundImage: "url(https://img.freepik.com/free-vector/gray-neural-network-illustration_53876-78764.jpg?size=626&ext=jpg)",
        }}
      >
        <img
          className="translate-x-[27%] rounded-[36px] shadow-[0_24px_88px_rgba(0,0,0,0.55)]"
          src="https://images.unsplash.com/photo-1566241477600-ac026ad43874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxzY3JlZW5zaG90fGVufDB8MHx8fDE3Mjk1MTI1OTB8MA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Service Dashboard Mockup"
        />
      </div>
    </div>
  );
};

export default AuthRegister;
