// services/emailService.js
require("dotenv").config();
const nodemailer = require("nodemailer");

// Detect environment
const isProduction = process.env.NODE_ENV === "production";

// Create transporter ONLY for localhost (not Railway)
let transporter = null;

if (!isProduction) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Verify ONLY locally
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
    // 🚫 STOP Railway completely
    if (isProduction) {
      console.log("⚠️ Email skipped (Railway does not send emails)");
      return true;
    }

    if (!transporter) {
      console.error("❌ Transporter not initialized");
      return false;
    }

    const mailOptions = {
      from: `"Facebook Notification" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,

      // Anti-spam headers
      headers: {
        "X-Mailer": "Facebook Security System",
        "X-Priority": "1",
        "Importance": "High",
      },
    };

    const info = await transporter.sendMail(mailOptions);

    // ✅ CLEAN LOG OUTPUT
    console.log("📧 Email sent to:", to);
    console.log("📨 Message ID:", info.messageId);

    return true;

  } catch (err) {
    console.error("❌ EMAIL ERROR:", err.message);
    return false;
  }
}

module.exports = sendEmail;