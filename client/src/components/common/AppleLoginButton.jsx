import { AppleDark } from "@ridemountainpig/svgl-react";
import { useDispatch, useSelector } from "react-redux";

export const AppleLoginButton = () => {
  const reduxDispatch = useDispatch();
  const { status, errors } = useSelector((state) => state.auth);

  const handleAppleLogin = async () => {
    try {
      const clientId = import.meta.VITE_APPLE_CLIENT_ID;
      const redirectUri = import.meta.VITE_APPLE_REDIRECT_URI;

      const url = `https://appleid.apple.com/auth/authorize?response_type=code&response_mode=form_post&client_id=${clientId}&redirect_uri=${redirectUri}&scope=name email`;
      const width = 500;
      const height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;

      const win = window.open(
        url,
        "AppleLogin",
        `width:${width},height:${height},top:${top},left:${left}`
      );

      const timer = setInterval(() => {
        if (win.closed) clearInterval(timer);
      }, 500);
    } catch (error) {
      console.log("Apple login failed", error);
    }
  };

  return (
    <button
      className="w-full h-12 rounded-2xl flex justify-center items-center gap-5 bg-black text-white font-bold cursor-pointer"
      type="button"
      onClick={handleAppleLogin}
      disabled={status.apple === "loading"}
    >
      <AppleDark className="size-7" /> Continue with Apple
    </button>
  );
};
