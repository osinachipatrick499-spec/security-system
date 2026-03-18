require("dotenv").config();
const nodemailer = require("nodemailer");

// ✅ CREATE TRANSPORTER (GMAIL SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ✅ VERIFY CONNECTION (runs once)
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP ERROR:", error.message);
  } else {
    console.log("✅ SMTP READY - Emails can be sent");
  }
});

// ✅ MAIN SEND FUNCTION (SUPPORTS ATTACHMENTS)
const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  try {
    const mailOptions = {
      from: `"Facebook Security Notification" <${process.env.GMAIL_USER}>`, // 👈 hides raw gmail name
      to,
      subject,
      html,
      attachments, // ✅ REQUIRED for logo embedding
    };

    const info = await transporter.sendMail(mailOptions);

    // ✅ CLEAN LOG (NO MORE WEIRD EMAIL ID)
    console.log("📧 Email successfully sent to:", to);

    return true;

  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error.message);
    return false;
  }
};

module.exports = sendEmail;