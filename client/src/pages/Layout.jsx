import { Footer } from "../components/common/Footer";
import { Header } from "../components/common//Header";
import { SignUpNow } from "../components/common/SignUpNow";
import { Outlet } from "react-router-dom";

export const Layout = () => {
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
