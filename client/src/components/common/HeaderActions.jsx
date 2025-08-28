import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import {
  Search,
  ShoppingCartIcon,
  User,
  UserCircle,
} from "lucide-react";

export const HeaderActions = ({ dispatch: modalDispatch }) => {
  const { user, isAuthenticate } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-2.5  p-1 sm:py-1.5 sm:px-2.5 bg-white sm:bg-gray-100 rounded-2xl hover:bg-gray-200">
        <Search
          aria-label="Search bar"
          className="cursor-pointer sm:cursor-auto"
          onClick={() => modalDispatch({ type: "OPEN_SEARCHBAR" })}
        />
        <input
          type="text"
          id="search"
          name="search"
          className={`outline-none hidden sm:block sm:w-40 xl:w-80`}
          placeholder="Search for products..."
        />
      </div>
      <Link
        to={isAuthenticate ? `/cart/${user?._id}` : "#"}
        className="relative"
        onClick={() => {
          !isAuthenticate && modalDispatch({ type: "OPEN_SIGNIN_MODAL" });
        }}
      >
        <ShoppingCartIcon
          className="cursor-pointer transition-colors duration-300 rounded-md hover:bg-gray-200"
          aria-label="Shopping Cart"
        />
        <span className="absolute -top-3 -left-2 size-5 rounded-full bg-red-600 text-white text-center text-sm -leading-0">
          1
        </span>
      </Link>
      {isAuthenticate ? (
        user.role === "admin" ? (
          <Link
            to={"/dashboard"}
            className="flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to={"/profile"}
            className="flex justify-center items-center w-fit hover:bg-gray-200 rounded-full cursor-pointer"
          >
            <UserCircle size={35} />
          </Link>
        )
      ) : (
        <button
          className="flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer"
          onClick={() => modalDispatch({ type: "OPEN_SIGNIN_MODAL" })}
        >
          <User /> Sign in
        </button>
      )}
    </div>
  );
};
