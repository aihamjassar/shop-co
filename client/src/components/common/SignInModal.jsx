import { AppleDark, Google } from "@ridemountainpig/svgl-react";
import { Key, Mail, X } from "lucide-react";
import { Link } from "react-router-dom";

export const SignInModal = ({ dispatch }) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tr z-40 w-lg max-w-11/12 h-[600px] px-3 py-10 bg-white rounded-2xl shadow-2xl border-2 border-black">
      <button
        type="button"
        className="absolute top-5 right-5 cursor-pointer hover:bg-gray-200"
        onClick={() => dispatch({ type: "CLOSE_MODAL" })}
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
        >
          <Google className="size-7" /> Sign up with google
        </button>
        <button
          className="w-full h-12 rounded-2xl flex justify-center items-center gap-5 bg-black text-white font-bold cursor-pointer"
          type="button"
        >
          <AppleDark className="size-7" /> Sign up with apple
        </button>
      </div>
      <div className="w-full h-[1px] bg-black my-7 relative after:content-['or'] after:absolute after:w-fit after:bg-white after:p-1 after:h-fit after:-top-4.5 after:left-1/2" />
      <form className="space-y-5">
        <label htmlFor="email2" className="block ml-1 mb-1.5">
          Email
        </label>
        <div className="relative w-full h-fit">
          <Mail className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-black/50" />
          <input
            type="email"
            id="email2"
            placeholder="Name@example.com"
            className="w-full h-10 border border-black/50 rounded-2xl pl-10 focus:outline-none"
          />
        </div>
        <label htmlFor="password" className="block ml-1 mb-1.5">
          Password
        </label>
        <div className="relative w-full h-fit">
          <Key className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-black/50" />
          <input
            type="password"
            id="password"
            placeholder="******"
            className="w-full h-10 border border-black/50 rounded-2xl pl-10 focus:outline-none"
          />
        </div>
        <button
          className="w-full h-12 rounded-2xl bg-black text-white font-bold cursor-pointer"
          role="button"
          aria-label="Open sign in modal"
        >
          Sign in
        </button>
      </form>
      <p className="text-center mt-5">
        Already have an account{" "}
        <Link to={""} className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};
