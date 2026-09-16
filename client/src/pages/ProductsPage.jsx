import { useState } from "react";
import { Filter } from "../components/Filter";
import { ProductsList } from "../components/ProductsList";
import { Link } from "react-router-dom";

export const ProductsPage = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  return (
    <main className="container mx-auto px-5 py-5 md:px-8">
      {filterIsOpen && (
        <div
          className="w-full h-full absolute inset-0 z-10 bg-black/50"
          onClick={() => setFilterIsOpen(false)}
        />
      )}
      <div className="text-black/60">
        <Link
          to={"/"}
          className="transition-colors duration-300 hover:text-blue-700"
        >
          Home
        </Link>{" "}
        &gt;{" "}
        <Link
          to={"/products"}
          className="transition-colors duration-300 hover:text-blue-700"
        >
          Products
        </Link>
      </div>
      <div className="flex gap-8 pt-10">
        <div
          className={`${
            filterIsOpen ? "translate-x-0" : "-translate-x-[600px]"
          } fixed lg:static lg:translate-none top-[72px] left-0 z-20 bg-white w-full max-w-2xs h-[calc(100dvh-72px)] lg:h-fit overflow-hidden overflow-y-auto transition-transform duration-300`}
        >
          <Filter setFilterIsOpen={setFilterIsOpen} />
        </div>
        <div className="flex-auto">
          <ProductsList setFilterIsOpen={setFilterIsOpen} />
        </div>
      </div>
    </main>
  );
};
