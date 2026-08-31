const jwt = require("jsonwebtoken");

// =====================================================
// PROTECT ROUTES
// =====================================================

const protect = (req, res, next) => {
  try {
    // =========================
    // GET AUTHORIZATION HEADER
    // =========================

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Expected format:
    // Authorization: Bearer TOKEN

    const parts = authHeader.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication format.",
      });
    }

    const token = parts[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing.",
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
        message: "Server authentication configuration error.",
      });
    }

    // =========================
    // VERIFY TOKEN
    // =========================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // =========================
    // ATTACH USER TO REQUEST
    // =========================

    req.user = decoded;

    next();
  } catch (error) {
    console.error(
      "JWT verification error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

// =====================================================
// ADMIN ONLY
// =====================================================

const adminOnly = (req, res, next) => {
  // protect middleware must run first
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  // Check the role stored inside the JWT
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};