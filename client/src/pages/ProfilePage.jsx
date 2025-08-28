import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/thunks/authThunk";

export const ProfilePage = () => {
  const reduxDispatch = useDispatch();
    const { status } = useSelector((state) => state.auth);
    
  return (
    <div>
      <button
        className="flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer"
        disabled={status.logout === "loading"}
        onClick={() => reduxDispatch(logout())}
      >
        {status.logout === "loading" ? (
          "Logging out..."
        ) : (
          <>
            <LogOut size={20} /> Log out
          </>
        )}
      </button>
    </div>
  );
};
