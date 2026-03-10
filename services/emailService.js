const nodemailer = require("nodemailer")
const dns = require("dns")

dns.setDefaultResultOrder("ipv4first")

const transporter = nodemailer.createTransport({

host:"smtp.gmail.com",
port:587,
secure:false,

auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
},

family:4,

pool:true,
maxConnections:1,
maxMessages:5,
connectionTimeout:10000,

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