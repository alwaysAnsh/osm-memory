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
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [isCreateSubcategoryModalOpen, setIsCreateSubcategoryModalOpen] =
    useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    parentCategory: "",
    newCategoryName: "",
    newCategoryDescription: "",
    name: "",
    description: "",
    file: null,
    icon: null,
  });

  const isUpdateCategoryModalOpen = false;
  const [isShowCategoriesModalOpen, setIsShowCategoriesModalOpen] =
    useState(false);

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
      setIsCreateSubcategoryModalOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create subcategory");
    }
  };
<<<<<<< HEAD
  

=======
>>>>>>> icon

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
<<<<<<< HEAD
        
        setCategories(response.data.categories)
        
=======
      );
      setCategories(response.data.categories);
>>>>>>> icon
    } catch (error) {
      console.error(error);
    }
  };
  const handleCategoryDelete = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== categoryId)
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
  style={{
    backgroundImage: `url('https://t3.ftcdn.net/jpg/03/91/46/10/360_F_391461057_5P0BOWl4lY442Zoo9rzEeJU0S2c1WDZR.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh", // Set the height as needed
    width: "100vw", // Set the width as needed
  }}
>
  {/* Your content here */}
</div>
      <h1 className="text-3xl font-bold mb-52 text-white absolute ">Welcome, Admin!</h1>
      <div className="flex gap-4 flex-col absolute">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setIsCreateCategoryModalOpen(true)}
        >
          Create Category
        </button>
<<<<<<< HEAD
        
=======
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setIsCreateSubcategoryModalOpen(true)}
        >
          Create Subcategory
        </button>
>>>>>>> icon
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={() => setIsShowCategoriesModalOpen(true)}
        >
          Show Categories
        </button>

        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Modal for Creating Categories */}
      {isCreateCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category Name
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
                  Description
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
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create Category
              </button>
            </form>
            <button
              type="button"
              onClick={() => setIsCreateCategoryModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* Create Category Modal 2 */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-pink-200 bg-opacity-20">
=======
      {/* Modal for Creating Subcategories */}
      {isCreateSubcategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
>>>>>>> icon
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create Subcategory</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Select Parent Category
                </label>
                <select
                  name="parentCategory"
                  value={formData.parentCategory}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">-- Select a Category --</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
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
                  Description
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
                  Upload File
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Upload Icon (Optional)
                </label>
                <input
                  type="file"
                  name="icon"
                  onChange={handleIconChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmitSubcategory}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Create Subcategory
              </button>
            </form>
            <button
              type="button"
              onClick={() => setIsCreateSubcategoryModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isUpdateCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Category</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  name="newCategoryName"
                  value={formData.newCategoryName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="newCategoryDescription"
                  value={formData.newCategoryDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <button
                type="button"
                onClick={handleUpdateCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Category
              </button>
            </form>
            <button
              type="button"
              onClick={() => setIsUpdateCategoryModalOpen(false)}
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
          onCategoryDelete={handleCategoryDelete}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
