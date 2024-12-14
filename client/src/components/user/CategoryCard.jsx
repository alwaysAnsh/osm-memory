import React from "react";
import { Link } from "react-router-dom"; // Import Link component for routing
import { FaFile } from "react-icons/fa"; // Import a file icon from react-icons
import { useSelector } from "react-redux"; // Access user state

const CategoryCard = ({ category }) => {
  const { user } = useSelector((state) => state.user); // Access user ID
  if (!category || !category._id) {
    return (
      <div className="bg-gray-200 p-4 rounded-lg">Invalid category data</div>
    );
  }
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold mb-4">{category.name}</h2>

      {/* Horizontal Scrollable Container for Subcategories */}
      <div className="flex flex-row space-x-4 overflow-x-auto py-2">
        {category.subcategories.map((subcat, index) => (
          <div
            key={`${subcat.name}-${index}`}
            className="flex flex-col items-center text-center"
          >
            {/* Wrap subcategory in Link to make it clickable */}
            <Link
              to={`/user-dashboard/${user._id}/${category.name}/${subcat.name}`} // Corrected path
              className="flex flex-col items-center text-center cursor-pointer"
            >
              {/* Render Uploaded Image as Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-2">
                {subcat.icon ? (
                  <img
                    src={subcat.icon} // Image URL
                    alt={subcat.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                ) : (
                  <FaFile style={{ color: "#FF5733", fontSize: "20px" }} />
                )}
              </div>
              <h3 className="text-sm font-medium truncate">{subcat.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
