// AdminDashboard.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { adminLogout } from "../../redux/adminSlice";
import ShowAllCategories from "./ShowAllCategories";

const AdminDashboard = () => {
  const { adminToken } = useSelector((state) => state.auth);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isShowCategoriesModalOpen, setIsShowCategoriesModalOpen] =
  useState(false);
  
  const [formData, setFormData] = useState({
    parentCategory: "",
    newCategoryName: "",
    newCategoryDescription: "",
    name: "",
    description: "",
    file: null,
    icon: null, // Handles the icon for subcategories
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, icon: file });
    }
  };

  const handleCreateNewCategory = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/create-category`,
        {
          name: formData.newCategoryName,
          description: formData.newCategoryDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      alert("New category created successfully!");
      setCategories((prev) => [...prev, response.data.category]);
      setFormData({
        ...formData,
        newCategoryName: "",
        newCategoryDescription: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create new category");
    }
  };

  const handleSubmitSubcategory = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("parentCategory", formData.parentCategory);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("file", formData.file);
      if (formData.icon) formDataToSend.append("icon", formData.icon);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/create-sub-category`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      alert("Subcategory created successfully!");
      setFormData({
        parentCategory: "",
        name: "",
        description: "",
        file: null,
        icon: null,
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create subcategory");
    }
  };

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/");
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/get-all-categories`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin!</h1>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Category
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              Create Category/Subcategory
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Select Category
                </label>
                <select
                  name="parentCategory"
                  value={formData.parentCategory}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">-- Select a Category --</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                  <option value="new">+ Create New Category</option>
                </select>
              </div>

              {formData.parentCategory === "new" && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      New Category Name
                    </label>
                    <input
                      type="text"
                      name="newCategoryName"
                      value={formData.newCategoryName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      New Category Description
                    </label>
                    <textarea
                      name="newCategoryDescription"
                      value={formData.newCategoryDescription}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    onClick={handleCreateNewCategory}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Create Category
                  </button>
                </>
              )}

              {formData.parentCategory && formData.parentCategory !== "new" && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Subcategory Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Subcategory Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      File (.csv/.json)
                    </label>
                    <input
                      type="file"
                      accept=".csv,.json"
                      onChange={handleFileChange}
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium
                  mb-1"
                    >
                      Subcategory Icon (optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconChange}
                      className="w-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmitSubcategory}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Create Subcategory
                  </button>
                </>
              )}
            </form>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isShowCategoriesModalOpen && (
        <ShowAllCategories
          categoriesData={categories}
          setIsShowCategoriesModalOpen={setIsShowCategoriesModalOpen}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
