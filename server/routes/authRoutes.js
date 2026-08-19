const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

/*
=================================
REGISTER MEMBER
POST /api/auth/register
=================================
*/

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mltNumber,
    } = req.body;

    // Check required fields
    if (!name || !email || !password || !mltNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Clean input
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMltNumber = mltNumber.trim().toUpperCase();

    // Validate MLT number
    if (!/^MLT\d{5}$/.test(cleanMltNumber)) {
      return res.status(400).json({
        success: false,
        message:
          "MLT/MLA number must be in the format MLT12345.",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long.",
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({
      email: cleanEmail,
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Check if MLT number already exists
    const existingMltNumber = await User.findOne({
      mltNumber: cleanMltNumber,
    });

    if (existingMltNumber) {
      return res.status(409).json({
        success: false,
        message: "This MLT/MLA number is already registered.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // Create member
    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: "member",
      mltNumber: cleanMltNumber,
    });

    // Send safe response
    res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mltNumber: user.mltNumber,
      },
    });
  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  }
});
/*
=================================
LOGIN MEMBER
POST /api/auth/login
=================================
*/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email and password.",
      });
    }

    // Clean email
    const cleanEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // =========================
    // CREATE JWT
    // =========================

    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // =========================
    // LOGIN SUCCESSFUL
    // =========================

    res.status(200).json({
      success: true,
      message: "Login successful.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mltNumber: user.mltNumber,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
});

/*
=================================
GET CURRENT USER
GET /api/auth/me
PROTECTED ROUTE
=================================
*/

router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mltNumber: user.mltNumber,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while retrieving user.",
    });
  }
});
module.exports = router;