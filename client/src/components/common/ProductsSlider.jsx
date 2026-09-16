import { ProductSlide } from "./ProductSlide";
import { Link } from "react-router-dom";
import { Slider } from "./Slider";

export const ProductsSlider = ({ products, title, sortBy }) => {
  return (
    <div className="container mx-auto px-5 md:px-8 py-15">
      <div className={"relative"}>
        <h2 className="text-3xl font-extrabold -tracking-wider text-center mb-10 uppercase">
          {title}
        </h2>
        <div className={"lg:flex justify-center"}>
          <Slider btnClass={"lg:group-hover:hidden"}>
            <div className="grid [grid-template-columns:repeat(4,minmax(192px,208px))] gap-5">
              {products.map((product) => (
                <ProductSlide key={product._id} product={product} />
              ))}
            </div>
          </Slider>
        </div>

        <Link
          to={`/shop?sortBy=${sortBy || ''}`}
          className="w-56 h-10 block mx-auto text-center leading-9 rounded-2xl font-bold border hover:bg-black hover:text-white transition-colors mt-10"
        >
          View All
        </Link>
      </div>
    </div>
  );
};
