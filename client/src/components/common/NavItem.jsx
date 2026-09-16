import { NavLink } from "react-router-dom";

export const NavItem = ({ to, closeSidebar, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-blue-700 font-bold"
          : "text-white lg:text-black transition-colors duration-300 hover:text-blue-700"
      }
      onClick={closeSidebar}
    >
      {children}
    </NavLink>
  );
};
