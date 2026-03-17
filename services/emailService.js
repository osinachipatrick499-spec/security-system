require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    console.log("Sending email to:", to);

    const msg = {
      to: to,
      from: process.env.FROM_EMAIL, // must be verified in SendGrid
      subject: subject,
      html: html,
    };

    const response = await sgMail.send(msg);

    // Check SendGrid response
    if (response && response[0].statusCode >= 200 && response[0].statusCode < 300) {
      console.log("Email sent successfully:", response[0].statusCode);
      return true;
    } else {
      console.error("SendGrid response not successful:", response);
      return false;
    }
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return false;
  }
}

module.exports = sendEmail;