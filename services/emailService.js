require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// verify once
transporter.verify((err) => {
  if (err) console.error("SMTP ERROR:", err.message);
  else console.log("✅ SMTP READY");
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Facebook Security Notification" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent to:", to);
    return true;
  } catch (err) {
    console.error("❌ EMAIL ERROR:", err.message);
    return false;
  }
};

module.exports = sendEmail;