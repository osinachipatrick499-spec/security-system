const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

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

// STATIC FILES
app.use(express.static("public"));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});