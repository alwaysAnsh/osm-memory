import React, { useState } from "react";
import axios from "axios";
import { adminLogin } from "../../redux/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "admin123",
    password: "admin@password",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/admin/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(adminLogin(response.data.token)); // Save token to Redux and sessionStorage
      const adminId = response.data.admin._id;
      navigate(`/admin-dashboard/${adminId}`); // Navigate to dashboard
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Gradient Background and Form */}
      <div className="flex-1 flex justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 sm:p-12 shadow-lg rounded-lg">
        <div className="w-full max-w-md ">
          <div className="flex justify-center">
            <h1
              className="text-5xl font-bold bg-gradient-to-r from-amber-100
via-orange-100
to-lime-100 text-transparent bg-clip-text"
            >
              OSM MEMORY
            </h1>
          </div>
          <h1 className="text-2xl font-extrabold text-center text-white mb-6">
            Admin Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="username"
                className="text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          

          
        </div>
      </div>

      {/* Right Side: Background Image */}
      <div className="flex   bg-cover bg-center rounded-r-lg ">
        <img
          src="https://static.vecteezy.com/system/resources/previews/006/405/796/non_2x/an-illustration-of-admin-panel-avatars-with-website-vector.jpg"
          alt=""
          className='sm:hidden lg:block lg:w-1/2 '
        />
      </div>
    </div>
  );
};

export default AdminLogin;
