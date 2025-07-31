import { Link } from "react-router-dom";
import heroImg from "../../assets/heroImg.png";
import star from "../../assets/Vector.svg";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="bg-[#f2f0f1] min-h-screen ">
      <div className="container mx-auto px-5 md:px-8 pt-32">
        <div className="flex flex-col lg:flex-row justify-between gap-2 md:gap-10">
          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <div className="space-y-5">
              <h2 className="max-w-[315px] sm:max-w-[577px] text-4xl sm:text-6xl leading-8 sm:leading-16 font-extrabold uppercase">
                find clothes that matches your style
              </h2>
              <p className="max-w-[358px] sm:max-w-[545px] text-[14px] leading-5 text-black/60">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
            </div>
            <Link
              to={"/"}
              className="block w-full lg:w-52 p-3.5 rounded-[62px] text-white bg-black text-center my-8 cursor-pointer hover:bg-gray-800 transition-colors"
              role="button"
              aria-label="Shop Now"
            >
              Shop Now
            </Link>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 my-8">
              {/* 1 */}
              <div className="text-center px-4">
                <h3 className="text-2xl font-bold">200+</h3>
                <p className="text-[12px] text-black/60">
                  International Brands
                </p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-12 bg-black/10" />

              {/* 2 */}
              <div className="text-center px-4">
                <h3 className="text-2xl font-bold">2,000+</h3>
                <p className="text-[12px] text-black/60">
                  High-Quality Products
                </p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-12 bg-black/10" />

              {/* 3 */}
              <div className="text-center px-4">
                <h3 className="text-2xl font-bold">30,000+</h3>
                <p className="text-[12px] text-black/60">Happy Customers</p>
              </div>
            </div>
          </motion.div>
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full lg:w-1/2 relative flex justify-center"
          >
            <img
              src={heroImg}
              className="object-cover md:max-w-xl md:h-[470px]"
              loading="lazy"
              alt="hero image"
            />
            <img
              src={star}
              className="absolute top-1/12 right-1/12 w-12 sm:w-16"
              loading="lazy"
              alt="star img"
            />
            <img
              src={star}
              className="absolute top-1/2 left-0 w-8 sm:w-16"
              loading="lazy"
              alt="star img"
            />
          </motion.div>
        </div>
      </div>
      <div className=" w-full min-h-20 lg:min-h-[97px] bg-black text-white flex items-center">
        <div className="container mx-auto px-5 md:px-8 flex flex-wrap justify-between items-center gap-2 text-[20px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          <span className="uppercase font-extrabold">versace</span>
          <span className="uppercase font-extrabold">zara</span>
          <span className="uppercase font-extrabold">gucci</span>
          <span className="uppercase font-extrabold">prada</span>
          <span className="uppercase font-extrabold">calvin klein</span>
        </div>
      </div>
    </section>
  );
};
