import mongoose,{ Schema } from "mongoose";

const aadharCardSchema = new Schema(
  {
    employeeName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    aadharCardHolderName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    aadharCardNumber: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    aadharCard: {
      type: String,
      required: true,
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  },
  { timestamps: true }
);

export const AadharCard = mongoose.model("AadharCard", aadharCardSchema);
