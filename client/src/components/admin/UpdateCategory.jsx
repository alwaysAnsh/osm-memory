import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  const { adminToken } = useSelector((state) => state.auth);
  const { categoryId } = useParams();

  const [category, setCategory] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [icon, setIcon] = useState(null); // Store updated icon
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        100,
        0,
        (uri) => setIcon(uri),
        "base64"
      );
    }
  };

  // Fetch category and subcategory details
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/get-category/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`, // Include token for authorization
            },
          }
        );
        setCategory(response.data.category);
        setSubcategories(response.data.subcategories);
        setUpdatedCategoryName(response.data.category.name);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch category details.");
      }
    };
    fetchCategoryDetails();
  }, [categoryId]);

  // Handle updating category name
  const handleUpdateCategoryName = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v2/category/${categoryId}`,
        { name: updatedCategoryName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      alert("Category name updated successfully!");
      setCategory((prev) => ({ ...prev, name: updatedCategoryName }));
    } catch (err) {
      console.error(err);
      setError("Failed to update category name.");
    }
  };

  // Handle updating subcategory
  const handleUpdateSubcategory = async (subcategoryId, updatedData) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", updatedData.category);
      formData.append("newName", updatedData.name);
      formData.append("description", updatedData.description);
      if (updatedData.file) formData.append("file", updatedData.file);
      if (updatedData.icon) formData.append("icon", updatedData.icon); // Include icon if provided

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v2/subcategory/${subcategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      alert("Subcategory updated successfully!");
      setSubcategories((prev) =>
        prev.map((sub) =>
          sub._id === subcategoryId ? { ...sub, ...updatedData } : sub
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update subcategory.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Update Category
      </h1>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Category Name
        </label>
        <input
          type="text"
          value={updatedCategoryName}
          onChange={(e) => setUpdatedCategoryName(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpdateCategoryName}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Category Name
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Subcategories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory._id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {subcategory.name}
            </h3>

            <label className="block text-sm font-medium text-gray-600 mb-2">
              Subcategory Name
            </label>
            <input
              type="text"
              value={subcategory.name}
              onChange={(e) =>
                setSubcategories((prev) =>
                  prev.map((sub) =>
                    sub._id === subcategory._id
                      ? { ...sub, name: e.target.value }
                      : sub
                  )
                )
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-600 mb-2">
              Description
            </label>
            <textarea
              value={subcategory.description}
              onChange={(e) =>
                setSubcategories((prev) =>
                  prev.map((sub) =>
                    sub._id === subcategory._id
                      ? { ...sub, description: e.target.value }
                      : sub
                  )
                )
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <label className="block text-sm font-medium text-gray-600 mb-2">
              Choose New File
            </label>
            <input
              type="file"
              accept=".xlsx,.csv,.json"
              onChange={(e) =>
                setSubcategories((prev) =>
                  prev.map((sub) =>
                    sub._id === subcategory._id
                      ? { ...sub, file: e.target.files[0] }
                      : sub
                  )
                )
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm"
            />
            {subcategory.file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected File: {subcategory.file.name}
              </p>
            )}
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Choose New Icon
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSubcategories((prev) =>
                  prev.map((sub) =>
                    sub._id === subcategory._id
                      ? { ...sub, icon: e.target.files[0] }
                      : sub
                  )
                )
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm"
            />
            <button
              onClick={() =>
                handleUpdateSubcategory(subcategory._id, {
                  category: updatedCategoryName,
                  name: subcategory.name,
                  description: subcategory.description,
                  file: subcategory.file,
                  icon: subcategory.icon,
                })
              }
              className="mt-4 w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Update Subcategory
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateCategory;
