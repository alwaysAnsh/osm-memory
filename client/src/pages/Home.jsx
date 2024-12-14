import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/user/Navbar";
import Testimonial from "../components/user/Testimonial";
import Footer from "../components/user/Fotter";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper"; // Import Autoplay

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
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpB6EWX8TtodvQpMH3kT5F_TkuvaHGnHkfpg&s";
const slide_image_7 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbKANlgOIgLL0CzHy0KNQIgLY7dnmJHIRFAw&s";

const Home = () => {
  const { user } = useSelector((state) => state.user); // Get user state from Redux

  return (
    <div className="bg-offWhite flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow px-4 flex flex-col justify-center items-center bg-offWhite mt-8">
        {/* Swiper Slider */}
        <div className="relative w-full flex justify-center mt-6">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={false} // Do not center each image, show multiple
            loop={true}
            spaceBetween={0} // Set this to 0 for no space between images
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1.5,
            }}
            autoplay={{
              delay: 1000, // 3 seconds before switching to the next image
              disableOnInteraction: false, // Prevent autoplay from being disabled after interaction
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            breakpoints={{
              // When the screen size is less than 640px (mobile)
              10: {
                slidesPerView: 1, // Only show one slide
                spaceBetween: 0,
                width: "100%", // Full width for smaller screens
                height: "auto", // Ensure image adjusts to the height based on width
              },
              640: {
                slidesPerView: 1, // Only show one slide
                spaceBetween: 0,
                width: "100%", // Full width for smaller screens
                height: "auto", // Ensure image adjusts to the height based on width
              },
              // When the screen size is 640px or above (tablet)
              768: {
                slidesPerView: 2, // Show two images at a time
                spaceBetween: 10, // Optional: add space between the images
              },
              // For larger screens
              1024: {
                slidesPerView: 3, // Show three images at a time
                spaceBetween: 20, // Optional: add space between the images
              },
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // Include Autoplay module
            className="swiper_container"
          >
            <SwiperSlide>
              <div className="relative w-full h-64">
                <img
                  src={slide_image_1}
                  alt="slide_image_1"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-64">
                <img
                  src={slide_image_2}
                  alt="slide_image_2"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-64">
                <img
                  src={slide_image_3}
                  alt="slide_image_3"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-64">
                <img
                  src={slide_image_4}
                  alt="slide_image_4"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-64">
                <img
                  src={slide_image_5}
                  alt="slide_image_5"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-64">
                <img
                  src={slide_image_6}
                  alt="slide_image_6"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-64">
                <img
                  src={slide_image_7}
                  alt="slide_image_7"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>

            {/* Slider controls */}
            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>

        <div className="w-screen overflow-x-auto bg-offWhite mt-5">
          <Testimonial />
        </div>
      </div>
      <Footer /> {/* Footer aligned at the bottom */}
    </div>
  );
};

export default Home;
