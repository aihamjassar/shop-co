import { ArrowRight, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartItem } from "../components/CartItem";
import {
  createCheckoutSession,
  getCart,
  validateCoupon,
} from "../store/thunks/cartThunk";
import { useUI } from "../context/useUi";

const formatPrice = (value) => `$${Number(value || 0).toFixed(2)}`;

export const CartPage = () => {
  const dispatch = useDispatch();
  const { dispatch: uiDispatch } = useUI();
  const { isAuthenticate } = useSelector((state) => state.auth);
  const { cart, status, error, coupon, couponError } = useSelector(
    (state) => state.cart,
  );
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    if (isAuthenticate) dispatch(getCart());
  }, [dispatch, isAuthenticate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const items = cart?.cartItems || [];
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount = coupon
    ? Math.round((subtotal * coupon.discountPercentage) / 100 * 100) / 100
    : 0;
  const total = subtotal - discount;
  const isBusy =
    status.fetch === "loading" ||
    status.coupon === "loading" ||
    status.checkout === "loading";

  const handleCoupon = async (event) => {
    event.preventDefault();
    const code = couponCode.trim();
    if (!code) return;

    try {
      await dispatch(validateCoupon(code)).unwrap();
      toast.success("Coupon applied");
    } catch (validationError) {
      toast.error(validationError || couponError || "Invalid coupon code");
    }
  };

  const handleCheckout = async () => {
    if (!cart?._id || !items.length) return;

    try {
      const { checkoutUrl } = await dispatch(
        createCheckoutSession({
          cartId: cart._id,
          couponCode: coupon?.code,
        }),
      ).unwrap();

      if (!checkoutUrl) {
        throw new Error("Checkout link is not available");
      }
      window.location.assign(checkoutUrl);
    } catch (checkoutError) {
      toast.error(checkoutError || "Could not start checkout");
    }
  };

  if (!isAuthenticate) {
    return (
      <div className="container mx-auto px-5 md:px-8 py-16 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-extrabold uppercase -tracking-wider">
          Sign in to view your cart
        </h2>
        <p className="mt-3 text-black/60 max-w-md">
          Your cart is connected to your account so it remains available when
          you return.
        </p>
        <button
          type="button"
          className="mt-7 px-7 h-11 bg-black text-white rounded-2xl cursor-pointer"
          onClick={() => uiDispatch({ type: "OPEN_SIGNIN_MODAL" })}
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 md:px-8 py-5">
      <div className="text-black/60">
        <Link to="/" className="transition-colors duration-300 hover:text-blue-700">
          Home
        </Link>{" "}
        &gt; <span>Cart</span>
      </div>
      <h2 className="text-4xl font-extrabold uppercase -tracking-wider my-8">
        Your cart
      </h2>

      {status.fetch === "loading" ? (
        <div className="py-20 text-center text-black/60">Loading your cart...</div>
      ) : !items.length ? (
        <div className="border border-black/20 rounded-2xl py-16 px-6 text-center">
          <h3 className="text-2xl font-bold">Your cart is empty</h3>
          <p className="mt-2 text-black/60">
            Browse the collection and add something you love.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center mt-6 px-7 h-11 bg-black text-white rounded-2xl"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-2/3 border border-black/20 rounded-2xl p-4">
            {items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <div className="flex-1/3 h-fit border border-black/20 rounded-2xl p-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="space-y-5 my-5 border-b border-black/20 pb-5">
              <div className="flex justify-between items-center">
                <h3 className="text-[16px] sm:text-xl text-black/60">Subtotal</h3>
                <span className="text-[16px] sm:text-xl font-bold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-[16px] sm:text-xl text-black/60">
                  Discount{coupon ? ` (-${coupon.discountPercentage}%)` : ""}
                </h3>
                <span className="text-[16px] sm:text-xl text-red-600 font-bold">
                  -{formatPrice(discount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-[16px] sm:text-xl text-black/60">Delivery fee</h3>
                <span className="text-[16px] sm:text-xl font-bold">Free</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-[16px] sm:text-xl font-semibold">Total</h3>
              <span className="text-xl sm:text-2xl font-bold">{formatPrice(total)}</span>
            </div>
            <form className="mt-7 mb-3 flex gap-2" onSubmit={handleCoupon}>
              <label className="relative flex-auto">
                <Tag
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(event) => setCouponCode(event.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Add promo code"
                  aria-label="Promo code"
                />
              </label>
              <button
                type="submit"
                disabled={status.coupon === "loading" || !couponCode.trim()}
                className="px-4 h-11 bg-black text-white rounded-2xl cursor-pointer disabled:opacity-40"
              >
                Apply
              </button>
            </form>
            <button
              type="button"
              disabled={isBusy}
              onClick={handleCheckout}
              className="flex justify-center items-center gap-3 w-full h-11 mx-auto bg-black text-white rounded-2xl cursor-pointer disabled:opacity-50"
            >
              {status.checkout === "loading" ? "Redirecting..." : "Go to checkout"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
