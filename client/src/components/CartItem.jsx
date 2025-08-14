import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="w-full flex gap-5 not-last:border-b border-black/20 pb-5 mb-5">
      <div className="w-32 h-36 rounded-2xl overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto py-2 space-y-3">
        <div className="flex justify-between items-center gap-2">
          <h3 className="flex-auto text-[16px] font-bold truncate capitalize">
            {item.name}
          </h3>
          <button className="w-fit cursor-pointer">
            <Trash2 color="#ff0000" />
          </button>
        </div>
        <div className="space-y-1">
          <h4 className="text-[16px] text-black/80 font-semibold">
            Size: <span className="text-sm text-black/60">{item.size}</span>
          </h4>
          <h4 className="text-[16px] text-black/80 font-semibold">
            Color: <span className="text-sm text-black/60">{item.color}</span>
          </h4>
        </div>
        <div className="flex justify-between items-center gap-2.5">
          <span className="text-[20px] font-bold">${item.price}</span>
          <div className="flex">
            <button
              disabled={quantity === 1}
              className="flex justify-center items-center w-8 h-8 rounded-l-2xl bg-gray-200 cursor-pointer hover:bg-black/40"
              onClick={() => setQuantity(quantity - 1)}
            >
              <Minus size={18} />
            </button>
            <span className="block w-6 h-8 leading-7 text-center bg-gray-200">
              {quantity}
            </span>
            <button
              className="flex justify-center items-center w-8 h-8 rounded-r-2xl bg-gray-200 cursor-pointer hover:bg-black/40"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
