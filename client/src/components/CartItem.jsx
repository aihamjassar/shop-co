import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from "../store/thunks/cartThunk";

const formatPrice = (value) => `$${Number(value || 0).toFixed(2)}`;

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const product = item.product || {};
  const title = product.title || "Product";
  const image = product.imageCover;

  const changeQuantity = async (quantity) => {
    if (quantity < 1 || quantity === item.quantity || isUpdating) return;

    setIsUpdating(true);
    try {
      await dispatch(updateCartItem({ itemId: item._id, quantity })).unwrap();
      await dispatch(getCart()).unwrap();
    } catch (error) {
      toast.error(error || "Could not update the cart");
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      await dispatch(removeCartItem(item._id)).unwrap();
      await dispatch(getCart()).unwrap();
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error(error || "Could not remove the product");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <article className="w-full flex gap-4 sm:gap-5 not-last:border-b border-black/20 pb-5 mb-5">
      <div className="w-24 h-28 sm:w-32 sm:h-36 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-black/40">
            No image
          </div>
        )}
      </div>
      <div className="flex-auto min-w-0 py-1 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="flex-auto text-[16px] font-bold truncate capitalize">
            {title}
          </h3>
          <button
            type="button"
            aria-label={`Remove ${title}`}
            disabled={isUpdating}
            className="w-fit cursor-pointer disabled:opacity-40"
            onClick={removeItem}
          >
            <Trash2 color="#ff0000" size={19} />
          </button>
        </div>
        <div className="space-y-1">
          <h4 className="text-[14px] text-black/80 font-semibold">
            Size: <span className="font-normal text-black/60">{item.size}</span>
          </h4>
          <h4 className="flex items-center gap-1.5 text-[14px] text-black/80 font-semibold">
            Color:
            <span
              className="inline-block size-4 rounded-full border border-black/20"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <span className="font-normal text-black/60">{item.color}</span>
          </h4>
        </div>
        <div className="flex justify-between items-center gap-2.5">
          <span className="text-[18px] sm:text-[20px] font-bold">
            {formatPrice(item.price)}
          </span>
          <div className="flex" aria-label={`Quantity: ${item.quantity}`}>
            <button
              type="button"
              disabled={item.quantity === 1 || isUpdating}
              aria-label="Decrease quantity"
              className="flex justify-center items-center w-8 h-8 rounded-l-2xl bg-gray-200 cursor-pointer hover:bg-black/40 disabled:opacity-40"
              onClick={() => changeQuantity(item.quantity - 1)}
            >
              <Minus size={18} />
            </button>
            <span className="block w-7 h-8 leading-7 text-center bg-gray-200">
              {isUpdating ? "…" : item.quantity}
            </span>
            <button
              type="button"
              disabled={isUpdating}
              aria-label="Increase quantity"
              className="flex justify-center items-center w-8 h-8 rounded-r-2xl bg-gray-200 cursor-pointer hover:bg-black/40 disabled:opacity-40"
              onClick={() => changeQuantity(item.quantity + 1)}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
