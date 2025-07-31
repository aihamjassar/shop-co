import { ProductCard } from "./ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const ProductsSlider = ({ products, title }) => {
  const scrollRef = useRef(null);
  const scrollRight = () =>
    scrollRef.current.scrollBy({
      left: scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  const scrollLeft = () =>
    scrollRef.current.scrollBy({
      left: -scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  return (
    <div className="container mx-auto px-5 md:px-8 py-15 relative">
      <h2 className="text-3xl font-extrabold -tracking-wider text-center mb-10 uppercase">
        {title}
      </h2>
      <div
        className="h-96 flex lg:justify-center gap-5 overflow-x-auto scrollbar-hide"
        ref={scrollRef}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 w-fit p-2 rounded-full bg-black text-white cursor-pointer hidden sm:block lg:hidden hover:bg-gray-800 transition-colors"
        onClick={scrollLeft}
      >
        <ArrowLeft />
      </button>
      <button
        className="absolute top-1/2 right-0 w-fit p-2 rounded-full bg-black text-white cursor-pointer hidden sm:block lg:hidden hover:bg-gray-800 transition-colors"
        onClick={scrollRight}
      >
        <ArrowRight />
      </button>
      <Link
        to={"/products"}
        className="w-56 h-10 block mx-auto text-center leading-9 rounded-2xl font-bold border hover:bg-black hover:text-white transition-colors mt-10"
      >
        View All
      </Link>
    </div>
  );
};
