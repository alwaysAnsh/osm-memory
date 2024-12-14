import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/user/Navbar";
import CategoryCard from "../components/user/CategoryCard";
import Testimonial from "../components/user/Testimonial";
import Footer from "../components/user/Fotter";

const Home = () => {
  const { user } = useSelector((state) => state.user); // Get user state from Redux
  const [categories, setCategories] = useState([]); // Store categories data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch categories when the page loads, only if the user is logged in
  useEffect(() => {
    if (user) {
      const fetchCategories = async () => {
        console.log("Making API request...");
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v2/get-all-categories`
          );
          console.log("API response received:", response.data); // Log response
          const categoriesData = response.data.categories || [];
          setCategories(categoriesData); // Set data if valid
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setLoading(false); // Stop loading when data is fetched
        }
      };
      fetchCategories();
    } else {
      setLoading(false); // Stop loading if user is not logged in
    }
  }, [user]);

  return (
    <div
      className="bg-offWhite flex flex-col min-h-screen" // Flex container and full-height screen
    >
      <Navbar />
      <div className="flex-grow px-4 flex flex-col justify-center items-center bg-offWhite mt-8">
        <h1 className="text-xl font-bold my-4">
          Welcome to Osm-Memory{user ? `, ${user.firstName}` : ""}! 😊
        </h1>

        {/* Loading state */}
        {loading ? (
          <div>Loading...</div> // Or display a spinner component here
        ) : (
          <>
            {/* Show categories only if the user is logged in */}
            {user ? (
              <div
                className="overflow-y-auto mt-6 p-3 rounded-lg"
                style={{ width: "100%", height: "500px" }}
              >
                {/* Check if categories exist */}
                {categories && categories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                      <CategoryCard
                        key={`${category._id || index}`} // Unique key fallback for categories
                        category={category}
                      />
                    ))}
                  </div>
                ) : (
                  <p>No categories found</p>
                )}
              </div>
            ) : (
              <p>Please log in to view categories.</p>
            )}
          </>
        )}

        <div className="w-screen overflow-x-auto bg-offWhite mt-5">
          <Testimonial />
        </div>
      </div>
      <Footer /> {/* Footer aligned at the bottom */}
    </div>
  );
};

export default Home;
