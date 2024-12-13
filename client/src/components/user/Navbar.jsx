import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import an avatar icon from react-icons
import UpdateProfile from "./UpdateProfile"; // Import UpdateProfile component

const Navbar = () => {
  const { user } = useSelector((state) => state.user); // Access user state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
    useState(false); // Modal state

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center ml-2 text-2xl font-semibold whitespace-nowrap dark:text-white">
            OsmMemory
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Right-Side Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            // Show profile icon or fallback if user is logged in
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-800 dark:text-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl} // User's profile image
                    alt="Profile"
                    className="w-10 h-10 rounded-full border"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-500 dark:text-gray-300" />
                )}
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 dark:bg-gray-800">
                  <Link
                    to="#"
                    onClick={() => setIsUpdateProfileModalOpen(true)}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Show login/signup buttons if user is not logged in
            <>
              <Link
                to="/login"
                className="text-gray-800 dark:text-white px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="flex md:hidden p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Update Profile Modal */}
      {isUpdateProfileModalOpen && (
        <UpdateProfile onClose={() => setIsUpdateProfileModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
