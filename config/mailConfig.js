const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

service:"gmail",

auth:{
user:"securitysystemf@gmail.com",
pass:"mgyeqaaiicccihwp"
}

});

module.exports = transporter;