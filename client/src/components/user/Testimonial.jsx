import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Jenny Wilson",
    position: "Project Manager at Microsoft",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Robert Fox",
    position: "Founder at Brain.co",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/men/20.jpg", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Kristin Watson",
    position: "UX Designer at Google",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg", // Replace with actual image URL
  },
  {
    id: 4,
    name: "John Doe",
    position: "CEO at SomeCompany",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/men/30.jpg", // Replace with actual image URL
  },
  {
    id: 4,
    name: "John Doe",
    position: "CEO at SomeCompany",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/men/30.jpg", // Replace with actual image URL
  },
  {
    id: 4,
    name: "John Doe",
    position: "CEO at SomeCompany",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/men/30.jpg", // Replace with actual image URL
  },
  {
    id: 4,
    name: "John Doe",
    position: "CEO at SomeCompany",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/men/30.jpg", // Replace with actual image URL
  },
  // Add more testimonials as needed
];

const Testimonial = () => {
  return (
    <div className="my-12">
      <h2 className="text-center text-3xl font-semibold mb-6">
        Trusted by 30k+ world-class companies & design teams
      </h2>
      {/* Container for Horizontal Scroll */}
      <div className="overflow-x-auto mt-6 max-w-full px-2">
        <div className="flex space-x-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-none w-80 border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-lg">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">
                {testimonial.testimonial}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
