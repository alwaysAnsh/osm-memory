import React from "react";
import styled, { keyframes } from "styled-components";

const testimonials = [
  {
    id: 1,
    name: "Jenny Wilson",
    position: "Project Manager at Microsoft",
    testimonial:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat nostrud amet.",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Robert Fox",
    position: "Founder at Brain.co",
    testimonial:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat nostrud amet.",
    imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    id: 3,
    name: "Kristin Watson",
    position: "UX Designer at Google",
    testimonial:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat nostrud amet.",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 4,
    name: "John Doe",
    position: "CEO at SomeCompany",
    testimonial:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat nostrud amet.",
    imageUrl: "https://randomuser.me/api/portraits/men/30.jpg",
  },
];

const slide = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const TestimonialsWrapper = styled.div`
  margin: 3rem 0;
  font-family: "Arial", sans-serif;
  overflow: hidden;
`;

const TestimonialHeading = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ScrollContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  position: relative;
`;

const TestimonialsContainer = styled.div`
  display: inline-flex;
  animation: ${slide} 20s linear infinite;
  width: calc(200%);
`;

const TestimonialCard = styled.div`
  flex: none;
  width: 20rem;
  margin-right: 1.5rem;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 18rem;
  }

  @media (max-width: 480px) {
    width: 15rem;
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

  @media (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const UserDetails = styled.div``;

const UserName = styled.p`
  font-weight: 500;
  font-size: 1rem;
  color: #333;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const UserPosition = styled.p`
  color: #6b6b6b;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const TestimonialText = styled.p`
  color: #4b4b4b;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.5;
  max-height: 6rem;
  overflow: hidden;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Testimonial = () => {
  return (
    <TestimonialsWrapper>
      <TestimonialHeading>
        Trusted by 30k+ world-class companies & design teams
      </TestimonialHeading>

      <ScrollContainer>
        <TestimonialsContainer>
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <TestimonialCard key={index}>
              <UserInfo>
                <UserImage src={testimonial.imageUrl} alt={testimonial.name} />
                <UserDetails>
                  <UserName>{testimonial.name}</UserName>
                  <UserPosition>{testimonial.position}</UserPosition>
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
