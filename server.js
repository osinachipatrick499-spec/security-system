require('dotenv').config();

console.log(process.env.GMAIL_USER);

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// ✅ SERVE FRONTEND FILES (VERY IMPORTANT)
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://security-system-production.up.railway.app",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("trust proxy", 1);

// ADMIN DASHBOARD PROTECTION
app.get("/admin-dashboard.html", (req, res) => {
  const adminSession = req.cookies.adminSession;

  if (adminSession === "active") {
    return res.sendFile(path.join(__dirname, "public", "admin-dashboard.html"));
  }

  return res.redirect("/admin-login.html");
});

// ✅ SAFE STATIC ROUTES (NO CRASH)
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/send-code.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "send-code.html"));
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 3000;

app.get("/test", (req, res) => {
  res.send("Server is working perfectly");
});
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});