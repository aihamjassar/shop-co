require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const Product = require("../models/product.model");

const products = [
  {
    title: "Essential Cotton T-Shirt",
    description: "A breathable everyday cotton tee with a relaxed fit and durable ribbed neckline.",
    quantity: 48,
    price: 35,
    discount: 0,
    colors: ["Black", "White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    imageCover: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85"],
    ratingsAverage: 4.7,
    ratingsQuantity: 126,
    style: "Casual",
    category: "Men",
    subcategory: "T-shirt",
  },
  {
    title: "Relaxed Linen Shirt",
    description: "A lightweight linen button-down designed for warm days, easy layering, and effortless polish.",
    quantity: 32,
    price: 72,
    discount: 15,
    colors: ["Sand", "Sky Blue", "White"],
    sizes: ["S", "M", "L", "XL"],
    imageCover: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    images: ["https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85"],
    ratingsAverage: 4.5,
    ratingsQuantity: 89,
    style: "Formal",
    category: "Men",
    subcategory: "Shirt",
  },
  {
    title: "Tailored Wide-Leg Trousers",
    description: "Fluid wide-leg trousers with a clean waistband and tailored drape for day-to-night dressing.",
    quantity: 24,
    price: 98,
    discount: 20,
    colors: ["Charcoal", "Cream"],
    sizes: ["XS", "S", "M", "L"],
    imageCover: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    images: ["https://images.unsplash.com/photo-1506629905607-d9a9b65d9f37?auto=format&fit=crop&w=900&q=85"],
    ratingsAverage: 4.6,
    ratingsQuantity: 74,
    style: "Formal",
    category: "Women",
    subcategory: "Pants",
  },
  {
    title: "Studio Performance Hoodie",
    description: "A soft stretch performance hoodie with a brushed interior, zip pockets, and an adjustable hood.",
    quantity: 41,
    price: 84,
    discount: 10,
    colors: ["Heather Grey", "Black", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    imageCover: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    images: ["https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85"],
    ratingsAverage: 4.8,
    ratingsQuantity: 211,
    style: "Gym",
    category: "Unisex",
    subcategory: "Hoodie",
  },
  {
    title: "Satin Evening Slip Dress",
    description: "A fluid satin slip dress with delicate straps and a flattering bias cut for special occasions.",
    quantity: 18,
    price: 120,
    discount: 25,
    colors: ["Burgundy", "Black", "Champagne"],
    sizes: ["XS", "S", "M", "L"],
    imageCover: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85"],
    ratingsAverage: 4.4,
    ratingsQuantity: 53,
    style: "Party",
    category: "Women",
    subcategory: "Dress",
  },
  {
    title: "Structured Overshirt Jacket",
    description: "A versatile midweight overshirt with utility pockets and a structured silhouette for transitional weather.",
    quantity: 27,
    price: 110,
    discount: 0,
    colors: ["Stone", "Black"],
    sizes: ["S", "M", "L", "XL"],
    imageCover: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    images: ["https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85"],
    ratingsAverage: 4.6,
    ratingsQuantity: 67,
    style: "Casual",
    category: "Unisex",
    subcategory: "Jacket",
  },
  {
    title: "Minimal Leather Sneakers",
    description: "Clean-lined leather sneakers with a cushioned footbed and grippy rubber outsole for everyday movement.",
    quantity: 36,
    price: 135,
    discount: 12,
    colors: ["White", "Black"],
    sizes: ["39", "40", "41", "42", "43", "44"],
    imageCover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    images: ["https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85"],
    ratingsAverage: 4.8,
    ratingsQuantity: 178,
    style: "Casual",
    category: "Unisex",
    subcategory: "Shoes",
  },
  {
    title: "Ribbed Lounge Set",
    description: "A coordinated ribbed knit set with a soft hand feel, relaxed proportions, and mix-and-match versatility.",
    quantity: 29,
    price: 88,
    discount: 18,
    colors: ["Mocha", "Cream", "Sage"],
    sizes: ["XS", "S", "M", "L"],
    imageCover: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
    images: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85"],
    ratingsAverage: 4.3,
    ratingsQuantity: 61,
    style: "Casual",
    category: "Women",
    subcategory: "Loungewear",
  },
];

async function run() {
  const mode = process.argv[2] || "import";
  await connectDB();
  if (mode === "destroy") {
    await Product.deleteMany({});
    console.log("Product data removed.");
  } else if (mode === "import") {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`${products.length} products seeded.`);
  } else {
    throw new Error(`Unknown seed mode: ${mode}. Use import or destroy.`);
  }
  await mongoose.connection.close();
}

run().catch(async (error) => {
  console.error("Seed failed:", error.message);
  await mongoose.connection.close();
  process.exit(1);
});
