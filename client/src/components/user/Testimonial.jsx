import React from "react";
import styled, { keyframes } from "styled-components"; // Import styled-components and keyframes

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
    id: 5,
    name: "John Doe",
    position: "CEO at SomeCompany",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/men/30.jpg", // Replace with actual image URL
  },
  {
    id: 6,
    name: "John Doe",
    position: "CEO at SomeCompany",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/men/30.jpg", // Replace with actual image URL
  },
  {
    id: 7,
    name: "John Doe",
    position: "CEO at SomeCompany",
    testimonial:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    imageUrl: "https://randomuser.me/api/portraits/men/30.jpg", // Replace with actual image URL
  },
];

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(-200%);
  }
`;

// Styled-components
const TestimonialsWrapper = styled.div`
  margin: 3rem 0;
  font-family: "Arial", sans-serif;
`;

const TestimonialHeading = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
`;

const ScrollContainer = styled.div`
  overflow: hidden;
  margin-top: 1.5rem;
  padding: 0 0.5rem;
`;

const TestimonialsContainer = styled.div`
  display: flex;
  justify-content: start;
  width: fit-content;
  animation: ${slide} 100s linear infinite;
`;

const TestimonialCard = styled.div`
  flex: none;
  width: 20rem;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: box-shadow 0.2s ease-in-out;
  margin-right: 1rem;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const UserDetails = styled.div``;

const TestimonialText = styled.p`
  color: #4b4b4b;
  font-size: 1rem;
  font-style: italic;
`;

const Testimonial = () => {
  return (
    <TestimonialsWrapper>
      <TestimonialHeading>
        Trusted by 30k+ world-class companies & design teams
      </TestimonialHeading>

      <ScrollContainer>
        <TestimonialsContainer>
          {/* Duplicated testimonials for loop effect */}
          {testimonials.concat(testimonials).map((testimonial) => (
            <TestimonialCard key={testimonial.id}>
              <UserInfo>
                <UserImage src={testimonial.imageUrl} alt={testimonial.name} />
                <UserDetails>
                  <p style={{ fontWeight: "500", fontSize: "1rem" }}>
                    {testimonial.name}
                  </p>
                  <p style={{ color: "#6b6b6b" }}>{testimonial.position}</p>
                </UserDetails>
              </UserInfo>

              <TestimonialText>{testimonial.testimonial}</TestimonialText>
            </TestimonialCard>
          ))}
        </TestimonialsContainer>
      </ScrollContainer>
    </TestimonialsWrapper>
  );
};

export default Testimonial;
