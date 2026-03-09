require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

host: "smtp.gmail.com",
port: 587,
secure: false,

auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
},

tls: {
family: 4
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

console.error("Email error:", err)

}

}

module.exports = sendEmail