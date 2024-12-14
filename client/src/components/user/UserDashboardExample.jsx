import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import Navbar from "./Navbar";
import Testimonial from "./Testimonial";
import CategoryCard from "./CategoryCard";
import Fotter from "./Fotter";
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
      <div className="px-4 flex flex-col justify-center items-center bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1]">
        <div></div>
        <img src="" alt="" />
        {/* Categories Section with Fixed Height and Scroll */}
        <div
          className="overflow-y-auto mt-6 p-3 rounded-lg"
          style={{ width: "100%", height: "500px" }}
        >
          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
        <div className="w-screen overflow-x-auto bg-white mt-5">
          <Testimonial /> {/* Add the Testimonial section here */}
        </div>
        <Fotter /> {/* Add the Testimonial section here */}
      </div>
    </div>
  );
};

export default UserDashboard;
