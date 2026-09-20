require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const Product = require("../models/product.model");

const products = [
  // ==================== T-SHIRTS ====================

  {
    title: "Classic Cotton T-Shirt",
    slug: "classic-cotton-t-shirt",
    description:
      "A comfortable everyday cotton t-shirt with a clean design and soft breathable fabric.",
    quantity: 120,
    sold: 48,
    price: 25,
    discount: 10,
    colors: ["#000000", "#FFFFFF", "#063AF5"],
    sizes: ["X-Small", "Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 32,
    style: "Casual",
    category: "T-shirts",
  },

  {
    title: "Oversized Graphic T-Shirt",
    slug: "oversized-graphic-t-shirt",
    description:
      "A modern oversized t-shirt featuring a bold graphic print and relaxed comfortable fit.",
    quantity: 90,
    sold: 35,
    price: 32,
    discount: 15,
    colors: ["#000000", "#FFFFFF", "#F50606"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341338985-4a1b7c1f4c8e?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.3,
    ratingsQuantity: 24,
    style: "Casual",
    category: "T-shirts",
  },

  {
    title: "Premium Polo T-Shirt",
    slug: "premium-polo-t-shirt",
    description:
      "A premium polo shirt made from soft cotton fabric with a timeless collar and refined finish.",
    quantity: 75,
    sold: 41,
    price: 45,
    discount: 20,
    colors: ["#000000", "#FFFFFF", "#00C12B", "#063AF5"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1625910513413-5fc45b5b6e4a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1625910513413-5fc45b5b6e4a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 45,
    style: "Casual",
    category: "T-shirts",
  },

  {
    title: "Performance Gym T-Shirt",
    slug: "performance-gym-t-shirt",
    description:
      "A lightweight performance t-shirt made with breathable fabric for intense workouts and training.",
    quantity: 110,
    sold: 63,
    price: 38,
    discount: 10,
    colors: ["#000000", "#063AF5", "#F50606"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1581651630398-4b6d9e8b3b9c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581651630398-4b6d9e8b3b9c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 55,
    style: "Gym",
    category: "T-shirts",
  },

  {
    title: "Premium Long Sleeve T-Shirt",
    slug: "premium-long-sleeve-t-shirt",
    description:
      "A premium long sleeve t-shirt crafted from soft cotton with a comfortable regular fit.",
    quantity: 75,
    sold: 29,
    price: 42,
    discount: 5,
    colors: ["#000000", "#FFFFFF", "#00C12B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.3,
    ratingsQuantity: 19,
    style: "Casual",
    category: "T-shirts",
  },

  // ==================== SHIRTS ====================

  {
    title: "Slim Fit Oxford Shirt",
    slug: "slim-fit-oxford-shirt",
    description:
      "A versatile Oxford shirt with a slim fit, button-down collar, and polished everyday appearance.",
    quantity: 65,
    sold: 28,
    price: 55,
    discount: 10,
    colors: ["#FFFFFF", "#063AF5", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 29,
    style: "Formal",
    category: "Shirts",
  },

  {
    title: "Linen Button-Up Shirt",
    slug: "linen-button-up-shirt",
    description:
      "A lightweight linen button-up shirt designed to keep you cool and comfortable throughout the day.",
    quantity: 80,
    sold: 31,
    price: 48,
    discount: 15,
    colors: ["#FFFFFF", "#F5DD06", "#00C12B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.4,
    ratingsQuantity: 21,
    style: "Casual",
    category: "Shirts",
  },

  {
    title: "Classic Black Dress Shirt",
    slug: "classic-black-dress-shirt",
    description:
      "A sophisticated black dress shirt with a tailored silhouette suitable for formal occasions.",
    quantity: 50,
    sold: 22,
    price: 60,
    discount: 5,
    colors: ["#000000", "#FFFFFF"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.8,
    ratingsQuantity: 38,
    style: "Formal",
    category: "Shirts",
  },

  {
    title: "Textured Formal Shirt",
    slug: "textured-formal-shirt",
    description:
      "A sophisticated textured shirt with a tailored fit designed for business and formal occasions.",
    quantity: 55,
    sold: 23,
    price: 68,
    discount: 10,
    colors: ["#FFFFFF", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 26,
    style: "Formal",
    category: "Shirts",
  },

  {
    title: "Premium Cotton Shirt",
    slug: "premium-cotton-shirt",
    description:
      "A premium cotton shirt with a soft finish, clean silhouette, and versatile design for multiple occasions.",
    quantity: 65,
    sold: 30,
    price: 52,
    discount: 10,
    colors: ["#FFFFFF", "#000000", "#063AF5"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 34,
    style: "Casual",
    category: "Shirts",
  },

  // ==================== JEANS ====================

  {
    title: "Slim Straight Jeans",
    slug: "slim-straight-jeans",
    description:
      "Classic slim straight jeans made from durable stretch denim for comfort and everyday wear.",
    quantity: 100,
    sold: 56,
    price: 65,
    discount: 10,
    colors: ["#063AF5", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 52,
    style: "Casual",
    category: "Jeans",
  },

  {
    title: "Relaxed Fit Blue Jeans",
    slug: "relaxed-fit-blue-jeans",
    description:
      "Relaxed fit denim jeans with a comfortable silhouette designed for casual everyday outfits.",
    quantity: 85,
    sold: 44,
    price: 58,
    discount: 20,
    colors: ["#063AF5"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 36,
    style: "Casual",
    category: "Jeans",
  },

  {
    title: "Black Skinny Jeans",
    slug: "black-skinny-jeans",
    description:
      "Stretch black skinny jeans with a sleek modern fit that pairs easily with casual outfits.",
    quantity: 70,
    sold: 39,
    price: 62,
    discount: 15,
    colors: ["#000000"],
    sizes: ["X-Small", "Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.4,
    ratingsQuantity: 31,
    style: "Casual",
    category: "Jeans",
  },

  {
    title: "Cargo Denim Jeans",
    slug: "cargo-denim-jeans",
    description:
      "Modern cargo jeans combining durable denim with practical pockets and a relaxed contemporary fit.",
    quantity: 70,
    sold: 34,
    price: 72,
    discount: 15,
    colors: ["#000000", "#063AF5", "#00C12B"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.4,
    ratingsQuantity: 30,
    style: "Casual",
    category: "Jeans",
  },

  {
    title: "Tapered Stretch Jeans",
    slug: "tapered-stretch-jeans",
    description:
      "Tapered stretch jeans combining flexible denim with a modern silhouette and comfortable everyday fit.",
    quantity: 80,
    sold: 41,
    price: 68,
    discount: 15,
    colors: ["#063AF5", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 37,
    style: "Casual",
    category: "Jeans",
  },

  // ==================== JACKETS ====================

  {
    title: "Lightweight Bomber Jacket",
    slug: "lightweight-bomber-jacket",
    description:
      "A lightweight bomber jacket featuring a modern silhouette and versatile design for everyday layering.",
    quantity: 45,
    sold: 19,
    price: 95,
    discount: 20,
    colors: ["#000000", "#00C12B"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 27,
    style: "Casual",
    category: "Jackets",
  },

  {
    title: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    description:
      "A timeless denim jacket with durable construction and a classic fit for effortless casual styling.",
    quantity: 60,
    sold: 33,
    price: 85,
    discount: 10,
    colors: ["#063AF5", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1523205565295-f8e91625443b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523205565295-f8e91625443b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 41,
    style: "Casual",
    category: "Jackets",
  },

  {
    title: "Tailored Wool Blazer",
    slug: "tailored-wool-blazer",
    description:
      "A refined wool-blend blazer featuring a tailored cut and elegant details for formal occasions.",
    quantity: 30,
    sold: 14,
    price: 140,
    discount: 15,
    colors: ["#000000", "#FFFFFF"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.9,
    ratingsQuantity: 18,
    style: "Formal",
    category: "Jackets",
  },

  {
    title: "Cropped Denim Jacket",
    slug: "cropped-denim-jacket",
    description:
      "A stylish cropped denim jacket with a contemporary silhouette perfect for casual layered outfits.",
    quantity: 50,
    sold: 21,
    price: 78,
    discount: 10,
    colors: ["#063AF5", "#000000"],
    sizes: ["X-Small", "Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 23,
    style: "Casual",
    category: "Jackets",
  },

  {
    title: "Waterproof Outdoor Jacket",
    slug: "waterproof-outdoor-jacket",
    description:
      "A lightweight waterproof jacket designed to provide reliable protection during outdoor activities.",
    quantity: 40,
    sold: 17,
    price: 125,
    discount: 20,
    colors: ["#000000", "#063AF5", "#F50606"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 20,
    style: "Gym",
    category: "Jackets",
  },

  // ==================== SHOES ====================

  {
    title: "Minimal Leather Sneakers",
    slug: "minimal-leather-sneakers",
    description:
      "Minimal leather sneakers with a clean silhouette, cushioned sole, and versatile everyday styling.",
    quantity: 55,
    sold: 27,
    price: 90,
    discount: 10,
    colors: ["#FFFFFF", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.8,
    ratingsQuantity: 34,
    style: "Casual",
    category: "Shoes",
  },

  {
    title: "Performance Running Shoes",
    slug: "performance-running-shoes",
    description:
      "Lightweight running shoes with responsive cushioning and breathable materials for active training.",
    quantity: 70,
    sold: 42,
    price: 110,
    discount: 15,
    colors: ["#000000", "#063AF5", "#F50606"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 49,
    style: "Gym",
    category: "Shoes",
  },

  {
    title: "Classic Formal Loafers",
    slug: "classic-formal-loafers",
    description:
      "Elegant formal loafers crafted with a polished finish and comfortable construction for special occasions.",
    quantity: 40,
    sold: 18,
    price: 120,
    discount: 10,
    colors: ["#000000"],
    sizes: ["Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616406432452-07bc5938759d?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 22,
    style: "Formal",
    category: "Shoes",
  },

  {
    title: "High Top Canvas Sneakers",
    slug: "high-top-canvas-sneakers",
    description:
      "Classic high top canvas sneakers featuring a durable sole and timeless casual streetwear design.",
    quantity: 80,
    sold: 45,
    price: 65,
    discount: 10,
    colors: ["#000000", "#FFFFFF", "#F50606"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 39,
    style: "Casual",
    category: "Shoes",
  },

  {
    title: "Classic White Trainers",
    slug: "classic-white-trainers",
    description:
      "Clean white trainers with a cushioned sole and minimal design that works with everyday outfits.",
    quantity: 90,
    sold: 62,
    price: 75,
    discount: 15,
    colors: ["#FFFFFF", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.8,
    ratingsQuantity: 68,
    style: "Casual",
    category: "Shoes",
  },

  // ==================== DRESSES ====================

  {
    title: "Elegant Satin Evening Dress",
    slug: "elegant-satin-evening-dress",
    description:
      "An elegant satin evening dress featuring a flattering silhouette and smooth luxurious finish.",
    quantity: 35,
    sold: 16,
    price: 130,
    discount: 20,
    colors: ["#000000", "#F506A4", "#FFFFFF"],
    sizes: ["X-Small", "Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.9,
    ratingsQuantity: 25,
    style: "Party",
    category: "Dresses",
  },

  {
    title: "Floral Summer Dress",
    slug: "floral-summer-dress",
    description:
      "A lightweight floral summer dress with a relaxed silhouette perfect for warm casual days.",
    quantity: 60,
    sold: 31,
    price: 75,
    discount: 15,
    colors: ["#F506A4", "#F5DD06", "#FFFFFF"],
    sizes: ["X-Small", "Small", "Medium", "Large"],
    imageCover:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 33,
    style: "Casual",
    category: "Dresses",
  },

  {
    title: "Classic Black Mini Dress",
    slug: "classic-black-mini-dress",
    description:
      "A versatile black mini dress with a clean silhouette suitable for parties and evening events.",
    quantity: 45,
    sold: 24,
    price: 85,
    discount: 10,
    colors: ["#000000"],
    sizes: ["X-Small", "Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506629905607-d9c297d6c7f1?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 29,
    style: "Party",
    category: "Dresses",
  },

  {
    title: "Elegant Wrap Dress",
    slug: "elegant-wrap-dress",
    description:
      "A flattering wrap dress with a graceful silhouette and comfortable fabric for elegant everyday styling.",
    quantity: 45,
    sold: 20,
    price: 95,
    discount: 10,
    colors: ["#F506A4", "#000000", "#FFFFFF"],
    sizes: ["X-Small", "Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 24,
    style: "Formal",
    category: "Dresses",
  },

  {
    title: "Pleated Midi Dress",
    slug: "pleated-midi-dress",
    description:
      "A sophisticated pleated midi dress with a flowing silhouette suitable for dinners and special events.",
    quantity: 35,
    sold: 13,
    price: 115,
    discount: 15,
    colors: ["#000000", "#F506A4", "#F5DD06"],
    sizes: ["X-Small", "Small", "Medium", "Large"],
    imageCover:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.8,
    ratingsQuantity: 19,
    style: "Party",
    category: "Dresses",
  },

  // ==================== SHORTS ====================

  {
    title: "Relaxed Cotton Shorts",
    slug: "relaxed-cotton-shorts",
    description:
      "Comfortable cotton shorts with a relaxed fit designed for casual weekends and warm weather.",
    quantity: 90,
    sold: 47,
    price: 35,
    discount: 10,
    colors: ["#000000", "#FFFFFF", "#063AF5"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.4,
    ratingsQuantity: 28,
    style: "Casual",
    category: "Shorts",
  },

  {
    title: "Athletic Training Shorts",
    slug: "athletic-training-shorts",
    description:
      "Lightweight athletic shorts designed with breathable fabric for comfortable gym and training sessions.",
    quantity: 100,
    sold: 58,
    price: 30,
    discount: 15,
    colors: ["#000000", "#063AF5", "#F50606"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 43,
    style: "Gym",
    category: "Shorts",
  },

  {
    title: "Denim Bermuda Shorts",
    slug: "denim-bermuda-shorts",
    description:
      "Relaxed denim Bermuda shorts featuring a comfortable fit and versatile design for summer outfits.",
    quantity: 75,
    sold: 36,
    price: 45,
    discount: 10,
    colors: ["#063AF5", "#000000"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.4,
    ratingsQuantity: 27,
    style: "Casual",
    category: "Shorts",
  },

  {
    title: "Running Performance Shorts",
    slug: "running-performance-shorts",
    description:
      "Breathable performance shorts designed for running, workouts, and high intensity athletic activities.",
    quantity: 95,
    sold: 52,
    price: 34,
    discount: 20,
    colors: ["#000000", "#063AF5", "#F50606"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 46,
    style: "Gym",
    category: "Shorts",
  },

  // ==================== HOODIES ====================

  {
    title: "Classic Fleece Hoodie",
    slug: "classic-fleece-hoodie",
    description:
      "A soft fleece hoodie with a relaxed fit, adjustable hood, and comfortable everyday construction.",
    quantity: 85,
    sold: 51,
    price: 70,
    discount: 20,
    colors: ["#000000", "#FFFFFF", "#063AF5"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.8,
    ratingsQuantity: 61,
    style: "Casual",
    category: "Hoodie",
  },

  {
    title: "Oversized Streetwear Hoodie",
    slug: "oversized-streetwear-hoodie",
    description:
      "A heavyweight oversized hoodie featuring a contemporary streetwear fit and premium soft fabric.",
    quantity: 65,
    sold: 37,
    price: 80,
    discount: 15,
    colors: ["#000000", "#F50606", "#FFFFFF"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 35,
    style: "Casual",
    category: "Hoodie",
  },

  {
    title: "Zip-Up Fleece Hoodie",
    slug: "zip-up-fleece-hoodie",
    description:
      "A versatile zip-up fleece hoodie with soft fabric and practical pockets for everyday comfort.",
    quantity: 70,
    sold: 38,
    price: 68,
    discount: 10,
    colors: ["#000000", "#FFFFFF", "#00C12B"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614975059251-992f1179251f?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 31,
    style: "Casual",
    category: "Hoodie",
  },

  {
    title: "Heavyweight Essential Hoodie",
    slug: "heavyweight-essential-hoodie",
    description:
      "A heavyweight essential hoodie made from premium fabric with a structured relaxed fit and soft interior.",
    quantity: 55,
    sold: 28,
    price: 95,
    discount: 20,
    colors: ["#000000", "#FFFFFF", "#063AF5"],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large"],
    imageCover:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80",
    ],
    ratingsAverage: 4.9,
    ratingsQuantity: 44,
    style: "Casual",
    category: "Hoodie",
  },
];

async function seedProducts() {
  await Product.deleteMany({});
  const seededProducts = await Product.insertMany(products);
  return {
    count: seededProducts.length,
    products: seededProducts,
  };
}

async function run() {
  const mode = process.argv[2] || "import";
  await connectDB();
  if (mode === "destroy") {
    await Product.deleteMany({});
    console.log("Product data removed.");
  } else if (mode === "import") {
    const result = await seedProducts();
    console.log(`${result.count} products seeded.`);
  } else {
    throw new Error(`Unknown seed mode: ${mode}. Use import or destroy.`);
  }
  await mongoose.connection.close();
}

if (require.main === module) {
  run().catch(async (error) => {
    console.error("Seed failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  });
}

module.exports = { products, seedProducts };
