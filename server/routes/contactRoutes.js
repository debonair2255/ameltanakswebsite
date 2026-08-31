const express = require("express");
const jwt = require("jsonwebtoken");

const ContactMessage = require("../models/ContactMessage");
const User = require("../models/User");

const router = express.Router();

// =====================================================
// OPTIONAL AUTHENTICATION MIDDLEWARE
// =====================================================
//
// Guest:
// - No token required
// - Can submit name, email, phone, subject and message
//
// Member:
// - Token is checked automatically
// - Name, email and phone are taken from the account
//
// =====================================================

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // -------------------------------------------------
    // NO TOKEN
    // Treat request as guest
    // -------------------------------------------------

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      req.user = null;
      return next();
    }

    // -------------------------------------------------
    // CHECK JWT SECRET
    // -------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing from environment variables."
      );

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error.",
      });
    }

    // -------------------------------------------------
    // VERIFY TOKEN
    // -------------------------------------------------

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // -------------------------------------------------
      // FIND USER
      // -------------------------------------------------

      const user = await User.findById(decoded.id).select(
        "-password"
      );

      // Token is valid but user no longer exists
      if (!user) {
        req.user = null;
        return next();
      }

      // Valid authenticated member
      req.user = user;

      return next();
    } catch (tokenError) {
      console.log(
        "Invalid or expired contact form token. Treating request as guest."
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

// =====================================================
// SEND CONTACT MESSAGE
// =====================================================
//
// POST /api/contact
//
// GUEST REQUEST:
//
// {
//   name,
//   email,
//   phone,
//   subject,
//   message
// }
//
// MEMBER REQUEST:
//
// {
//   subject,
//   message
// }
//
// For members, name/email/phone are obtained from
// the authenticated account.
//
// =====================================================

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

      // -------------------------------------------------
      // VALIDATE MEMBER MESSAGE
      // -------------------------------------------------

      if (!subject || !message) {
        return res.status(400).json({
          success: false,
          message:
            "Please select a subject and enter your message.",
        });
      }

      const cleanSubject = String(subject).trim();
      const cleanMessage = String(message).trim();

      if (!cleanSubject || !cleanMessage) {
        return res.status(400).json({
          success: false,
          message:
            "Subject and message cannot be empty.",
        });
      }

      // -------------------------------------------------
      // SAVE MEMBER MESSAGE
      // -------------------------------------------------

      const contactMessage =
        await ContactMessage.create({
          user: req.user._id,
          name: memberName,
          email: memberEmail,
          phone: memberPhone,
          subject: cleanSubject,
          message: cleanMessage,
        });

      console.log(
        `New member contact message from ${memberName}`
      );

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

    // -------------------------------------------------
    // CLEAN GUEST INFORMATION
    // -------------------------------------------------

    const cleanName = String(name).trim();

    const cleanEmail = String(email)
      .trim()
      .toLowerCase();

    const cleanPhone = String(phone).trim();

    const cleanSubject = String(subject).trim();

    const cleanMessage = String(message).trim();

    // -------------------------------------------------
    // CHECK EMPTY VALUES
    // -------------------------------------------------

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

    // -------------------------------------------------
    // BASIC EMAIL VALIDATION
    // -------------------------------------------------

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        cleanEmail
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid email address.",
      });
    }

    // -------------------------------------------------
    // SAVE GUEST MESSAGE
    // -------------------------------------------------

    const contactMessage =
      await ContactMessage.create({
        user: null,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
      });

    console.log(
      `New guest contact message from ${cleanName}`
    );

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

