const express = require("express");

const ContactMessage = require("../models/ContactMessage");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// ADMIN AUTHORIZATION
// =====================================================
//
// User must:
// 1. Be logged in
// 2. Have role = admin
//
// =====================================================

const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }

  next();
};

// =====================================================
// GET ALL CONTACT MESSAGES
// =====================================================
//
// GET /api/admin/contact
//
// =====================================================

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .populate("user", "name email phone mltNumber")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error(
      "Get contact messages error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while fetching messages.",
    });
  }
});

// =====================================================
// GET SINGLE CONTACT MESSAGE
// =====================================================
//
// GET /api/admin/contact/:id
//
// =====================================================

router.get(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const contactMessage =
        await ContactMessage.findById(req.params.id)
          .populate(
            "user",
            "name email phone mltNumber state"
          );

      if (!contactMessage) {
        return res.status(404).json({
          success: false,
          message: "Contact message not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: contactMessage,
      });
    } catch (error) {
      console.error(
        "Get single contact message error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while fetching the message.",
      });
    }
  }
);

// =====================================================
// UPDATE MESSAGE STATUS
// 
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "unread",
        "read",
        "replied",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status. Use unread, read, or replied.",
        });
      }

      const contactMessage =
        await ContactMessage.findByIdAndUpdate(
          req.params.id,
          {
            status,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!contactMessage) {
        return res.status(404).json({
          success: false,
          message: "Contact message not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Message status updated successfully.",
        contact: contactMessage,
      });
    } catch (error) {
      console.error(
        "Update contact message status error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while updating message status.",
      });
    }
  }
);

// =====================================================
// DELETE CONTACT MESSAGE
// =====================================================
//
// DELETE /api/admin/contact/:id
//
// =====================================================

router.delete(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const contactMessage =
        await ContactMessage.findByIdAndDelete(
          req.params.id
        );

      if (!contactMessage) {
        return res.status(404).json({
          success: false,
          message: "Contact message not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Contact message deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete contact message error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while deleting message.",
      });
    }
  }
);

module.exports = router;