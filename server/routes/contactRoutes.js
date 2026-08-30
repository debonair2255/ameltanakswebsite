const express = require("express");

const ContactMessage = require("../models/ContactMessage");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// OPTIONAL AUTHENTICATION MIDDLEWARE
// =====================================================
// If a token exists, identify the member.
// If there is no token, continue as a guest.
//
// This allows BOTH:
// Guest → submit contact message
// Member → submit contact message using account details
// =====================================================

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // No token = guest
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      req.user = null;
      return next();
    }

    // JWT secret must exist
    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing from environment variables."
      );

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error.",
      });
    }

    const jwt = require("jsonwebtoken");

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const user = await User.findById(decoded.id).select(
        "-password"
      );

      // Token is valid but user no longer exists
      if (!user) {
        req.user = null;
        return next();
      }

      // Valid member
      req.user = user;

      return next();

    } catch (tokenError) {
      // Expired/invalid token → treat as guest
      console.log(
        "Contact form received invalid/expired token. Continuing as guest."
      );

      req.user = null;

      return next();
    }

  } catch (error) {
    console.error(
      "Optional authentication error:",
      error
    );

    req.user = null;

    return next();
  }
};
/*
=====================================================
SEND CONTACT MESSAGE
POST /api/contact
=====================================================

GUEST:
{
  name,
  email,
  phone,
  subject,
  message
}

MEMBER:
{
  subject,
  message
}

For members, the backend gets:
name
email
phone

directly from the authenticated account.
=====================================================
*/

router.post("/", optionalAuth, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // =================================================
    // MEMBER
    // =================================================

    if (req.user) {
      const memberName = req.user.name;
      const memberEmail = req.user.email;
      const memberPhone = req.user.phone || "";

      // -----------------------------
      // Validate member message
      // -----------------------------

      if (!subject || !message) {
        return res.status(400).json({
          success: false,
          message:
            "Please select a subject and enter your message.",
        });
      }

      const cleanSubject = subject.trim();
      const cleanMessage = message.trim();

      if (!cleanSubject || !cleanMessage) {
        return res.status(400).json({
          success: false,
          message:
            "Subject and message cannot be empty.",
        });
      }

      // -----------------------------
      // Save member message
      // -----------------------------

      const contactMessage =
        await ContactMessage.create({
          user: req.user._id,

          name: memberName,
          email: memberEmail,
          phone: memberPhone,

          subject: cleanSubject,
          message: cleanMessage,
        });

      return res.status(201).json({
        success: true,
        message:
          "Your message has been sent successfully.",
        contact: {
          id: contactMessage._id,
          subject: contactMessage.subject,
          createdAt: contactMessage.createdAt,
        },
      });
    }

    // =================================================
    // GUEST
    // =================================================

    if (
      !name ||
      !email ||
      !phone ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide your name, email, phone, subject, and message.",
      });
    }

    // -----------------------------
    // Clean guest information
    // -----------------------------

    const cleanName = name.trim();

    const cleanEmail = email
      .trim()
      .toLowerCase();

    const cleanPhone = phone.trim();

    const cleanSubject = subject.trim();

    const cleanMessage = message.trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanPhone ||
      !cleanSubject ||
      !cleanMessage
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All contact details and message fields are required.",
      });
    }

    // -----------------------------
    // Basic email validation
    // -----------------------------

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        cleanEmail
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // -----------------------------
    // Save guest message
    // -----------------------------

    const contactMessage =
      await ContactMessage.create({
        user: null,

        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,

        subject: cleanSubject,
        message: cleanMessage,
      });

    return res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully.",
      contact: {
        id: contactMessage._id,
        subject: contactMessage.subject,
        createdAt: contactMessage.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Contact message error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while sending your message.",
    });
  }
});

module.exports = router;