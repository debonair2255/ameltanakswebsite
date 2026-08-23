const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Resend } = require("resend");

const User = require("../models/User");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// =========================
// RESEND
// =========================

const resend = new Resend(
  process.env.RESEND_API_KEY
);

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
FORGOT PASSWORD
POST /api/auth/forgot-password
=================================
*/

router.post(
  "/forgot-password",
  async (req, res) => {
    try {
      const { email } = req.body;

      // =========================
      // VALIDATE EMAIL
      // =========================

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide your email address.",
        });
      }

      const cleanEmail = email
        .trim()
        .toLowerCase();

      // =========================
      // FIND USER
      // =========================

      const user =
        await User.findOne({
          email: cleanEmail,
        });

      /*
       IMPORTANT SECURITY RULE:

       We return the same message whether
       the email exists or not.

       This prevents people from checking
       whether an email has an AMELTAN account.
      */

      if (!user) {
        return res.status(200).json({
          success: true,
          message:
            "If an account exists with that email, a password reset link has been sent.",
        });
      }

      // =========================
      // GENERATE RESET TOKEN
      // =========================

      const resetToken =
        crypto.randomBytes(32).toString("hex");

      // =========================
      // HASH TOKEN BEFORE STORAGE
      // =========================

      const hashedResetToken =
        crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");

      // =========================
      // TOKEN EXPIRATION
      // 15 MINUTES
      // =========================

      const resetTokenExpiration =
        Date.now() + 15 * 60 * 1000;

      user.resetPasswordToken =
        hashedResetToken;

      user.resetPasswordExpires =
        new Date(resetTokenExpiration);

      await user.save();

      // =========================
      // FRONTEND URL
      // =========================

      const frontendUrl =
        process.env.FRONTEND_URL;

      if (!frontendUrl) {
        console.error(
          "FRONTEND_URL is missing from environment variables."
        );

        // Remove token if email cannot be sent
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(500).json({
          success: false,
          message:
            "Password reset service is not configured correctly.",
        });
      }

      // =========================
      // RESET LINK
      // =========================

      const resetUrl =
        `${frontendUrl.replace(/\/$/, "")}/reset-password/${resetToken}`;

      // =========================
      // SEND EMAIL
      // =========================

      if (!process.env.RESEND_API_KEY) {
        console.error(
          "RESEND_API_KEY is missing from environment variables."
        );

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(500).json({
          success: false,
          message:
            "Email service is not configured correctly.",
        });
      }

      const { data, error } =
        await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "AMELTAN <onboarding@resend.dev>",

          to: [user.email],

          subject:
            "AMELTAN Password Reset",

          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>AMELTAN Password Reset</title>
              </head>

              <body
                style="
                  margin: 0;
                  padding: 0;
                  background: #f5f7f6;
                  font-family: Arial, Helvetica, sans-serif;
                "
              >

                <div
                  style="
                    max-width: 600px;
                    margin: 40px auto;
                    background: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                  "
                >

                  <div
                    style="
                      background: #1f6f54;
                      padding: 30px;
                      text-align: center;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 26px;
                      "
                    >
                      AMELTAN
                    </h1>
                  </div>

                  <div
                    style="
                      padding: 35px 30px;
                      color: #333333;
                    "
                  >

                    <h2>
                      Password Reset Request
                    </h2>

                    <p>
                      Hello ${user.name},
                    </p>

                    <p>
                      We received a request to reset the password
                      for your AMELTAN member account.
                    </p>

                    <p>
                      Click the button below to create a new password.
                    </p>

                    <div
                      style="
                        text-align: center;
                        margin: 30px 0;
                      "
                    >

                      <a
                        href="${resetUrl}"
                        style="
                          display: inline-block;
                          padding: 14px 24px;
                          background: #1f6f54;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          font-weight: bold;
                        "
                      >
                        Reset My Password
                      </a>

                    </div>

                    <p>
                      This password reset link will expire in
                      <strong>15 minutes</strong>.
                    </p>

                    <p>
                      If you did not request a password reset,
                      you can safely ignore this email.
                    </p>

                    <p
                      style="
                        margin-top: 30px;
                        color: #777777;
                        font-size: 13px;
                      "
                    >
                      For your security, do not share this
                      password reset link with anyone.
                    </p>

                  </div>

                  <div
                    style="
                      padding: 20px;
                      background: #f5f7f6;
                      text-align: center;
                      color: #888888;
                      font-size: 12px;
                    "
                  >
                    AMELTAN Member Portal
                  </div>

                </div>

              </body>
            </html>
          `,
        });

      if (error) {
        console.error(
          "Resend email error:",
          error
        );

        // Remove reset token
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(500).json({
          success: false,
          message:
            "Unable to send password reset email.",
        });
      }

      console.log(
        "Password reset email sent:",
        data
      );

      // =========================
      // SUCCESS
      // =========================

      return res.status(200).json({
        success: true,
        message:
          "If an account exists with that email, a password reset link has been sent.",
      });
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while processing password reset.",
      });
    }
  }
);

/*
=================================
RESET PASSWORD
POST /api/auth/reset-password/:token
=================================
*/

router.post(
  "/reset-password/:token",
  async (req, res) => {
    try {
      const { token } = req.params;

      const { password } = req.body;

      // =========================
      // VALIDATE INPUT
      // =========================

      if (!token) {
        return res.status(400).json({
          success: false,
          message:
            "Password reset token is missing.",
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide a new password.",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 6 characters long.",
        });
      }

      // =========================
      // HASH TOKEN
      // =========================

      const hashedToken =
        crypto
          .createHash("sha256")
          .update(token)
          .digest("hex");

      // =========================
      // FIND USER
      // =========================

      const user =
        await User.findOne({
          resetPasswordToken:
            hashedToken,

          resetPasswordExpires: {
            $gt: new Date(),
          },
        });

      if (!user) {
        return res.status(400).json({
          success: false,
          message:
            "This password reset link is invalid or has expired.",
        });
      }

      // =========================
      // HASH NEW PASSWORD
      // =========================

      const hashedPassword =
        await bcrypt.hash(password, 12);

      user.password =
        hashedPassword;

      // =========================
      // CLEAR RESET TOKEN
      // =========================

      user.resetPasswordToken = null;

      user.resetPasswordExpires = null;

      await user.save();

      // =========================
      // SUCCESS
      // =========================

      return res.status(200).json({
        success: true,
        message:
          "Your password has been reset successfully. You can now log in.",
      });
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while resetting password.",
      });
    }
  }
);

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
// =========================
// UPDATE MEMBER PROFILE
// PUT /api/auth/profile
// =========================

router.put("/profile", protect, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      state,
    } = req.body;

    // =========================
    // VALIDATE NAME
    // =========================

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    // =========================
    // VALIDATE EMAIL
    // =========================

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone
      ? phone.trim()
      : "";
    const cleanState = state
      ? state.trim()
      : "";

    // =========================
    // CHECK EMAIL
    // =========================

    const existingUser = await User.findOne({
      email: cleanEmail,
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "Another account is already using this email.",
      });
    }

    // =========================
    // FIND CURRENT USER
    // =========================

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    // =========================
    // UPDATE ALLOWED FIELDS
    // =========================

    user.name = cleanName;
    user.email = cleanEmail;
    user.phone = cleanPhone;
    user.state = cleanState;

    await user.save();

    // =========================
    // SAFE RESPONSE
    // =========================

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mltNumber: user.mltNumber,
        phone: user.phone,
        state: user.state,
        membershipId: user.membershipId,
        membershipType: user.membershipType,
        membershipStatus: user.membershipStatus,
        membershipDate: user.membershipDate,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error(
      "Update profile error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while updating profile.",
    });
  }
});
module.exports = router;