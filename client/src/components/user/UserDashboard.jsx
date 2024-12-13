import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import Navbar from "./Navbar";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [fileData, setFileData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/get-all-categories`
      );
      const categoriesData = response.data.categories;
      setCategories(categoriesData);

      // Process file URLs
      categoriesData.forEach((category) =>
        category.subcategories.forEach(async (subcat) => {
          if (subcat.fileUrl) {
            await fetchAndParseFile(subcat.fileUrl, subcat.name);
          }
        })
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch and parse a file
  const fetchAndParseFile = async (fileUrl, subcategoryName) => {
    try {
      const response = await axios.get(fileUrl, { responseType: "blob" });
      const textData = await response.data.text();

      if (response.data.type === "application/json") {
        setFileData((prev) => ({
          ...prev,
          [subcategoryName]: JSON.parse(textData),
        }));
      } else if (response.data.type === "text/csv") {
        Papa.parse(textData, {
          complete: (result) => {
            setFileData((prev) => ({
              ...prev,
              [subcategoryName]: result.data,
            }));
          },
          header: true,
        });
      }
    } catch (error) {
      console.error(`Error fetching or parsing file from ${fileUrl}:`, error);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="px-4">
        <h1 className="text-xl font-bold my-4">
          Welcome, {user.firstName}! 😊
        </h1>
        <button
          onClick={handleLogout}
          className="rounded-md bg-red-600 text-white px-4 py-2"
        >
          Logout
        </button>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>

              {category.subcategories.map((subcat) => (
                <div key={subcat.name}>
                  <h3 className="text-md font-medium">{subcat.name}</h3>
                  <p className="text-sm text-gray-500">{subcat.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
