require("dotenv").config();
const sgMail = require("@sendgrid/mail");

// Load environment variables
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

// Validate config on startup
if (!SENDGRID_API_KEY) {
  console.error("❌ SENDGRID_API_KEY is missing in .env");
}

if (!FROM_EMAIL) {
  console.error("❌ FROM_EMAIL is missing in .env");
}

// Set API key
sgMail.setApiKey(SENDGRID_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    if (!to) {
      throw new Error("Recipient email is missing");
    }

    console.log("📨 Sending email...");
    console.log("➡️ To:", to);
    console.log("➡️ From:", FROM_EMAIL);

    const msg = {
      to: to,
      from: FROM_EMAIL, // MUST match verified domain
      subject: subject,
      html: html,
    };

    const response = await sgMail.send(msg);

    console.log("✅ SendGrid Status Code:", response[0].statusCode);

    if (response[0].statusCode !== 202) {
      throw new Error("Email not accepted by SendGrid");
    }

    return true;

  } catch (error) {

    // Detailed error logging
    console.error("❌ SENDGRID ERROR:");

    if (error.response) {
      console.error("Status:", error.response.statusCode);
      console.error("Body:", error.response.body);
    } else {
      console.error(error.message);
    }

    return false;
  }
}

module.exports = sendEmail;