const nodemailer = require("nodemailer");

let transporter = null;

// ✅ ONLY CREATE TRANSPORTER IF SMTP IS ENABLED
if (process.env.DISABLE_SMTP !== "true") {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  // ✅ VERIFY CONNECTION (LOCALHOST ONLY)
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ SMTP CONNECTION ERROR:", error);
    } else {
      console.log("✅ SMTP transporter is ready to send emails");
    }
  });
}

// ✅ MAIN SEND FUNCTION (UNCHANGED LOGIC + SAFE GUARD)
const sendEmail = async ({ to, subject, html }) => {

  // ✅ RAILWAY: SKIP SMTP COMPLETELY
  if (process.env.DISABLE_SMTP === "true") {
    console.log("🚫 SMTP disabled on Railway (skipping email)");
    return true;
  }

  try {

    const mailOptions = {
      from: `"Facebook Security" <${process.env.GMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,

      // ✅ ANTI-SPAM HEADERS (UNCHANGED)
      headers: {
        "X-Mailer": "FacebookSecurity Mailer",
        "X-Priority": "3",
        "X-MSMail-Priority": "Normal",
        "Importance": "Normal"
      }
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`📧 Email sent to: ${to}`);
    console.log(`📨 Message ID: ${info.messageId}`);

    return true;

  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error);
    return false;
  }
};

module.exports = sendEmail;