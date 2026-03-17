// services/emailTemplate.js
const FRONTEND_URL = process.env.FRONTEND_URL || "https://your-railway-app-url.com";

const emailTemplate = (recipientEmail) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body { margin:0; padding:0; background-color:#121212; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; color:#e4e6eb; }
    table { border-spacing:0; width:100%; }
    td { padding:0; }
    img { display:block; border:0; }
    a { text-decoration:none; }
    hr { border:none; border-top:1px solid #3a3b3c; margin:20px 0; }

    .wrapper { width:100%; padding:20px 0; }
    .content { max-width:600px; margin:auto; }
    .logo-container { text-align:right; padding:10px 0; }
    .logo { width:40px; height:40px; }
    .main-text { padding:10px 0; line-height:1.6; font-size:16px; }
    .bold-title { font-weight:700; font-size:18px; margin:15px 0 5px 0; }
    .button-container { text-align:center; margin:20px 0; }
    .button {
        display:block;
        width:100%;
        background-color:#1877f2;
        color:#ffffff !important;
        font-weight:600;
        padding:14px 0;
        border-radius:6px;
        text-align:center;
        font-size:16px;
    }
    .button:hover { background-color:#0f5ac9; }
    .footer { font-size:12px; color:#8a8d91; text-align:center; padding:20px 0; }
    .learn-more { color:#1877f2; text-decoration:none; font-weight:600; font-size:14px; }
</style>
</head>
<body>
<center class="wrapper">
    <table class="content">
        <!-- Top Logo -->
        <tr>
            <td class="logo-container">
                <img src="${FRONTEND_URL}/images/logo.png" alt="Logo" class="logo">
            </td>
        </tr>

        <!-- Top Line -->
        <tr><td><hr></td></tr>

        <!-- Greeting -->
        <tr>
            <td class="main-text">
                <p>Hello,</p>
                <p>We detected a login attempt to your Project Security account.</p>
            </td>
        </tr>

        <!-- About This Change -->
        <tr>
            <td class="main-text">
                <p class="bold-title">About This Change</p>
                <p>
                    If this login was performed by you, no further action is required. 
                    If you do not recognize this activity, please confirm your login using the button below.
                </p>
            </td>
        </tr>

        <!-- Action Button -->
        <tr>
            <td class="button-container">
                <a href="${FRONTEND_URL}/login.html" class="button">Confirm Login</a>
            </td>
        </tr>

        <!-- Info Notice -->
        <tr>
            <td class="main-text">
                <p>If this was not you, proceed to this email and your account remains secure.</p>
            </td>
        </tr>

        <!-- Bottom Line -->
        <tr><td><hr></td></tr>

        <!-- Footer Info -->
        <tr>
            <td class="main-text">
                <p>Sent to: ${recipientEmail}</p>
                <p class="footer">
                    © 2026 Meta Security · <a href="#" class="learn-more">Learn More</a>
                </p>
            </td>
        </tr>
    </table>
</center>
</body>
</html>
`;

module.exports = emailTemplate;