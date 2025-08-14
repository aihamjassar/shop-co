import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { NavItem } from "./../common/NavItem";

export const SidebarMenu = ({ dispatch, sideMenuClass }) => {
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });

  return (
    <div
      className={`absolute top-0 left-0 lg:static z-50 lg:z-0 w-3xs lg:w-fit h-screen lg:h-fit px-3 lg:px-0 transition-transform lg:translate-none duration-300 ${sideMenuClass} bg-black lg:bg-white`}
    >
      <div className="flex justify-between items-center py-12 lg:hidden text-white">
        <h1
          className="text-2xl font-extrabold -tracking-wider mb-0.5"
          onClick={closeSidebar}
        >
          <Link to={"/"}>SHOP.CO</Link>
        </h1>
        <X
          aria-label="Side Menu"
          className="cursor-pointer transition-colors duration-300 rounded-md hover:bg-gray-600"
          onClick={closeSidebar}
        />
      </div>

      <nav className="flex flex-col lg:flex-row gap-3 text-white lg:text-black">
        <select
          name="shop"
          id="shop"
          className="bg-black lg:bg-white w-fit cursor-pointer"
        >
          <option value="shop">Shop</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="shoes">Shoes</option>
        </select>

        <ul className="flex flex-col lg:flex-row gap-3 text-white lg:text-black">
          <li>
            <NavItem to={"/products/on_sale"} closeSidebar={closeSidebar}>
              On Sale
            </NavItem>
          </li>
          <li>
            <NavItem to={"/products/new_arrivals"} closeSidebar={closeSidebar}>
              New Arrivals
            </NavItem>
          </li>
          <li>
            <NavItem to={"/products/brands"} closeSidebar={closeSidebar}>
              Brands
            </NavItem>
          </li>
        </ul>
      </nav>
    </div>
  );
};
