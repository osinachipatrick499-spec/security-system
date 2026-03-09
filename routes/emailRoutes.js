const express = require("express")
const router = express.Router()

const emailController = require("../controllers/emailController")

// MIDDLEWARE TO BLOCK FAKE REQUESTS
function verifyAdmin(req,res,next){

if(!req.cookies.adminSession){
return res.status(403).json({success:false,message:"Unauthorized"})
}

next()

}

router.post("/send-login-email",verifyAdmin,emailController.sendLoginEmail)

module.exports = router