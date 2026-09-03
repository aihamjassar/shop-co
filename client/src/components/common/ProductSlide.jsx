import { Link } from "react-router-dom";
import { Stars } from "./Stars";

export const ProductSlide = ({ product }) => {
  const id = product._id;
  const name = product.title || product.name || "Untitled product";
  const image = product.imageCover || product.img;
  const rating = product.ratingsAverage ?? product.rating ?? 0;
  const price = Number(product.price || 0);
  const discount = Number(product.discount || 0);
  const salePrice = price - (price * discount) / 100;

  return (
    <Link to={`/details/${id}`} className="space-y-3 overflow-hidden snap-start group">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-black/5">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-[16px] font-bold truncate capitalize">{name}</h3>
        <div className="flex items-center gap-0.5">
          <Stars rating={rating} />
          <span className="text-[14px] ml-1">{rating.toFixed(1)}</span>
          <span className="text-[14px] text-black/60">/5</span>
        </div>
        <div className="flex items-center">
          <span className="text-[20px] font-bold">${salePrice.toFixed(2)}</span>
          {discount > 0 && (
            <>
              <span className="text-[20px] font-bold text-black/60 line-through mx-2.5">
                ${price.toFixed(2)}
              </span>
              <span className="w-11 text-[#FF3333] text-[12px] bg-red-100 p-1 px-2 rounded-2xl">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
