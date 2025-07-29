import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";

export const SignUpNow = () => {
  const [close, setClose] = useState(false);
  return (
    <div className={`bg-black text-white ${close && "hidden"}`}>
      <div className="container mx-auto px-5 md:px-8 py-1.5 ">
        <div className="relative">
          <p className="text-center text-[12px] sm:text-[16px]">
            Sign up and get 20% off to your first order.{" "}
            <Link
              to={"/signup"}
              className="underline underline-offset-4 transition-colors duration-200 hover:text-blue-700"
            >
              Sign Up Now
            </Link>
          </p>
          <X
            className={
              "absolute top-0 right-1 cursor-pointer transition-colors duration-200 rounded-md hidden sm:block hover:bg-gray-600"
            }
            onClick={() => setClose(true)}
          />
        </div>
      </div>
    </div>
  );
};
