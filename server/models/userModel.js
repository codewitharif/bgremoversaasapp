import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "", // Optional: or use `required: true` if needed
    },
    lastName: {
      type: String,
      default: "",
    },
    creditBalance: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);
export default User;
