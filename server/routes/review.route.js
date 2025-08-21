const express = require("express");
const router = express.Router();

const { protectRoute } = require("../middlewares/auth.middleware");

const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../validators/review.validator");

const {
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const { getReviewValidator } = require("../validators/review.validator");

router.get("/", getAllReviews);
router.post("/", protectRoute, createReviewValidator, createReview);
router.get("/:id", getReviewValidator, getReview);
router.patch("/:id", protectRoute, updateReviewValidator, updateReview);
router.delete("/:id", protectRoute, deleteReviewValidator, deleteReview);

module.exports = router;
