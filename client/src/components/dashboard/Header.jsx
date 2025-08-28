import { Bell, Search, UserCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <header className="h-20 py-5">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            className="w-2xl h-10 bg-gray-100 rounded-4xl pl-9 focus:outline-none focus:bg-gray-200"
            placeholder="Search fro anything..."
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-1.5" />
        </div>
        <div className="flex items-center gap-5 w-52">
          <Link>
            <Bell />
          </Link>

          <div className="flex items-center gap-2.5">
            <UserCircle size={30} />
            <div>
              <div>{user.username}</div>
              <div>{user.role}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
