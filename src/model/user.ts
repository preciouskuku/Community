import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    supabaseId: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    mobileNumber: String,
    avatar: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
