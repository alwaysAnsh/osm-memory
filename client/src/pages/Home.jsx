import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../components/user/Navbar";
import Testimonial from "../components/user/Testimonial";
import Footer from "../components/user/Fotter";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFile } from "react-icons/fa";

import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper"; // Import Autoplay
import CategoryCard from "../components/user/CategoryCard";
import ExploreMore from "../components/common/ExploreMore";

// Image URLs from Pexels
const slide_image_1 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwljsj5RMUitDWYHy_z5VEr9b7tK1AViLnLw&s";
const slide_image_2 =
  "https://i.ytimg.com/vi/afThJNpscZA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDDtKBsf-AEs-h0bzzuICsn9iCOQQ";
const slide_image_3 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUPYXHNyD2o3cf6WJCCD0KgBNhOYmJ6zRGA&s";
const slide_image_4 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKIf4RAZas2SQGHWfXyzw-LQJPgQsVK9M0Lw&s";
const slide_image_5 =
  "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc2MjcyOTk1NDk1NDUzODY5/memory-technique-remembering-a-random-list-of-20-items.jpg";
const slide_image_6 =
  "https://media.istockphoto.com/id/1349161222/vector/declutter-your-mind-clear-your-brain-to-regain-focus-improve-creative-thinking-ability-free.jpg?s=612x612&w=0&k=20&c=mL3JyJ_FLhY9UBo7gUZfySs-jTtOVOVunaJfFijxldg=";
const slide_image_7 =
  "https://images.unsplash.com/photo-1720774102378-270d8296092b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbW9yaWVzfGVufDB8fDB8fHww";

const Home = () => {
  const { user } = useSelector((state) => state.user); // Get user state from Redux
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/get-all-categories`
      );
      const categoriesData = response.data.categories;
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-offWhite flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-grow px-4 flex flex-col justify-center items-center bg-offWhite mt-2">
        {/* Swiper Slider */}
        <div className="relative w-screen flex justify-center mt-0 " onContextMenu={(e) => e.preventDefault()}>
          <Swiper
           
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={false} // Do not center each image, show multiple
            loop={true}
            slidesPerView={1}
            spaceBetween={0} // Set this to 0 for no space between images
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1.5,
            }}
            autoplay={{
              delay: 3000, // 3 seconds before switching to the next image
              disableOnInteraction: false, // Prevent autoplay from being disabled after interaction
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // Include Autoplay module
            className="swiper_container"
          >
            <SwiperSlide>
              <div className="relative w-screen sm:h-64 lg:h-[390px]">
                <img
                  src={slide_image_1}
                  alt="slide_image_1"
                  className="rounded-lg shadow-lg w-screen h-full object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-screen sm:h-64 lg:h-[390px]">
                <img
                  src={slide_image_2}
                  alt="slide_image_2"
                  className="rounded-lg shadow-lg w-screen h-full object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-screen sm:h-64 lg:h-[390px]">
                <img
                  src={slide_image_3}
                  alt="slide_image_3"
                  className="rounded-lg shadow-lg w-screen h-full object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-screen sm:h-64 lg:h-[390px]">
                <img
                  src={slide_image_4}
                  alt="slide_image_4"
                  className="rounded-lg shadow-lg w-screen h-full object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-screen sm:h-64 lg:h-[390px]">
                <img
                  src={slide_image_5}
                  alt="slide_image_5"
                  className="rounded-lg shadow-lg w-screen h-full object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-screen sm:h-64 lg:h-[390px]">
                <img
                  src={slide_image_6}
                  alt="slide_image_6"
                  className="rounded-lg shadow-lg w-screen h-full object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-screen sm:h-64 lg:h-[390px]">
                <img
                  src={slide_image_7}
                  alt="slide_image_7"
                  className="rounded-lg shadow-lg w-screen h-full object-cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* categories section */}
        <h2 className="text-left text-3xl mb-3 mt-3 underline decoration-primaryRed underline-offset-4 ">
          Explore the categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {categories.slice(0, 4).map((category) => (
            <div
              key={category.name}
              className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow shadow-pink-200"
            >
              <h2 className="text-lg font-semibold mb-4">{category.name}</h2>

              {/* Horizontal Scrollable Container for Subcategories */}
              <div className="flex flex-row space-x-4 overflow-x-auto py-2 scrollbar-hidden">
                {category.subcategories.map((subcat, index) => (
                  <div
                    key={`${subcat.name}-${index}`}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Wrap subcategory in Link to make it clickable */}
                    <Link
                      to={
                        user
                          ? `/user-dashboard/${user._id}/${category.name}/${subcat.name}`
                          : "/auth-L"
                      } // Corrected path
                      className="flex flex-col items-center text-center cursor-pointer"
                    >
                      {/* Render Uploaded Image as Icon */}
                      <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-2 shadow-md shadow-green-100 transition-shadow hover:shadow-lg hover:shadow-green-100  hover:animate-bounce">
                        {subcat.icon ? (
                          <img
                            src={subcat.icon} // Image URL
                            alt={subcat.name}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        ) : (
                          <FaFile
                            style={{ color: "#FF5733", fontSize: "20px" }}
                          />
                        )}
                      </div>
                      <h3 className="text-sm font-medium truncate">
                        {subcat.name}
                      </h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Link to={
                        user
                          ? `/user-dashboard/${user._id}`
                          : "/auth-L"
                      }  className="mt-8">
          <ExploreMore />
        </Link>

        <div className="w-screen overflow-x-auto bg-offWhite mt-5">
          <Testimonial />
        </div>
      </div>
      <Footer /> {/* Footer aligned at the bottom */}
    </div>
  );
};

export default Home;
