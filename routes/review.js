const express = require("express");
const router = express.Router({ mergeParams: true });
const { listingSchema } = require("../schema");
const Review = require("../models/review");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

const reviewController = require("../controllers/reviews");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../utils/middleware");

//reviews
//post
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

// deleting reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
