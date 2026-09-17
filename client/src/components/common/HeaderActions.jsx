import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Search, ShoppingCartIcon, User, UserCircle, LogOut } from "lucide-react";
import { logout } from "../../store/thunks/authThunk";


export const HeaderActions = ({ dispatch: modalDispatch }) => {
  const { isAuthenticate } = useSelector((state) => state.auth);
    const reduxDispatch = useDispatch();
    const { status } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center gap-5">
      <Link
        to={'/cart'}
        className="relative"
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
        <button
          className="flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer"
          disabled={status.logout === "loading"}
          onClick={() => reduxDispatch(logout())}
        >
          {status.logout === "loading" ? (
            "Logging out..."
          ) : (
            <>
              <LogOut size={20} /> <span className="">Log out</span>
            </>
          )}
        </button>
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
