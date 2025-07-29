import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SignUpNow } from "../components/SignUpNow";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const [isSignup, setIsSignUp] = useState(false);

  return (
    <div className="">
      <div className="fixed inset-0 h-fit z-50">
          <SignUpNow />
          <Header />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};
