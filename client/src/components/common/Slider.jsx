import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

export const Slider = ({ children, btnClass }) => {
  const scrollRef = useRef(null);

  const scrollRight = () =>
    scrollRef.current.scrollBy({
      left: scrollRef.current.offsetWidth,
      behavior: "smooth",
    });

  const scrollLeft = () =>
    scrollRef.current.scrollBy({
      left: -scrollRef.current.offsetWidth,
      behavior: "smooth",
    });

  return (
    <div className="relative group">
      <div
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        ref={scrollRef}
      >
        {children}
      </div>
      <button
        className={`absolute top-1/2 -translate-y-1/2 left-2 z-10 w-10 h-10 p-2 rounded-full bg-black text-white cursor-pointer hidden sm:group-hover:block ${btnClass} hover:bg-gray-800 transition-colors`}
        onClick={scrollLeft}
        role="button"
        aria-label="Scroll left"
      >
        <ArrowLeft />
      </button>
      <button
        className={`absolute top-1/2 -translate-y-1/2 right-2 z-10 w-10 h-10 p-2 rounded-full bg-black text-white cursor-pointer hidden sm:group-hover:block ${btnClass} hover:bg-gray-800 transition-colors`}
        onClick={scrollRight}
        role="button"
        aria-label="Scroll right"
      >
        <ArrowRight />
      </button>
    </div>
  );
};
