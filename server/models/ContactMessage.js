const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    // =========================
    // MEMBER INFORMATION
    // =========================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // =========================
    // SENDER DETAILS
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================
    // MESSAGE
    // =========================

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // STATUS
    // =========================

    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ContactMessage",
  contactMessageSchema
);