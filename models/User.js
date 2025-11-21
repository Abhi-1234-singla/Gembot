<<<<<<< HEAD
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);
=======
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
>>>>>>> parent of 94afc1c (chnages)
