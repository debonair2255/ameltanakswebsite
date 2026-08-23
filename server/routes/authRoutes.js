const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

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
      phone,
      state,
    } = req.body;

    // =========================
    // CHECK REQUIRED FIELDS
    // =========================

    if (
      !name ||
      !email ||
      !password ||
      !mltNumber ||
      !phone ||
      !state
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields.",
      });
    }

    // =========================
    // CLEAN INPUT
    // =========================

    const cleanName = name.trim();

    const cleanEmail = email
      .trim()
      .toLowerCase();

    const cleanMltNumber = mltNumber
      .trim()
      .toUpperCase();

    const cleanPhone = phone.trim();

    const cleanState = state.trim();

    // =========================
    // VALIDATE MLT NUMBER
    // =========================

    if (!/^MLT\d{5}$/.test(cleanMltNumber)) {
      return res.status(400).json({
        success: false,
        message:
          "MLT/MLA number must be in the format MLT12345.",
      });
    }

    // =========================
    // VALIDATE PASSWORD
    // =========================

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long.",
      });
    }

    // =========================
    // CHECK EMAIL
    // =========================

    const existingEmail =
      await User.findOne({
        email: cleanEmail,
      });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    // =========================
    // CHECK MLT NUMBER
    // =========================

    const existingMltNumber =
      await User.findOne({
        mltNumber: cleanMltNumber,
      });

    if (existingMltNumber) {
      return res.status(409).json({
        success: false,
        message:
          "This MLT/MLA number is already registered.",
      });
    }

    // =========================
    // HASH PASSWORD
    // =========================

    const hashedPassword =
      await bcrypt.hash(password, 12);

    // =========================
    // CREATE MEMBER
    // =========================

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: "member",
      mltNumber: cleanMltNumber,
      phone: cleanPhone,
      state: cleanState,
      membershipStatus: "active",
    });

    // =========================
    // SEND SAFE RESPONSE
    // =========================

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mltNumber: user.mltNumber,
        phone: user.phone,
        state: user.state,
        membershipStatus:
          user.membershipStatus,
      },
    });

  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error during registration.",
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

    console.log(
      "LOGIN REQUEST RECEIVED:",
      email
    );

    // =========================
    // CHECK REQUIRED FIELDS
    // =========================

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide your email and password.",
      });
    }

    // =========================
    // CLEAN EMAIL
    // =========================

    const cleanEmail = email
      .trim()
      .toLowerCase();

    // =========================
    // FIND USER
    // =========================

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    // =========================
    // CHECK PASSWORD
    // =========================

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    // =========================
    // CHECK JWT SECRET
    // =========================

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing from environment variables."
      );

      return res.status(500).json({
        success: false,
        message:
          "Server authentication configuration error.",
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
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // =========================
    // LOGIN SUCCESSFUL
    // =========================

    return res.status(200).json({
      success: true,
      message: "Login successful.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mltNumber: user.mltNumber,
        phone: user.phone,
        state: user.state,
        membershipStatus:
          user.membershipStatus,
      },
    });

  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error during login.",
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

router.get(
  "/me",
  protect,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found.",
        });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          mltNumber: user.mltNumber,
          phone: user.phone,
          state: user.state,
          membershipStatus:
            user.membershipStatus,
        },
      });

    } catch (error) {
      console.error(
        "Get current user error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while retrieving user.",
      });
    }
  }
);

/*
=================================
ADMIN TEST ROUTE
GET /api/auth/admin-test
PROTECTED ADMIN ROUTE
=================================
*/

router.get(
  "/admin-test",
  protect,
  adminOnly,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message:
        "Admin authentication successful.",
      admin: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);

module.exports = router;