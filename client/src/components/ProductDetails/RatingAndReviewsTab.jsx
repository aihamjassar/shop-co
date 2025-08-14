import { CheckCircle2, Ellipsis, Settings2 } from "lucide-react";
import Select from "react-select";
import { Stars } from "../common/Stars";
import { useState } from "react";
import { motion } from "framer-motion";

export const RatingAndReviewsTab = () => {
  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "10rem",
      padding: "0.2rem 0.5rem",
      borderColor: "#F2F2F2",
      backgroundColor: "#F2F2F2",
      boxShadow: "none",
      width: "8rem",
      "&:hover": {
        borderColor: "#999",
      },
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "#f3f4f6" : "white",
      color: "black",
      padding: "10px 15px",
      cursor: "pointer",
    }),
  };
  const options = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
  ];

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

  const [selectSort, setSelectedSort] = useState(options[0]);

  return (
    <div className="space-y-10 py-5">
      <div className="flex justify-between items-center">
        <h2 className="sm:text-2xl font-bold">
          All Reviews <span className="text-[14px] text-black/60">(342)</span>
        </h2>
        <div className="flex items-center gap-2.5">
          <button className="flex justify-center items-center size-10 rounded-full bg-black/5 cursor-pointer">
            <Settings2 />
          </button>
          <div className="w-fit hidden sm:block">
            <Select
              options={options}
              styles={customStyles}
              isSearchable={false}
              value={selectSort}
              onChange={setSelectedSort}
            />
          </div>

          <button className="w-fit h-11 px-2.5 rounded-4xl bg-black hover:bg-black/80 text-white cursor-pointer">
            Write Review
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {testimonials.map(({ rating, name, text, active }, idx) => (
          <div
            className="w-full bg-white border border-black/20 shadow-md rounded-2xl p-5 space-y-2 snap-start"
            key={idx}
          >
            <div className="flex justify-between items-center">
              <Stars rating={rating} />
              <button className="cursor-pointer">
                <Ellipsis />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-[20px] font-bold">{name}</h3>
              {active && <CheckCircle2 className="text-white fill-green-600" />}
            </div>
            <p className="italic text-[16px] text-black/60 leading-6 max-w-lg">
              "{text}"
            </p>
            <div className="text-[14px] text-black/60 mt-5">
              Posted on {"April 18, 2023"}
            </div>
          </div>
        ))}
      </motion.div>
      <button className="w-64 border border-black/50 p-1.5 rounded-4xl block mx-auto hover:bg-black hover:text-white cursor-pointer">
        Load More Reviews
      </button>
    </div>
  );
};
