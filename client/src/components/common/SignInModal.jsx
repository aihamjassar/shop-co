import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError } from "../../store/slices/auth.Slice";
import { login, loginWithGoogle } from "../../store/thunks/authThunk";
import { Eye, EyeClosed, Key, Mail, X } from "lucide-react";
import { AppleDark, Google } from "@ridemountainpig/svgl-react";
import { useGoogleLogin } from "@react-oauth/google";

export const SignInModal = ({ dispatch: modalDispatch }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const reduxDispatch = useDispatch();
  const { status, errors } = useSelector((store) => store.auth);

  const _login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      reduxDispatch(loginWithGoogle(credentialResponse.access_token));
    },
  });

  useEffect(() => {
    return () => {
      reduxDispatch(clearError("login"));
      reduxDispatch(clearError("google"));
    };
  }, [reduxDispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors.login || errors.google) {
      reduxDispatch(clearError("login"));
      reduxDispatch(clearError("google"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(login(formData));
  };

  useEffect(() => {
    let timer;
    if (status.login === "succeeded" || status.google === "succeeded")
      timer = setTimeout(() => {
        modalDispatch({ type: "CLOSE_SIGNIN_MODAL" });
      }, 500);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status.login, status.google, modalDispatch]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tr z-40 w-lg max-w-11/12 h-[600px] px-3 py-10 bg-white rounded-2xl shadow-2xl border-2 border-black">
      <button
        type="button"
        className="absolute top-5 right-5 cursor-pointer hover:bg-gray-200"
        onClick={() => modalDispatch({ type: "CLOSE_SIGNIN_MODAL" })}
        role="button"
        aria-label="Close sign in modal"
      >
        <X />
      </button>
      <h2 className="w-fit mx-auto text-3xl font-bold">Sign in</h2>
      <div className="mt-8 space-y-2.5">
        <button
          className="w-full h-12 rounded-2xl flex justify-center items-center gap-5 bg-black text-white font-bold cursor-pointer"
          type="button"
          onClick={() => _login()}
        >
          <Google className="size-7" />{" "}
          {status.google === "loading"
            ? "Connecting..."
            : "Continue with google"}
        </button>
        <button
          className="w-full h-12 rounded-2xl flex justify-center items-center gap-5 bg-black text-white font-bold cursor-pointer"
          type="button"
        >
          <AppleDark className="size-7" /> Continue with apple
        </button>
      </div>
      <div className="w-full h-[1px] bg-black my-7 relative after:content-['or'] after:absolute after:w-fit after:bg-white after:p-1 after:h-fit after:-top-4.5 after:left-1/2" />
      {(errors.login || errors.google) && (
        <p className="text-sm text-red-600">
          * {errors.login + " " + errors.google}
        </p>
      )}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label htmlFor="email2" className="block ml-1 mb-1.5">
          Email
        </label>
        <div className="relative w-full h-fit">
          <Mail className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-black/50" />
          <input
            type="email"
            name="email"
            id="email2"
            placeholder="Name@example.com"
            className="w-full h-10 border border-black/50 rounded-2xl pl-10 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <label htmlFor="password" className="block ml-1 mb-1.5">
          Password
        </label>
        <div>
          <div className="relative w-full h-fit">
            <Key className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-black/50" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="******"
              className="w-full h-10 border border-black/50 rounded-2xl pl-10 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              className="absolute top-1/2 right-3 -translate-y-1/2 size-fit cursor-pointer"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Link
            to={""}
            className="mt-2.5 ml-1 hover:text-blue-500"
            onClick={() => {
              modalDispatch({ type: "CLOSE_SIGNIN_MODAL" });
              modalDispatch({ type: "OPEN_FORGOT_PASSWORD_MODAL" });
            }}
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-2xl bg-black text-white font-bold cursor-pointer"
          role="button"
          aria-label="Open sign in modal"
          disabled={status.login === "loading"}
        >
          {status.login === "loading"
            ? "Signing in..."
            : status.login === "succeeded"
            ? "Sign in successfully"
            : "Sign in"}
        </button>
      </form>
      <p className="text-center mt-5">
        Don’t have an account?{" "}
        <Link
          to={""}
          className="text-blue-500"
          onClick={() => {
            modalDispatch({ type: "CLOSE_SIGNIN_MODAL" });
            modalDispatch({ type: "OPEN_SIGNUP_MODAL" });
          }}
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};
