const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

host: "74.125.140.108",
port: 587,
secure: false,

auth:{
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
},

name: "gmail.com",

connectionTimeout: 15000,
greetingTimeout: 10000,
socketTimeout: 20000,

tls:{
rejectUnauthorized:false
}

})

async function sendEmail(to,subject,html){

try{

await transporter.verify()
console.log("SMTP server ready")

await transporter.sendMail({

from:{
name:"Security Notification",
address:process.env.EMAIL_USER
},

to:to,

subject:subject,

text:"Security login notification. If this was not you, you are secure to comply to this message.",

html:html,

headers:{
"X-Mailer":"Security Notification",
"X-Priority":"1",
"X-MSMail-Priority":"High",
"Importance":"High",
"Precedence":"bulk"
}

})

console.log("Email sent successfully")

return true

}catch(err){

console.error("EMAIL ERROR:",err)

return false

}

}

module.exports = sendEmail