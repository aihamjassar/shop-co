import { Star, StarHalf } from "lucide-react";
import React from "react";

export const Stars = ({ rating }) => {
  let stars = [];
  const integralPart = Math.trunc(rating);
  for (let index = 0; index < integralPart; index++) {
    stars.push(
      <Star className="size-4 text-[#FFC633] fill-[#FFC633]" key={index} />
    );
  }
  if (rating - integralPart > 0) {
    stars.push(
      <StarHalf
        className="size-4 text-[#FFC633] fill-[#FFC633]"
        key={`${rating}-half`}
      />
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};
