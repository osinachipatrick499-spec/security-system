// services/emailService.js
require("dotenv").config();
const nodemailer = require("nodemailer");

// ✅ Detect Railway correctly
const isRailway = !!process.env.RAILWAY_STATIC_URL;

// Create transporter ONLY if NOT Railway
let transporter = null;

if (!isRailway) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  transporter.verify((err) => {
    if (err) {
      console.error("❌ SMTP ERROR:", err.message);
    } else {
      console.log("✅ SMTP READY (Localhost)");
    }
  });
}

/**
 * Send Email Function
 */
async function sendEmail(to, subject, html) {
  try {
    // 🚫 Only block Railway (NOT localhost)
    if (isRailway) {
      console.log("⚠️ Railway detected → Email sending disabled");
      return true;
    }

    if (!transporter) {
      console.error("❌ Transporter not initialized");
      return false;
    }

    const info = await transporter.sendMail({
      from: `"Facebook Notification" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      headers: {
        "X-Mailer": "Facebook Security System",
        "X-Priority": "1",
        "Importance": "High",
      },
    });

    // ✅ Correct logging
    console.log("📧 Email sent to:", to);
    console.log("📨 Message ID:", info.messageId);

    return true;

  } catch (err) {
    console.error("❌ EMAIL ERROR:", err.message);
    return false;
  }
}

module.exports = sendEmail;