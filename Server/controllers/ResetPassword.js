const User = require("../models/User");
const mailSender =  require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//reset password token 
exports.resetPasswordToken = async (req , res) =>{
    try{
        //fetch email ffrom request body
        const {email} = req.body;
        //check user for this email , email validation
        const user = await User.findOne({email: email});


        if(!user){
            return res.json({
            success:false,
            message:'Your Email is not registered with us'});
        }

        const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {token :token,
                resetPasswordExpires:Date.now() + 3600000,
            },
            {new:true}
        );

        console.log("detais", updatedDetails);

        const url = `http://localhost:3000/UpdatePassword`;

        await mailSender(
            email,
            "Password reset",
            `your link for email verification is ${url} .please click thhis usrl to reset your password`
        )

        res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })   
    }
}

// exports.resetPassword = async (req,res) => {
//     try{
//     //fetch password comfirm password and token
//     const {password,comfirmPassword,token} = req.body;
//     //validation that password and comfirm password is matching or not
//     if(password !== comfirmPassword){
//         return res.json({
// 				success: false,
// 				message: "Password and Confirm Password Does not Match",
// 		});
//     }
//     //validat token is valid for time and that is existing in db
//     const userDetails = await User.findOne({token:token});

//     if(!userDetails){
//         return res.json({
// 				success: false,
// 				message: "Token is Invalid",
// 		});
//     }

//     if(!(userDetails.resetPasswordExpires > Date.now())){
//         return res.status(403).json({
// 				success: false,
// 				message: `Token is Expired, Please Regenerate Your Token`,
// 		});
//     }
//     //hasshing the password
//     const encryptedPassword = await bcrypt.hash(password,10);

//     //update in user
//     await User.findOneAndUpdate(
//         {token:token},
//         {password:encryptedPassword},
//         {new:true}
//     )
//     //return res 
//     res.json({
//         success: true,
//         message: `Password Reset Successful`
//     });
    
//     }catch(error){
//         return res.json({
// 			error: error.message,
// 			success: false,
// 			message: `Some Error in Updating the Password`,
// 		});
//     }
// }


exports.resetPassword = async (req, res) => {
    try {
        // 1. Get data from request body
        const { password, confirmPassword, token } = req.body;

        // 2. Check required fields
        if (!password || !confirmPassword || !token) {
            return res.status(400).json({
                success: false,
                message: "Password, Confirm Password and Token are required",
            });
        }

        // 3. Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match",
            });
        }

        // 4. Find user with the reset token
        const userDetails = await User.findOne({
            token: token,
        });

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid reset token. Please request a new password reset link.",
            });
        }

        // 5. Check token expiration
        if (
            !userDetails.resetPasswordExpires ||
            new Date(userDetails.resetPasswordExpires).getTime() <= Date.now()
        ) {
            return res.status(403).json({
                success: false,
                message: "Reset token has expired. Please request a new link.",
            });
        }

        // 6. Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 7. Update password and invalidate the reset token
        userDetails.password = hashedPassword;
        userDetails.token = undefined;
        userDetails.resetPasswordExpires = undefined;

        await userDetails.save();

        // 8. Send success response
        return res.status(200).json({
            success: true,
            message: "Password reset successful. Please log in with your new password.",
        });

    } catch (error) {
        console.error("Reset Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error while resetting password",
        });
    }
};

