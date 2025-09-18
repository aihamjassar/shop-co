import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { handleUploadImage } from "../../utils/handleUploadImage";
import { useDispatch } from "react-redux";
import { getProduct, updateProduct } from "../../store/thunks/productsThunk";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

export const UpdateProductPage = () => {
  const [product, setProduct] = useState(null);
  const reduxDispatch = useDispatch();
  const { id: productId } = useParams();
  const [preview, setPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImagesPreview((preState) => [
        ...preState,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  console.log(imagesPreview);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {} });

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const result = await reduxDispatch(getProduct(productId)).unwrap();
        setProduct(result.product);
        reset({
          ...result.product,
          colors: result.product.colors.join(","),
          sizes: result.product.sizes.join(","),
        });
        setPreview(result.product.imageCover);
        setImagesPreview(result.product.images);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProduct();
  }, [reduxDispatch, productId, reset]);

  const onSubmit = async (data) => {
    let uploadedImages = [];
    let imageCoverUrl = product.imageCover;
    let imagesUrls = product.images;

    if (data.imageCover && data.imageCover.length > 0) {
      const { secure_url, public_id } = await handleUploadImage(
        data.imageCover[0],
        { folder: "products/covers" }
      );
      imageCoverUrl = secure_url;
      uploadedImages.push(public_id);
    }

    if (data.images && data.images.length > 0) {
      const files = Array.from(data.images || []);
      imageCoverUrl = await Promise.all(
        files.map(async (file) => {
          const result = await handleUploadImage(file, {
            folder: "products/gallery",
          });
          uploadedImages.push(result.public_id);
          return result.secure_url;
        })
      );
    }

    const productData = {
      ...data,
      style: data.style || undefined,
      colors: data.colors
        ? data.colors.split(",").map((color) => color.trim())
        : [],
      sizes: data.sizes ? data.sizes.split(",").map((size) => size.trim()) : [],
      imageCover: imageCoverUrl,
      images: imagesUrls,
    };

    reduxDispatch(updateProduct({ id: productId, product: productData }))
      .unwrap()
      .then(() => toast.success("Product updated successfully"))
      .catch(async (err) => {
        if (uploadedImages.length > 0) {
          await Promise.all(
            uploadedImages.map(({ public_id, folder }) =>
              axiosInstance.post("/delete-image", { public_id, folder })
            )
          );
        }
        toast.error(err.message);
      });
  };

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
          step={"any"}
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
          step={"any"}
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
        {errors.subcategory && (
          <p className="text-red-500 text-sm">{errors.subcategory.message}</p>
        )}
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
        {errors.imageCover && (
          <p className="text-red-500 text-sm">{errors.imageCover.message}</p>
        )}
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
          onChange={handleImagesChange}
        />
        {errors.images && (
          <p className="text-red-500 text-sm">{errors.images.message}</p>
        )}
        {imagesPreview && (
          <div className="flex gap-2 flex-wrap mt-2">
            {imagesPreview.map((preview, idx) => (
              <img
                key={idx}
                src={preview}
                alt="preview"
                className="h-24 rounded"
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
};
