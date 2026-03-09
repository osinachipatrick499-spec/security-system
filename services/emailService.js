require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

host: "smtp.gmail.com",
port: 587,
secure: false,
requireTLS: true,

auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
},

connectionTimeout: 10000,
greetingTimeout: 10000,
socketTimeout: 10000,

tls: {
family: 4,
rejectUnauthorized: false
}

})

async function sendEmail(to, subject, html){

try{

const info = await transporter.sendMail({
from: `"Facebook Security" <${process.env.EMAIL_USER}>`,
to,
subject,
html
})

console.log("Email sent:", info.response)

}catch(err){

console.error("EMAIL ERROR:", err)

}

}

module.exports = sendEmail