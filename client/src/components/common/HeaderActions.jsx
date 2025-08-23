import { Link } from "react-router-dom";
import { LogOut, Search, ShoppingCartIcon, User } from "lucide-react";
import { useSelector } from "react-redux";

export const HeaderActions = ({ dispatch }) => {
  const { user, isAuthenticate } = useSelector(state => state.auth);

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="flex items-center gap-2.5  p-1 sm:py-1.5 sm:px-2.5 bg-white sm:bg-gray-100 rounded-2xl hover:bg-gray-200"
        onClick={() => dispatch({ type: "OPEN_SEARCHBAR" })}
      >
        <Search
          aria-label="Search bar"
          className="cursor-pointer sm:cursor-auto"
        />
        <input
          type="text"
          id="search"
          name="search"
          className={`outline-none hidden sm:block sm:w-40 xl:w-80`}
          placeholder="Search for products..."
        />
      </div>
      <Link to={`/cart/${user?._id}`} className="relative">
        <ShoppingCartIcon
          className="cursor-pointer transition-colors duration-300 rounded-md hover:bg-gray-200"
          aria-label="Shopping Cart"
        />
        <span className="absolute -top-3 -left-2 size-5 rounded-full bg-red-600 text-white text-center text-sm -leading-0">
          1
        </span>
      </Link>
      {isAuthenticate ? (
        <button className="flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer">
          <LogOut size={20} /> Log out
        </button>
      ) : (
        <button
          className="flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer"
          onClick={() => dispatch({ type: "OPEN_MODAL" })}
        >
          <User /> Sign in
        </button>
      )}
    </div>
  );
};
