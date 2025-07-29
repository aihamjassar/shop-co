import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { NavItem } from "./NavItem";

export const SidebarMenu = ({ setIsSidebarOpen, sideMenuClass }) => {
  return (
    <div
      className={`absolute top-0 left-0 md:static z-50 md:z-0 w-3xs md:w-fit h-screen md:h-fit px-3 md:px-0 transition-transform md:translate-none duration-300 ${sideMenuClass} bg-black md:bg-white`}
    >
      <div className="flex justify-between items-center py-12 md:hidden text-white">
        <h1
          className="text-2xl font-extrabold -tracking-wider mb-0.5"
          onClick={() => setIsSidebarOpen(false)}
        >
          <Link to={"/"}>SHOP.CO</Link>
        </h1>
        <X
          aria-label="Side Menu"
          className="cursor-pointer transition-colors duration-300 rounded-md hover:bg-gray-600"
          onClick={() => setIsSidebarOpen(false)}
        />
      </div>

      <nav className="flex flex-col md:flex-row gap-3 text-white md:text-black">
        <select
          name="shop"
          id="shop"
          className="bg-black md:bg-white w-fit cursor-pointer"
        >
          <option value="item1" label="Shop"></option>
          <option value="item2">Item2</option>
          <option value="item3">Item3</option>
          <option value="item4">Item4</option>
          <option value="item5">Item5</option>
        </select>

        <ul className="flex flex-col md:flex-row gap-3 text-white md:text-black">
          <li onClick={() => setIsSidebarOpen(false)}>
            <NavItem to={"/sale"}>On Sale</NavItem>
          </li>
          <li>
            <NavItem
              to={"/new_arrivals"}
              onClick={() => setIsSidebarOpen(false)}
            >
              New Arrivals
            </NavItem>
          </li>
          <li>
            <NavItem to={"/brands"} onClick={() => setIsSidebarOpen(false)}>
              Brands
            </NavItem>
          </li>
        </ul>
      </nav>
    </div>
  );
};
