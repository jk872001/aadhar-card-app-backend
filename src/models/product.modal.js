import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    testName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    subCategory: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    testHeading: {
      type: String,
      required: true,
      trim: true,
    },
    testInfo: {
      type: String,
      trim: true,
    },
    keyPoints: {
      type: [String],
      required: true,
    },
    testImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
