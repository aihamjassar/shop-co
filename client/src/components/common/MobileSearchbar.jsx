import { Search, X } from "lucide-react";

export const MobileSearchbar = ({ dispatch }) => {
  return (
    <div
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
    </div>
  );
};
