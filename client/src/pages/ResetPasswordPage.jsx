import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/thunks/authThunk";
import { clearError } from "../store/slices/auth.Slice";
import { Key } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    passwordConfirm: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  const { status, errors } = useSelector((state) => state.auth);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    return () => reduxDispatch(clearError("resetPassword"));
  }, [reduxDispatch]);

  useEffect(() => {
    if (status.resetPassword === "succeeded") navigate("/");
  }, [status.resetPassword, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors.resetPassword) reduxDispatch(clearError("resetPassword"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(resetPassword({ token: params.token, formData }));
  };

  return (
    <div className="h-[600px] w-full flex justify-center items-center">
      <div className="w-lg max-w-11/12 min-h-[300px] px-3 py-10 bg-white rounded-2xl shadow-2xl border-2 border-black">
        <h2 className="w-fit mx-auto text-2xl sm:text-3xl font-bold">
          Reset your password
        </h2>
        <form className="space-y-3 mt-5" onSubmit={handleSubmit}>
          {errors.resetPassword && (
            <p className="text-sm text-red-600 truncate">
              * {errors.resetPassword}
            </p>
          )}
          <label htmlFor="newPassword" className="block ml-1 mb-1.5">
            New password
          </label>
          <div className="relative w-full h-fit">
            <Key className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-black/50" />
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="********"
              className="w-full h-10 border border-black/50 rounded-2xl pl-10 focus:outline-none"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="passwordConfirm" className="block ml-1 mb-1.5">
            Password confirm
          </label>
          <div className="relative w-full h-fit">
            <Key className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-black/50" />
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="********"
              className="w-full h-10 border border-black/50 rounded-2xl pl-10 focus:outline-none"
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 mt-4 rounded-2xl bg-black text-white font-bold cursor-pointer"
            role="button"
            aria-label="Reset password"
            disabled={status.resetPassword === "loading"}
          >
            {status.resetPassword === "loading"
              ? "Resetting..."
              : status.resetPassword === "succeeded"
              ? "Reset successful"
              : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
};
