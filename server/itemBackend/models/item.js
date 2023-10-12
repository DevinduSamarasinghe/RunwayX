import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  clientId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
  timestamp: Date,
});

const itemSchema = new mongoose.Schema({
  article_id: Number,
  product_code: Number,
  name: String,
  product_type_no: Number,
  product_type_name: String,
  category: String,
  graphical_appearance_no: Number,
  graphical_appearance_name: String,
  colour_group_code: Number,
  colour_group_name: String,
  perceived_colour_value_id: Number,
  perceived_colour_value_name: String,
  perceived_colour_master_id: Number,
  perceived_colour_master_name: String,
  department_no: Number,
  department_name: String,
  index_code: String,
  index_name: String,
  index_group_no: Number,
  index_group_name: String,
  section_no: Number,
  section_name: String,
  garment_group_no: Number,
  garment_group_name: String,
  description: String,
  image: Array,
  price: Number,
  ratings: {
    averageRating: Number,
    totalRatings: Number,
  },
  reviews: [reviewSchema],
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
