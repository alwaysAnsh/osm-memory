import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { adminLogout } from "../../redux/adminSlice";
import ShowAllCategories from "./ShowAllCategories";

const AdminDashboard = () => {
    const {adminToken} = useSelector((state) => state.auth)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isShowCategoriesModalOpen, setIsShowCategoriesModalOpen] = useState(false);
  const [categories, setCategories] = useState([])

  // const [formData, setFormData] = useState({ name: "", description: "", file: null });

  const [formData, setFormData] = useState({
    parentCategory: "",
    newCategoryName: "",
    newCategoryDescription: "",
    name: "",
    description: "",
    file: null,
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
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
            Authorization: `Bearer ${adminToken}`, // Ensure you have the admin token
          },
        }
      );
      alert("New category created successfully!");
      setCategories((prev) => [...prev, response.data.category]);
      setFormData({ ...formData, newCategoryName: "", newCategoryDescription: "" });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create new category");
    }
  };
  

  const handleSubmit = async (type) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("parentCategory", formData.parentCategory);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("file", formData.file);
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/create-sub-category`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`,
          },
          params: {
            parentCategory: formData.parentCategory,
          },
        }
      );
      if(response.data.success == false){
        alert(response.data.message);
        return;
      }
      console.log("created category: ", response.data.category)
      alert("Subcategory created successfully!");
      setFormData({ name: "", description: "", file: null, parentCategory: "" });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create subcategory");
    }
  };
  


  const handleLogout = () => {
    console.log("logout")
    dispatch(adminLogout())
    navigate('/')
  }

  const showAllCategories = async () => {
    
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/get-all-categories`, {
            headers: {
                // "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${adminToken}`, // Include token for authorization
              },
        })
        if(response.data.success == false){
            console.log("Response not found")
            return;
        }
        
        setCategories(response.data.categories)
        
    } catch (error) {
        console.error(error);
    }
  }
  

  useEffect(() => {
    showAllCategories();
  },[])

  useEffect(() => {
    
    console.log("Updated categories: ", categories); // Logs the updated state
    // showAllCategories();
    
  }, [categories]);

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
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Category
        </button>
        
        <button
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          onClick={() => setIsShowCategoriesModalOpen(true)}
        >
          Show all Categories
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>

      {/* Create Category Modal 1 */}
      {/* {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create Category</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
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
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Choose File</label>
                <input
                  type="file"
                  accept=".xlsx,.csv,.json"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
                {formData.file && (
                  <p className="mt-2 text-sm text-gray-600">Selected File: {formData.file.name}</p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit("Create")}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      {/* Create Category Modal 2 */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-pink-200 bg-opacity-20">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create Category/Subcategory</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select Category</label>
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

              {/* New Category Fields */}
              {formData.parentCategory === "new" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">New Category Name</label>
                  <input
                    type="text"
                    name="newCategoryName"
                    value={formData.newCategoryName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  <label className="block text-sm font-medium mb-1 mt-4">New Category Description</label>
                  <textarea
                    name="newCategoryDescription"
                    value={formData.newCategoryDescription}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  ></textarea>
                  <button
                    type="button"
                    onClick={handleCreateNewCategory}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Create Category
                  </button>
                </div>
              )}

              {/* Subcategory Fields */}
              {formData.parentCategory && formData.parentCategory !== "new" && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Subcategory Name</label>
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
                    <label className="block text-sm font-medium mb-1">Subcategory Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Choose File (only .csv or .json files)</label>
                    <input
                      type="file"
                      accept=".xlsx,.csv,.json"
                      onChange={handleFileChange}
                      className="w-full"
                      required
                    />
                    {formData.file && (
                      <p className="mt-2 text-sm text-gray-600">Selected File: {formData.file.name}</p>
                    )}
                  </div>
                </>
              )}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                {formData.parentCategory && formData.parentCategory !== "new" && (
                  <button
                    type="button"
                    onClick={() => handleSubmit("Create")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Finish
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Update Category Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Category</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
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
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Choose File</label>
                <input
                  type="file"
                  accept=".xlsx,.csv,.json"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
                {formData.file && (
                  <p className="mt-2 text-sm text-gray-600">Selected File: {formData.file.name}</p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit("Update")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {
        isShowCategoriesModalOpen && (
            <ShowAllCategories
                categoriesData = {categories}
                setIsShowCategoriesModalOpen = {setIsShowCategoriesModalOpen}
            />
        )
      }
      
    </div>
  );
};

export default AdminDashboard;
