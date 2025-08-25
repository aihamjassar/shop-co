import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Key, Mail, User, X } from "lucide-react";
import { AppleDark, Google } from "@ridemountainpig/svgl-react";
import { clearError } from "../../store/slices/auth.Slice";
import { register, loginWithGoogle } from "../../store/thunks/authThunk";
import { useGoogleLogin } from "@react-oauth/google";

export const SignUpModal = ({ dispatch: modalDispatch }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const reduxDispatch = useDispatch();
  const { status, errors } = useSelector((store) => store.auth);

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      reduxDispatch(loginWithGoogle(credentialResponse.access_token));
    },
  });

  useEffect(() => {
    return () => {
      reduxDispatch(clearError("register"));
      reduxDispatch(clearError("google"));
    };
  }, [reduxDispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors.register || errors.google) {
      reduxDispatch(clearError("register"));
      reduxDispatch(clearError("google"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(register(formData));
  };

  useEffect(() => {
    let timer;
    if (status.register === "succeeded" || status.google === "succeeded")
      timer = setTimeout(() => {
        modalDispatch({ type: "CLOSE_SIGNUP_MODAL" });
      }, 500);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status.register, status.google, modalDispatch]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tr z-40 w-lg max-w-11/12 min-h-[650px] px-3 py-8 bg-white rounded-2xl shadow-2xl border-2 border-black">
      <button
        type="button"
        className="absolute top-5 right-5 cursor-pointer hover:bg-gray-200"
        onClick={() => modalDispatch({ type: "CLOSE_SIGNUP_MODAL" })}
        role="button"
        aria-label="Close sign up modal"
      >
        <X />
      </button>
      <h2 className="w-fit mx-auto text-3xl font-bold">Sign up</h2>
      <div className="mt-8 space-y-2.5">
        <button
          className="w-full h-12 rounded-2xl flex justify-center items-center gap-5 bg-black text-white font-bold cursor-pointer"
          type="button"
          onClick={() => login()}
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
      {(errors.register || errors.google) && (
        <p className="text-sm text-red-600 truncate">
          * {errors.register + errors.google}
        </p>
      )}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label htmlFor="username" className="block ml-1 mb-1.5">
          Username
        </label>
        <div className="relative w-full h-fit">
          <User className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-black/50" />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your username"
            className="w-full h-10 border border-black/50 rounded-2xl pl-10 focus:outline-none"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
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
        <div className="relative w-full h-fit">
          <Key className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-black/50" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            className="w-full h-10 border border-black/50 rounded-2xl pl-10 focus:outline-none"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full h-12 rounded-2xl bg-black text-white font-bold cursor-pointer"
          role="button"
          aria-label="Open sign in modal"
          disabled={status.register === "loading"}
        >
          {status.register === "loading"
            ? "Logging..."
            : status.register === "succeeded"
            ? "Register successful"
            : "Sign up"}
        </button>
      </form>
      <p className="text-center mt-5">
        Do have an account?{" "}
        <Link
          to={""}
          className="text-blue-500"
          onClick={() => {
            modalDispatch({ type: "CLOSE_SIGNUP_MODAL" });
            modalDispatch({ type: "OPEN_SIGNIN_MODAL" });
          }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
