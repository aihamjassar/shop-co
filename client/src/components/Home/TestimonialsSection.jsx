import { Slider } from "../common/Slider";
import { TestimonialSlide } from "../common/TestimonialSlide";

const testimonials = [
  {
    _id: 10,
    name: "username1",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
    active: true,
  },
  {
    _id: 29,
    name: "username2",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
    active: true,
  },
  {
    _id: 39,
    name: "username3",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
    active: true,
  },
  {
    _id: 48,
    name: "username4",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
    active: true,
  },
  {
    _id: 50,
    name: "username5",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
    active: true,
  },
  {
    _id: 1,
    name: "username1",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
    active: true,
  },
  {
    _id: 2,
    name: "username2",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
    active: true,
  },
  {
    _id: 3,
    name: "username3",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
    active: true,
  },
  {
    _id: 4,
    name: "username4",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
    active: true,
  },
  {
    _id: 5,
    name: "username5",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
    active: true,
  },
];

export const TestimonialsSection = () => {
  return (
    <div className="container mx-auto px-5 md:px-8 py-15">
      <div className="relative">
        <h2 className="text-3xl font-extrabold -tracking-wider mb-10 uppercase">
          our happy customers
        </h2>
        <Slider>
          {testimonials.map((testimonial) => (
            <TestimonialSlide key={testimonial._id} testimonial={testimonial} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
