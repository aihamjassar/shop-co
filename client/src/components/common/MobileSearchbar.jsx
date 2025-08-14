import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

export const MobileSearchbar = ({ dispatch }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1 }}
      className="absolute top-0 left-0 w-full sm:hidden p-5 transition-all duration-300 bg-white"
    >
      <div className="container flex items-center gap-1.5 py-1.5 px-2.5 bg-gray-100 rounded-2xl shadow-2xl  hover:bg-gray-200">
        <Search aria-label="Search bar" />
        <input
          type="text"
          id="search"
          name="search"
          className={`outline-none w-full`}
          placeholder="Search for products..."
        />
        <X
          className="absolute right-8 cursor-pointer"
          onClick={() => dispatch({ type: "CLOSE_SEARCHBAR" })}
        />
      </div>
    </motion.div>
  );
};
