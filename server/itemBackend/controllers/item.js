import Item from "../models/item.js";
import json2csv from "json2csv";
import fs from "fs";
import { PythonShell } from "python-shell";

//get all items
export const getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page); // Default to page 1 if not specified
    const limit = parseInt(req.query.limit); // Default to a limit of 10 items per page

    const skip = (page - 1) * limit;

    // Fetch items with pagination
    const items = await Item.find().skip(skip).limit(limit);

    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get item by id
export const getItembyId = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create item
export const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//update item
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body; // Fields to be updated

  try {
    // Use the $set operator to update specific fields
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete item
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndRemove(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get items by category
export const getItemsbyCategory = async (req, res) => {
  const category = req.body.category;
  try {
    const items = await Item.find({ category: category }).limit(10);
    res.status(200).json(items);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

//get items by seller
// export const getItemsbySeller = async (req, res) => {
//   const { sellerId } = req.params;
//   try {
//     const items = await Item.find({ sellerId: sellerId });
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

//get items by name
// export const addReview = async (req, res) => {
//   const review = req.body;
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) {
//       return res.status(404).json({ error: "Item not found" });
//     }
//     item.star.reviewers.push(review);
//     item.star.total += review.rate;
//     await item.save();
//     res.status(201).json(item);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

//get recommended items
export const getRecommendedItems = async (req, res) => {
  const { id } = req.params;

  try {
    const articles = await Item.find({}, "-_id -__v");

    if (!articles || articles.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Transform documents into the desired format
    const transformedData = articles.map((article) => ({
      article_id: article.article_id,
      product_code: article.product_code,
      name: article.name,
      product_type_no: article.product_type_no,
      product_type_name: article.product_type_name,
      category: article.category,
      graphical_appearance_no: article.graphical_appearance_no,
      graphical_appearance_name: article.graphical_appearance_name,
      colour_group_code: article.colour_group_code,
      colour_group_name: article.colour_group_name,
      perceived_colour_value_id: article.perceived_colour_value_id,
      perceived_colour_value_name: article.perceived_colour_value_name,
      perceived_colour_master_id: article.perceived_colour_master_id,
      perceived_colour_master_name: article.perceived_colour_master_name,
      department_no: article.department_no,
      department_name: article.department_name,
      index_code: article.index_code,
      index_name: article.index_name,
      index_group_no: article.index_group_no,
      index_group_name: article.index_group_name,
      section_no: article.section_no,
      section_name: article.section_name,
      garment_group_no: article.garment_group_no,
      garment_group_name: article.garment_group_name,
      description: article.description,
      price: article.price,
    }));

    const csv = json2csv.parse(transformedData);
    const tempCsvFilePath = "ML/temp.csv";

    fs.writeFileSync(tempCsvFilePath, csv);

    let options = {
      scriptPath: "ML",
      args: [tempCsvFilePath, id],
    };

    PythonShell.run("modal.py", options).then((messages) => {
      const dataString = messages[0];
      const parsedData = JSON.parse(dataString.replace(/'/g, '"'));

      async function findItems() {
        const promises = [];
        for (let i = 0; i < parsedData.length; i++) {
          promises.push(Item.find({ article_id: parsedData[i] }));
        }

        const results = await Promise.all(promises);
        const flattenedResults = [].concat(...results);
        res.status(200).json(flattenedResults);
      }

      findItems();
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  const { id } = req.params;
  const review = req.body;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Add the review to the item's reviews array
    item.reviews.push(review);

    // Update totalRatings and calculate the new averageRating
    const totalRating = item.reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / item.reviews.length;

    // Update the ratings field in the item document
    item.ratings.totalRatings = item.reviews.length;
    item.ratings.averageRating = averageRating;

    // Save the updated item
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  const { itemId, reviewId } = req.params;
  const updatedReview = req.body;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const reviewIndex = item.reviews.findIndex((r) => r._id == reviewId);

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review
    item.reviews[reviewIndex] = {
      ...item.reviews[reviewIndex],
      ...updatedReview,
    };

    // Recalculate the average rating for the item
    const totalRating = item.reviews.reduce((sum, r) => sum + r.rating, 0);
    item.averageRating = totalRating / item.reviews.length;

    // Save the updated item
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const { itemId, reviewId } = req.params;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const reviewIndex = item.reviews.findIndex((r) => r._id == reviewId);

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Calculate the rating to be removed and update the total ratings count
    const ratingToRemove = item.reviews[reviewIndex].rating;
    item.ratings.totalRatings--;

    // Remove the review from the reviews array
    item.reviews.splice(reviewIndex, 1);

    // Recalculate the average rating for the item
    if (item.ratings.totalRatings === 0) {
      item.ratings.averageRating = 0;
    } else {
      const totalRating = item.reviews.reduce((sum, r) => sum + r.rating, 0);
      item.ratings.averageRating = totalRating / item.ratings.totalRatings;
    }

    // Save the updated item
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRatingSummary = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);

    if (!item || !item.reviews > 0) {
      return res.status(400).json({ error: "Invalid item data" });
    }

    // Calculate rating summary
    function calculateRatingSummary(reviews) {
      const summary = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      for (const review of reviews) {
        const rating = review.rating;
        summary[rating]++;
      }
      const transformedData = Object.keys(summary).map((rating) => ({
        name: `${rating} Star`,
        count: summary[rating],
      }));

      return transformedData;
    }

    const ratingSummary = calculateRatingSummary(item.reviews);

    res.json(ratingSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to retrieve rating summary" });
  }
};
