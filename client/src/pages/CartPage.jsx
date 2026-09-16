import { cart } from "../data/products";
import { CartItem } from "../components/CartItem";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const CartPage = () => {
  const params = useParams()
  return (
    <div className="container mx-auto px-5 md:px-8 py-5">
      <div className="text-black/60">
        <Link
          to={"/"}
          className="transition-colors duration-300 hover:text-blue-700"
        >
          Home
        </Link>{" "}
        &gt;{" "}
        <Link
          to={"/cart/" + params.id}
          className="transition-colors duration-300 hover:text-blue-700"
        >
          Cart
        </Link>
      </div>
      <h2 className="text-4xl font-extrabold uppercase -tracking-wider my-8">
        your cart
      </h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-2/3 border border-black/20 rounded-2xl p-4">
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
        <div className="flex-1/3 h-fit border border-black/20 rounded-2xl p-4">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="space-y-5 my-5 border-b border-black/20 pb-5">
            <div className="flex justify-between items-center">
              <h3 className="text-[16px] sm:text-xl  text-black/60">
                Subtotal
              </h3>
              <span className="text-[16px] sm:text-xl font-bold">$120</span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-[16px] sm:text-xl  text-black/60">
                Discount (-20%)
              </h3>
              <span className="text-[16px] sm:text-xl text-red-600 font-bold">
                -$20
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-[16px] sm:text-xl  text-black/60">
                Delivery fee
              </h3>
              <span className="text-[16px] sm:text-xl font-bold">$50</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] sm:text-xl font-semibold">Total</h3>
            <span className="text-xl sm:text-2xl  font-bold">$200</span>
          </div>
          <form className="mt-7 mb-3 space-y-3">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full h-11 pl-10 rounded-2xl bg-gray-100 focus:outline-none"
                placeholder="Add promo code"
              />
            </div>
            <button className="w-full h-11 bg-black text-white rounded-2xl cursor-pointer">
              Apply
            </button>
          </form>
          <button className="flex justify-center items-center gap-3 w-full h-11 mx-auto bg-black text-white rounded-2xl cursor-pointer">
            Go to checkout <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
