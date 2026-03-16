require("dotenv").config()
const { Resend } = require("resend")

// Initialize Resend with verified API key
const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmail(to, subject, html) {
  try {
    const response = await resend.emails.send({
      from: "Security Notification <onboarding@loginalert.online>", // verified domain
      to: [to],
      subject,
      html,
    })

    console.log("Email sent successfully:", response)
    return true
  } catch (err) {
    console.error("EMAIL ERROR:", err)
    return false
  }
}

module.exports = sendEmail