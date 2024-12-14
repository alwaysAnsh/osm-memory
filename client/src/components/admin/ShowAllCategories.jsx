import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShowAllCategories = ({
  categoriesData,
  setIsShowCategoriesModalOpen,
}) => {
  const { adminToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v2/delete-category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`, // Include token for authorization
          },
        }
      );

      if (response.data.success === false) {
        console.log(response.data?.message);
      }
      alert(`Category deleted successfully`);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdate = async (categoryId) => {
    navigate(`/update-category/${categoryId}`);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">Categories</h2>
          <button
            onClick={() => setIsShowCategoriesModalOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-lg focus:outline-none"
          >
            &times; {/* Close "X" icon */}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {categoriesData.length > 0 ? (
            categoriesData.map((category) => (
              <div
                key={category._id}
                className="flex justify-between items-center p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <div>
                  <strong className="block text-lg text-gray-800">
                    {category.name}
                  </strong>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(category._id)}
                    className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition focus:outline-none"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No categories available.
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={() => setIsShowCategoriesModalOpen(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowAllCategories;
