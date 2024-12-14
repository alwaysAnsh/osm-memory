import React, { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import TextInput from "../components/common/TextInput";
import Loading from "../components/common/Loading";
import CustomButton from "../components/common/CustomButton";

const ForgotPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrMsg("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/request-passwordreset`,
        {
          email: data.email,
        }
      );

      if (response.data.status === "PENDING") {
        setErrMsg({
          status: "success",
          message: "Reset link has been sent to your email. Please check.",
        });
      } else {
        setErrMsg({
          status: "failed",
          message: response.data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      setErrMsg({
        status: "failed",
        message: error.response?.data?.message || "Failed to reset password.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-6">
      {/* 3D Card */}
      <div className="relative bg-white w-full md:w-1/3 2xl:w-1/4 px-8 py-10 rounded-lg shadow-2xl transform transition-transform hover:scale-105 flex flex-col items-center">
        <p className="text-blue-600 text-3xl font-extrabold mb-6">
          Forgot Password
        </p>

        <span className="text-sm text-gray-600 mb-6 text-center">
          Enter the email address you used during registration, and we’ll help
          you reset your password.
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          {/* Email Input */}
          <TextInput
            name="email"
            placeholder="email@example.com"
            type="email"
            register={register("email", {
              required: "Email Address is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            styles="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500"
            error={errors.email ? errors.email.message : ""}
          />

          {/* Error Message */}
          {errMsg?.message && (
            <span
              role="alert"
              className={`text-sm font-medium ${
                errMsg?.status === "failed" ? "text-red-500" : "text-green-500"
              }`}
            >
              {errMsg?.message}
            </span>
          )}

          <div className="w-full h-12">
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl"
                title="Submit"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
