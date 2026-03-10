require("dotenv").config()

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

host: "in-v3.mailjet.com",
port: 587,
secure: false,

auth:{
user: process.env.MJ_APIKEY_PUBLIC,
pass: process.env.MJ_APIKEY_PRIVATE
}

})

async function sendEmail(to,subject,html){

try{

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