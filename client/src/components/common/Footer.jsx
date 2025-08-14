import { Link } from "react-router-dom";
import {
  GitHubLight,
  InstagramLight,
  XLight,
} from "@ridemountainpig/svgl-react";
import { FacebookIcon, Mail } from "lucide-react";

import visaCard from "../../assets/visa.png";
import masterCard from "../../assets/masterCard.png";
import paypal from "../../assets/paypal.png";
import applePay from "../../assets/apple-pay.png";
import googlePay from "../../assets/google-pay.png";

export const Footer = () => {
  return (
    <footer className="w-full bg-[linear-gradient(to_bottom,white_20%,#f2f0f1_20%)]">
      <div className="container mx-auto px-5 md:px-8 py-10">
        <div className="flex flex-col sm:flex-row lg:justify-between gap-10 sm:gap-5 bg-black rounded-xl px-4 py-10 mb-8 shadow-md">
          <p className="text-3xl lg:text-4xl font-extrabold leading-9 text-white uppercase max-w-96 sm:w-1/2 lg:max-w-lg lg:flex justify-center">
            Stay up to date with our latest offers
          </p>
          <form className="space-y-5 sm:w-1/2 lg:max-w-lg lg:mx-auto">
            <label htmlFor="email" className="relative block">
              <Mail className="absolute top-2.5 left-3 size-5 text-black/40" />
              <input
                type="email"
                className="w-full h-10 pl-9 outline-none rounded-3xl bg-white"
                placeholder="Enter your email address"
                id="email"
              />
            </label>
            <button className="w-full h-10 rounded-3xl bg-white cursor-pointer hover:bg-gray-200 transition-colors">
              Subscribe to Newsletter
            </button>
          </form>
        </div>

        <div className="xl:flex justify-between gap-20">
          <div className="w-fit">
            <h1 className="text-3xl font-extrabold -tracking-wider mb-3">
              <Link to={"/"}>SHOP.CO</Link>
            </h1>
            <p className="max-w-[357px] text-[14px] leading-5 text-black/60">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className="flex items-center gap-3.5 my-7">
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="size-9 p-2 border border-gray-500 rounded-full flex justify-center items-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <XLight className="size-6" />
              </a>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="size-9 p-2 border border-gray-500 rounded-full flex justify-center items-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="size-9 p-2 border border-gray-500 rounded-full flex justify-center items-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <InstagramLight className="size-6" />
              </a>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="size-9 p-2 border border-gray-500 rounded-full flex justify-center items-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <GitHubLight className="size-6" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[20px] font-semibold tracking-wider uppercase mb-2.5">
                company
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Works
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Career
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[20px] font-semibold tracking-wider uppercase mb-2.5">
                help
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Customer Support
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Delivery Details
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Terms & conditions
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[20px] font-semibold tracking-wider uppercase mb-2.5">
                f a q
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Account
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Manage Deliveries
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Orders
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Payment
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[20px] font-semibold tracking-wider uppercase mb-2.5">
                resources
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Free eBook
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Development
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    How to-Blog
                  </a>
                </li>
                <li>
                  <a
                    href={"https://example.com"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-700 transition-colors"
                  >
                    Youtube Playlist
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-black/20 my-16" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mb-10">
          <p className="text-[14px] text-black/60 text-center max-w-fit">
            Shop.co © 2000-{new Date().getFullYear()}, All Rights Reserved
          </p>
          <div className="flex justify-between items-center gap-2">
            <a
              href="https://example.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Visa Card"
              className="flex justify-center items-center w-12 md:w-14 rounded-md bg-white "
            >
              <img src={visaCard} alt="visa card" className="h-7 md:h-9" />
            </a>
            <a
              href="https://example.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Master Card"
              className="flex justify-center items-center w-12 md:w-14 rounded-md bg-white "
            >
              <img
                src={masterCard}
                alt="master card"
                className="h-7 md:h-9 p-1"
              />
            </a>
            <a
              href="https://example.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="PayPal"
              className="flex justify-center items-center w-12 md:w-14 rounded-md bg-white "
            >
              <img src={paypal} alt="paypal" className="h-7 md:h-9" />
            </a>
            <a
              href="https://example.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Apple Pay"
              className="flex justify-center items-center w-12 md:w-14 rounded-md bg-white "
            >
              <img src={applePay} alt="apple pay" className="h-7 md:h-9" />
            </a>
            <a
              href="https://example.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Google Pay"
              className="flex justify-center items-center w-12 md:w-14 rounded-md bg-white "
            >
              <img src={googlePay} alt="google pay" className="h-7 md:h-9" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
