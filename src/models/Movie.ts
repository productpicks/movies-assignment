// models/Movie.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  year: {
    type: Number,
    required: [true, "Publishing year is required"],
    min: [1888, "Year must be greater than or equal to 1888"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  poster: {
    type: String,
    required: [false, "Poster image URL is required"],
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
