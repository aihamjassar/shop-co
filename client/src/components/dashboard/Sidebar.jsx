import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/thunks/authThunk";
import {
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  SidebarClose,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
const links = [
  { to: "/dashboard/overview", icon: <LayoutDashboard />, label: "Overview" },
  { to: "/dashboard/account", icon: <User />, label: "Account" },
  { to: "/dashboard/users", icon: <Users />, label: "Users" },
  { to: "/dashboard/products", icon: <Package />, label: "Products" },
  { to: "/dashboard/orders", icon: <ShoppingBag />, label: "Orders" },
];
export const Sidebar = () => {
  const reduxDispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside
      className={`${isSidebarOpen ? "w-64" : "w-fit"} bg-white shadow-md p-4`}
    >
      <div className="flex justify-between items-center mb-6">
        {isSidebarOpen && (
          <h1 className="text-3xl font-extrabold -tracking-wider">
            <Link to={"/"}>SHOP.CO</Link>
          </h1>
        )}
        <button
          className="size-fit rounded-lg hover:bg-gray-200  p-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <SidebarClose />
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          {links.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg hover:bg-black hover:text-white ${
                    isActive ? "bg-black text-white" : "bg-white text-black"
                  }`
                }
              >
                {link.icon}
                {isSidebarOpen && link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {isSidebarOpen ? (
        <button
          className="absolute bottom-5 left-5 flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer"
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
      ) : (
        <button
          className="absolute bottom-5 left-5 rounded-lg p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => reduxDispatch(logout())}
        >
          <LogOut />
        </button>
      )}
    </aside>
  );
};
