import { CheckCircle2, XCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { clearCart } from "../store/thunks/cartThunk";
import { useDispatch } from "react-redux";

export const CheckoutResultPage = ({ success }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  if (success && sessionId) {
    // place order and clear the cart
    dispatch(clearCart());
  }

  return (
    <div className="container mx-auto px-5 md:px-8 py-16 min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-xl border border-black/15 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
        {success ? (
          <CheckCircle2 className="mx-auto text-green-600" size={58} />
        ) : (
          <XCircle className="mx-auto text-red-600" size={58} />
        )}
        <h1 className="mt-5 text-3xl font-extrabold uppercase -tracking-wider">
          {success ? "Payment successful" : "Payment cancelled"}
        </h1>
        <p className="mt-3 text-black/60 leading-6">
          {success
            ? "Thank you for your order. Your payment was received and your order is being prepared."
            : "Your payment was cancelled. Nothing was charged, and you can return to your cart whenever you are ready."}
        </p>
        {success && sessionId && (
          <p className="mt-4 text-xs text-black/40 break-all">
            Reference: {sessionId}
          </p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={success ? "/shop" : "/cart"}
            className="inline-flex items-center justify-center h-11 px-7 rounded-2xl bg-black text-white"
          >
            {success ? "Continue shopping" : "Return to cart"}
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center h-11 px-7 rounded-2xl border border-black/20"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
};
