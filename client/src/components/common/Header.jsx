import { Menu, Search, ShoppingCartIcon, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarMenu } from "./../common/SidebarMenu";
import { motion } from "framer-motion";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const sideMenuClass = isSidebarOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <header
      className="relative w-full h-18 z-30 flex items-center bg-white"
      role="banner"
      aria-label="Main Navigation"
    >
      {isSidebarOpen && (
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-black/30 backdrop-blur-sm backdrop-saturate-50 backdrop-brightness-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="container mx-auto px-5 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <Menu
            className="cursor-pointer transition-colors duration-300 rounded-md hover:bg-gray-300 md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          />
          <h1 className="text-2xl font-extrabold -tracking-wider mb-0.5">
            <Link to={"/"}>SHOP.CO</Link>
          </h1>
        </div>

        <SidebarMenu
          setIsSidebarOpen={setIsSidebarOpen}
          sideMenuClass={sideMenuClass}
        />

        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center gap-1.5  p-1 sm:py-1.5 sm:px-2.5 bg-white sm:bg-gray-100  rounded-2xl hover:bg-gray-200"
            onClick={() => setIsSearchbarOpen(true)}
          >
            <Search
              aria-label="Search bar"
              className="cursor-pointer sm:cursor-auto"
            />
            <input
              type="text"
              id="search"
              name="search"
              className={`outline-none hidden sm:block xl:w-2xl`}
              placeholder="Search for products..."
            />
          </div>
          <Link to={"/cart"}>
            <ShoppingCartIcon
              className="cursor-pointer transition-colors duration-300 rounded-md hover:bg-gray-200"
              aria-label="Shopping Cart"
            />
          </Link>
          <Link to={"/profile"}>
            {" "}
            <UserCircle
              className="cursor-pointer transition-colors duration-300 rounded-md hover:bg-gray-200"
              aria-label="User Profile"
            />
          </Link>
        </div>
        {isSearchbarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute top-0 left-0 w-full sm:hidden p-5 transition-all duration-300"
          >
            <div className="container flex items-center gap-1.5 py-1.5 px-2.5 bg-gray-100 rounded-2xl hover:bg-gray-200">
              <Search aria-label="Search bar" />
              <input
                type="text"
                id="search"
                name="search"
                className={`outline-none w-full`}
                placeholder="Search for products..."
              />
              <X
                className="absolute top-50% right-8 cursor-pointer"
                onClick={() => setIsSearchbarOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};
