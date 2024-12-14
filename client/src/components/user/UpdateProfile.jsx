import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { setUser, updateUserProfile } from "../../redux/userSlice";


const UpdateProfile = ({ onClose }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: user?.firstName || "",
    email: user?.email || "",
    
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file upload
  // const handleFileChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     profilePicture: e.target.files[0],
  //   }));
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");
  
    try {
      // Prepare JSON payload
      const dataToSend = {
        firstName: formData.name,
        email: formData.email,
      };
  
      // Make API request to update profile
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v2/update-profile/${user._id}`,
        dataToSend, // Sending JSON data instead of FormData
        {
          headers: {
            "Content-Type": "application/json", // Ensure the backend knows the payload is JSON
          },
        }
      );
  
      if (response.data.success === false) {
        console.error("Error updating profile:", response.data.message);
        setError(response.data.message || "Failed to update profile. Try again.");
        return;
      }
      
      dispatch(updateUserProfile(response.data.user))
      setSuccessMessage("Profile updated successfully!");
      onClose(); // Close modal after success
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ❌
        </button>
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-gray-300 cursor-not-allowed "
              required
              readOnly
            />
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          {/* Profile Picture Upload */}
          {/* <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
          </div> */}
          <button
            type="submit"
            className={`${
              loading ? "bg-gray-400" : "bg-blue-500"
            } text-white py-2 px-4 rounded-lg`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
