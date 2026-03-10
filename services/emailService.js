require("dotenv").config()

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

host: "smtp.gmail.com",
port: 587,
secure: false,

auth:{
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
},

tls:{
rejectUnauthorized:false
}

})

async function sendEmail(to,subject,html){

try{

// Verify SMTP connection
await transporter.verify()
console.log("SMTP server ready")

await transporter.sendMail({

from:{
name:"Facebook Security",
address:process.env.EMAIL_USER
},

to:to,

subject:subject,

html:html

})

console.log("Email sent successfully")

return true

}catch(err){

console.error("EMAIL ERROR:",err)

return false

}

}

module.exports = sendEmail