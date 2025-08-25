import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mail, X } from "lucide-react";
import { clearError } from "../../store/slices/auth.Slice";
import { forgotPassword } from "../../store/thunks/authThunk";

export const ForgotPasswordModal = ({ dispatch: modalDispatch }) => {
  const [email, setEmail] = useState("");

  const reduxDispatch = useDispatch();
  const { status, errors } = useSelector((store) => store.auth);

  useEffect(() => {
    return () => reduxDispatch(clearError("forgotPassword"));
  }, [reduxDispatch]);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.forgotPassword) reduxDispatch(clearError("forgotPassword"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(forgotPassword(email));
  };

  useEffect(() => {
    let timer;
    if (status.forgotPassword === "succeeded")
      timer = setTimeout(() => {
        modalDispatch({ type: "CLOSE_FORGOT_PASSWORD_MODAL" });
      }, 500);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status.forgotPassword, modalDispatch]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tr z-40 w-lg max-w-11/12 min-h-[300px] px-3 py-10 bg-white rounded-2xl shadow-2xl border-2 border-black">
      <button
        type="button"
        className="absolute top-3 right-3 cursor-pointer hover:bg-gray-200"
        onClick={() => modalDispatch({ type: "CLOSE_FORGOT_PASSWORD_MODAL" })}
        role="button"
        aria-label="Close sign up modal"
      >
        <X />
      </button>

      <h2 className="w-fit mx-auto text-2xl sm:text-3xl font-bold">
        Reset your password
      </h2>
      <form className="space-y-3 mt-5" onSubmit={handleSubmit}>
        {errors.forgotPassword && (
          <p className="text-sm text-red-600 truncate">
            * {errors.forgotPassword}
          </p>
        )}
        <label htmlFor="resetEmail" className="block ml-1 mb-1.5">
          Email
        </label>
        <div className="relative w-full h-fit">
          <Mail className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-black/50" />
          <input
            type="email"
            name="email"
            id="resetEmail"
            placeholder="Name@example.com"
            className="w-full h-10 border border-black/50 rounded-2xl pl-10 focus:outline-none"
            value={email}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full h-12 mt-4 rounded-2xl bg-black text-white font-bold cursor-pointer"
          role="button"
          aria-label="Open sign in modal"
          disabled={status.forgotPassword === "loading"}
        >
          {status.forgotPassword === "loading"
            ? "Sending..."
            : status.forgotPassword === "succeeded"
            ? "Link sent successfully"
            : "Send reset link"}
        </button>
      </form>
      <p className="text-center mt-5">
        Return to{" "}
        <Link
          to={""}
          className="text-blue-500"
          onClick={() => {
            modalDispatch({ type: "CLOSE_FORGOT_PASSWORD_MODAL" });
            modalDispatch({ type: "OPEN_SIGNIN_MODAL" });
          }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
