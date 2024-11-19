import mongoose, { model } from "mongoose";

const user = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  code: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export const userModel = model("userModel", user);
