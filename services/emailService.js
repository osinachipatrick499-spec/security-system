require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendEmail(to, subject, html, text) {
  try {
    const mailOptions = {
      from: `"Facebook Security" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);
    return true;

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error.message);
    return false;
  }
}

module.exports = sendEmail;