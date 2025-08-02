import { CheckCircle2 } from "lucide-react";
import { Stars } from "./Stars";

export const TestimonialSlide = ({ testimonial }) => {
  const { text, name, rating, active } = testimonial;
  return (
    <div className="min-w-80 w-96 max-w-full bg-white border border-black/20 shadow-md rounded-2xl p-5 space-y-2 snap-start">
      <Stars rating={rating} />
      <div className="flex items-center gap-1.5">
        <h3 className="text-[20px] font-bold">{name}</h3>
        {active && <CheckCircle2 className="text-white fill-green-600" />}
      </div>
      <p className="italic text-[16px] text-black/60 leading-6">
        "{text}"
      </p>
    </div>
  );
};
