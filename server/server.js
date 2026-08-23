const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// =========================
// REQUEST LOGGER
// =========================

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.originalUrl}`
  );

  next();
});

// =========================
// ROUTES
// =========================

app.use(
  "/api/auth",
  authRoutes
);

// =========================
// ROOT ROUTE
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "AMELTAN backend server is running",
  });
});

// =========================
// 404 HANDLER
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// =========================
// SERVER
// =========================

const PORT =
  process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(
    `AMELTAN server running on port ${PORT}`
  );
});