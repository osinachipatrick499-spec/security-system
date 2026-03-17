// services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // ✅ IMPORTANT (not 465)
  secure: false, // TLS (STARTTLS)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Verify transporter
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP transporter error:", err);
  } else {
    console.log("SMTP transporter is ready to send emails!");
  }
});

/**
 * Send email function
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - email HTML content
 * @returns {boolean} true if sent, false if failed
 */
async function sendEmail(to, subject, html) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,       // sender Gmail
      to,
      subject,
      html,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        "Importance": "High"
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return true;

  } catch (err) {
    console.error("EMAIL ERROR:", err.message || err);
    return false;
  }
}

module.exports = sendEmail;