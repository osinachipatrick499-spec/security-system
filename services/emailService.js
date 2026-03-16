require("dotenv").config()
const { Resend } = require("resend")

// Use the API KEY here
const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmail(to, subject, html) {
  try {

    console.log("Sending email to:", to)

    const response = await resend.emails.send({
      from: `Security Notification <${process.env.FROM_EMAIL}>`,
      to: [to],
      subject: subject,
      html: html
    })

    console.log("Resend response:", response)

    return true

  } catch (err) {

    console.error("EMAIL ERROR:", err)

    return false
  }
}

module.exports = sendEmail