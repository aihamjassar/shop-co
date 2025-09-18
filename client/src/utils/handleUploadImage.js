import { axiosInstance } from "../lib/axios";

export const handleUploadImage = async (file, options = {}) => {
  try {
    const {
      folder = "",
      width = 800,
      height = 800,
      crop = "fill",
      gravity = "auto",
    } = options;

    const res = await axiosInstance.get("/upload-signature", {
      params: {
        folder,
        width,
        height,
        crop,
        gravity,
      },
    });
    const { timestamp, signature, api_key, cloud_name } = res.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", api_key);
    formData.append("folder", folder);
    // formData.append("width", width);
    // formData.append("height", height);
    // formData.append("crop", crop);
    // formData.append("gravity", gravity);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await uploadRes.json();
    return { secure_url: data.secure_url, public_id: data.public_id };
  } catch (error) {
    console.log(error.response?.data?.message || "Failed to upload image");
  }
};
