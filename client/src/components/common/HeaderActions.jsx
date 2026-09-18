import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartIcon, User, LogOut } from "lucide-react";
import { logout } from "../../store/thunks/authThunk";
import { clearCartState } from "../../store/slices/cartSlice";

export const HeaderActions = ({ dispatch: modalDispatch }) => {
  const reduxDispatch = useDispatch();
  const { isAuthenticate, status } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.cart);
  const itemCount = isAuthenticate
    ? (cart?.cartItems || []).reduce((total, item) => total + item.quantity, 0)
    : 0;

  const handleLogout = async () => {
    try {
      await reduxDispatch(logout()).unwrap();
      reduxDispatch(clearCartState());
    } catch {
      // The auth interceptor handles failed logout requests.
    }
  };

  return (
    <div className="flex items-center gap-5">
      <Link to="/cart" className="relative" aria-label="Shopping Cart">
        <ShoppingCartIcon className="cursor-pointer transition-colors duration-300 rounded-md hover:bg-gray-200" />
        {itemCount > 0 && (
          <span className="absolute -top-3 -left-2 size-5 rounded-full bg-red-600 text-white text-center text-sm leading-5">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </Link>
      {isAuthenticate ? (
        <button
          type="button"
          className="flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer disabled:opacity-50"
          disabled={status.logout === "loading"}
          onClick={handleLogout}
        >
          {status.logout === "loading" ? (
            "Logging out..."
          ) : (
            <>
              <LogOut size={20} /> <span>Log out</span>
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          className="flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer"
          onClick={() => modalDispatch({ type: "OPEN_SIGNIN_MODAL" })}
        >
          <User /> Sign in
        </button>
      )}
    </div>
  );
};
