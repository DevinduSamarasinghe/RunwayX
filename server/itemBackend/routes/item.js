import express from "express";
import {
  getItems,
  getItembyId,
  createItem,
  updateItem,
  deleteItem,
  getItemsbyCategory,
  getRecommendedItems,
  // getItemsbySeller,
  // addReview,
  addReview,
  updateReview,
  deleteReview,
  getRatingSummary,
} from "../controllers/item.js";

const router = express.Router();

//Main routes
router.get("/", getItems);
router.post("/", createItem);
router.get("/:id", getItembyId);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

router.post("/category", getItemsbyCategory);
router.get("/recom/:id", getRecommendedItems);
// router.get("/seller/:sellerId", getItemsbySeller);
// router.post("/review/:id", addReview);

router.post("/:id/reviews", addReview); // Add a review to an item
router.patch("/:itemId/reviews/:reviewId", updateReview); // Update a review for an item
router.delete("/:itemId/reviews/:reviewId", deleteReview); // Delete a review for an item

router.get("/:id/ratingsummary", getRatingSummary);

export default router;
