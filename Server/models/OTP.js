const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verifiedAt: {
        type: Date,
        default: null,
    },
});

//a function -> to send emails

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(
            email,
            "varification eamil ",
            emailTemplate(otp));
        console.log("email send successfully :", mailResponse);

    }catch(error){
        console.log("error occured while sending mails :" ,error);
        throw error;
    }
}
OTPSchema.pre("save", async function () {
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
});

const OTP = mongoose.model("OTP",OTPSchema)

module.exports = OTP;