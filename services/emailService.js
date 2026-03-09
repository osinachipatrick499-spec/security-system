require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

host: "smtp.gmail.com",
port: 465,
secure: true,

auth:{
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
},

family:4

})

async function sendEmail(to,subject,html){

try{

const info = await transporter.sendMail({

from:`"Facebook Security" <${process.env.EMAIL_USER}>`,
to:to,
subject:subject,
html:html

})

console.log("Email sent successfully:",info.response)

return true

}catch(error){

console.error("EMAIL ERROR:",error)

return false

}

}

module.exports = sendEmail