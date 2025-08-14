import { ArrowLeft, ArrowRight, Ellipsis, Filter } from "lucide-react";
import { ProductSlide } from "../components/common/ProductSlide";
import { productsList } from "../data/products";
import { useState } from "react";

const products = productsList;

export const ProductsList = ({ setFilterIsOpen }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = 20;

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{"Casual"}</h2>
        <button
          className="w-fit p-1 rounded-md bg-black/5 hover:bg-black/15 cursor-pointer lg:hidden"
          onClick={() => setFilterIsOpen((preState) => !preState)}
        >
          <Filter />
        </button>
      </div>
      <div className="grid [grid-template-columns:repeat(auto-fill,minmax(208px,1fr))] gap-x-5 gap-y-8 py-5">
        {products.map((product) => (
          <ProductSlide key={product._id} product={product} />
        ))}
      </div>
      <div className="w-full h-[1px] bg-black/15 my-10" />
      <div className="flex items-center">
        <button
          className="flex justify-center items-center gap-1.5 w-fit p-2 border border-black/10 shadow-md rounded-md cursor-pointer hover:bg-black hover:text-white transition-colors mr-auto"
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <ArrowLeft size={20} /> Previous
        </button>
        <div className="w-fit grid grid-cols-5 sm:grid-cols-7 mx-auto">
          <button className="size-7 p-1 rounded-md border border-black/10 bg-black text-white">
            {pageNumber}
          </button>
          <button className="size-7 p-1 rounded-md border border-black/10">
            {pageNumber + 1}
          </button>
          <button className="hidden md:block size-7 p-1 rounded-md border border-black/10">
            {pageNumber + 2}
          </button>
          <button className="size-7 p-1 rounded-md border border-black/10">
            ...
          </button>
          <button className="size-7 p-1 rounded-md border border-black/10">
            {pageNumber + 7}
          </button>
          <button className="hidden md:block size-7 p-1 rounded-md border border-black/10">
            {pageNumber + 8}
          </button>
          <button className="size-7 p-1 rounded-md border border-black/10">
            {pageNumber + 9}
          </button>
        </div>
        <button
          className="flex justify-center items-center gap-1.5 w-fit p-2 border border-black/10 shadow-md rounded-md cursor-pointer hover:bg-black hover:text-white transition-colors ml-auto"
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
