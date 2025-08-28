import { useForm } from "react-hook-form";
import { useState } from "react";

export const CreateProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Create Product</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "Too short product title" },
            maxLength: { value: 100, message: "Too long product title" },
          })}
          className="w-full p-2 border rounded"
          placeholder="Product title"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: { value: 20, message: "Too short description" },
            maxLength: { value: 1000, message: "Too long description" },
          })}
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Product description..."
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className="block mb-1 font-medium">Quantity</label>
        <input
          type="number"
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 0, message: "Quantity cannot be negative" },
          })}
          className="w-full p-2 border rounded"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input
          type="number"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price cannot be negative" },
          })}
          className="w-full p-2 border rounded"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Discount */}
      <div>
        <label className="block mb-1 font-medium">Discount (%)</label>
        <input
          type="number"
          {...register("discount", {
            min: { value: 0, message: "Discount cannot be negative" },
            max: { value: 100, message: "Discount cannot be greater than 100" },
          })}
          className="w-full p-2 border rounded"
        />
        {errors.discount && (
          <p className="text-red-500 text-sm">{errors.discount.message}</p>
        )}
      </div>

      {/* Colors */}
      <div>
        <label className="block mb-1 font-medium">Colors</label>
        <input
          {...register("colors", { required: "Color is required" })}
          placeholder="e.g. Red, Blue"
          className="w-full p-2 border rounded"
        />
        {errors.colors && (
          <p className="text-red-500 text-sm">{errors.colors.message}</p>
        )}
      </div>

      {/* Sizes */}
      <div>
        <label className="block mb-1 font-medium">Sizes</label>
        <input
          {...register("sizes", { required: "Size is required" })}
          placeholder="e.g. S, M, L, XL"
          className="w-full p-2 border rounded"
        />
        {errors.sizes && (
          <p className="text-red-500 text-sm">{errors.sizes.message}</p>
        )}
      </div>

      {/* Style */}
      <div>
        <label className="block mb-1 font-medium">Style</label>
        <select {...register("style")} className="w-full p-2 border rounded">
          <option value="">Select style</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Gym">Gym</option>
          <option value="Party">Party</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Subcategory */}
      <div>
        <label className="block mb-1 font-medium">Subcategory</label>
        <input
          {...register("subcategory")}
          placeholder="T-shirt, Pants, Shoes..."
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Image Cover */}
      <div>
        <label className="block mb-1 font-medium">Image Cover</label>
        <input
          type="file"
          accept="image/*"
          {...register("imageCover", { required: "Image cover is required" })}
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        {preview && (
          <img src={preview} alt="preview" className="mt-2 h-24 rounded" />
        )}
      </div>

      {/* Images */}
      <div>
        <label className="block mb-1 font-medium">Additional Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          {...register("images")}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
};
