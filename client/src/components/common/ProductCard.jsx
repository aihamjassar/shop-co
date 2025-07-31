import { Star, StarHalf } from "lucide-react";
export const ProductCard = ({ product }) => {
  const { name, price, img, rating, discount } = product;
  const printStars = () => {
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
    return stars;
  };

  return (
    <div className="min-w-48 lg:w-52 space-y-3 overflow-hidden">
      <img
        src={img}
        alt={name}
        className="w-full min-h-[250px] object-cover rounded-2xl transition-transform duration-300 hover:scale-110"
      />
      <div className="space-y-2">
        <h3 className="text-[16px] font-bold truncate">{name}</h3>
        <div className="flex items-center gap-0.5">
          {printStars()}
          <span className="text-[14px]">{rating}/</span>
          <span className="text-[14px] text-black/60">5</span>
        </div>
        <div className="flex items-center">
          <span className="text-[20px] font-bold">
            ${discount > 0 ? price - (price * discount) / 100 : price}
          </span>
          {discount > 0 && (
            <>
              <span className="text-[20px] font-bold text-black/60 line-through mx-2.5">
                ${price}
              </span>
              <span className="w-11 text-[#FF3333] text-[12px] bg-red-100 p-1 px-2 rounded-2xl">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
