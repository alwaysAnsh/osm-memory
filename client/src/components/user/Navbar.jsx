import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Avatar Icon
import UpdateProfile from "./UpdateProfile"; // Update Profile Modal

const Navbar = () => {
  const { user } = useSelector((state) => state.user); // Access user state from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
    useState(false); // Modal state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

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

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-800 dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navbar links */}
        <div
          className={`lg:flex items-center space-x-4 ${
            isMobileMenuOpen ? "flex" : "hidden"
          }`}
        >
          {!user ? (
            // Show login and sign up buttons when not logged in
            <>
              <Link
                to="/auth-L"
                className="text-gray-800 dark:text-white px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/auth-R"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
              <Link
                to="/auth-admin"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Agent Login
              </Link>
            </>
          ) : (
            // Show profile icon and logout button if logged in
            <>
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-gray-800 dark:text-white"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl} // User profile image
                      alt="Profile"
                      className="w-10 h-10 rounded-full border"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-500 dark:text-gray-300" />
                  )}
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 dark:bg-gray-800"
                    style={{ zIndex: 1000 }} // Apply z-index for stacking above other content
                  >
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
            </>
          )}
        </div>
      </div>

      {/* Update Profile Modal */}
      {isUpdateProfileModalOpen && (
        <UpdateProfile onClose={() => setIsUpdateProfileModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
