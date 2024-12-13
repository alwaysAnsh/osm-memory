import React from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";

const ShowAllCategories = ({categoriesData, setIsShowCategoriesModalOpen}) => {

    const {adminToken} = useSelector((state) => state.auth)
    const navigate = useNavigate();

    const handleDelete = async (categoryId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v2/delete-category/${categoryId}`, {
                headers: {
                    // "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${adminToken}`, // Include token for authorization
                  },
            })

            if(response.data.success == false){
                console.log(response.data?.message)
            }
            alert(`category deleted successfuly`)
        } catch (error) {
            
        }
    }

    const handleUpdate = async (categoryId) => {
        navigate(`/update-category/${categoryId}`)
    }


    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
            {categoriesData.map((category) => (
              <div
                key={category._id}
                className="flex justify-between items-center py-4 border-b border-gray-300"
              >
                <div>
                  <strong className="block text-lg">{category.name}</strong>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(category._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => setIsShowCategoriesModalOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      );
}

export default ShowAllCategories