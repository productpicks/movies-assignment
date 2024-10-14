import mongoose, { Types } from "mongoose";

export interface Users extends mongoose.Document {
  email: string;
  password: string;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users>(
  {
    email: {
      type: String,
      required: [true, "The email is required."],
      maxlength: [255, "Email cannot be more than 255 characters"],
    },
    password: {
      type: String,
      required: [true, "The email is required."],
      maxlength: [255, "Password cannot be more than 255 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.User as mongoose.Model<Users>) ||
  mongoose.model<Users>("User", UserSchema);
