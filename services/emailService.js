require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

service:"gmail",

auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
},

tls:{
rejectUnauthorized:false
}

})

async function sendEmail(to,subject,html){

try{

const mailOptions = {

from:`"Facebook Security" <${process.env.EMAIL_USER}>`,
to:to,
subject:subject,
html:html

}

const info = await transporter.sendMail(mailOptions)

console.log("Email sent:",info.response)

return true

}catch(err){

console.error("Email error:",err)

return false

}

}

module.exports = sendEmail