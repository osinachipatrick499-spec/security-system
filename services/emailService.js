require("dotenv").config();
const { Resend } = require("resend");

// Use verified domain from .env
const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@loginalert.online";
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * sendEmail
 * Sends an email via Resend API
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML email content
 * @returns {boolean} - true if sent, false if error
 */
async function sendEmail(to, subject, html) {
  try {
    if (!to || !subject || !html) {
      throw new Error("Missing parameters for sendEmail");
    }

    console.log("Sending email to:", to);
    console.log("FROM_EMAIL used:", FROM_EMAIL);

    const response = await resend.emails.send({
      from: `Security Notification <${FROM_EMAIL}>`,
      to: [to],
      subject,
      html,
    });

    console.log("Resend response:", response);

    // Ensure response indicates email queued/sent
    if (!response || !response.id) {
      throw new Error("Resend API did not return valid response");
    }

    return true;
  } catch (err) {
    console.error("EMAIL ERROR:", err.message || err);
    return false;
  }
}

module.exports = sendEmail;