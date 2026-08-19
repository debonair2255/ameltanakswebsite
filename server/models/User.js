const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },

    mltNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: /^MLT\d{5}$/,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);