//controller me four fuction banege pahla otpsend karne ka dusra signup ka tisra login ka aur  chutha changepassword ka ]\
const bcrypt = require("bcrypt");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const { passwordUpdated } = require("../mail/templates/passwordUpdate") 
const Profile = require("../models/Profile");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
require("dotenv").config();


//sendotp
exports.sendOTP = async (req, res) => {
    try {
        // fetch email from request body
        const { email } = req.body;

        // email validation
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            });
        }

        // OTP generate
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("OTP generated:", otp);

        // check unique OTP
        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({ otp: otp });
        }

        // create entry in DB
        const otpPayload = {
             email: email.trim().toLowerCase(),
            otp
        };

        const otpBody = await OTP.create(otpPayload);

        console.log(otpBody);

        // response
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        });

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }
        
        const normalizedEmail = email.trim().toLowerCase();

        const otpRecord = await OTP.findOne({ email:normalizedEmail })
            .sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired",
            });
        }

        // //OTP exprires after 5 minuter
        const age = Date.now() - new Date(otpRecord.createdAt).getTime();

        if(age > 5*60*1000){
            await  OTP.deleteMany({email:normalizedEmail});

            return res.status(400).json({
                success:false,
                message: "OTP expired. Plese request a new OTP.",
            })
        }
        // if (String(otp).trim() !== String(otpRecord.otp).trim()) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid OTP",
        //     });
        // }

        // //save verified status in database
        // otpRecord.verified = true;
        // otpRecord.verifiedAt = new Date();

         await otpRecord.save();


        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            email: normalizedEmail,
        });

    } catch (error) {
        console.error("Verify OTP error:", error);

        return res.status(500).json({
            success: false,
            message: "OTP verification failed",
        });
    }
};

exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			
		} = req.body;

        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail) {
        return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!password ||
			!confirmPassword
            
			
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

      		
        // Find the most recent OTP for the email
		//const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		//if (response.length === 0) {
			// // OTP not found for the email
			// return res.status(400).json({
			// 	success: false,
			// 	message: "The OTP is not valid",
			// });
		// } else if (otp !== response[0].otp) {
		// 	// Invalid OTP
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The OTP is not valid",
		// 	});
		// }

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const user = await User.create({
			firstName,
			lastName,
			email:normalizedEmail,
			contactNumber:contactNumber ||null,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,     
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};



//login
exports.login = async (req,res) => {
    try{
        //fetch email and password
        const {email , password} = req.body;
        //validation data 
        if(!email || !password){
            return res.status(402).json({
                success:false,
                message:"alll fileda are required , try again"
            })
        }
        //check user are alredy register or not 
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registrered, please signup first",
            });
        }

        //generate jwt , after passeord matching
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

            //create cookie and send message
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token ,options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully',
            })
        } else{
                return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });

        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        });
    }

};



// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validate input
//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email and password are required",
//             });
//         }

//         // Normalize email
//         const normalizedEmail = email.trim().toLowerCase();

//         // Find user
//         const user = await User.findOne({
//             email: normalizedEmail,
//         }).populate("additionalDetails");

//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User is not registered. Please sign up first.",
//             });
//         }

//         // Compare password
//         const isPasswordValid = await bcrypt.compare(
//             password,
//             user.password
//         );

//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Password is incorrect",
//             });
//         }

//         // Generate JWT
//         const payload = {
//             email: user.email,
//             id: user._id,
//             accountType: user.accountType,
//         };

//         const token = jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: "2h" }
//         );

//         // Cookie expires in 2 hours
//         const options = {
//             expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "lax",
//         };

//         // Prepare response without password
//         const userResponse = user.toObject();
//         delete userResponse.password;
//         userResponse.token = token;

//         return res
//             .status(200)
//             .cookie("token", token, options)
//             .json({
//                 success: true,
//                 token,
//                 user: userResponse,
//                 message: "Logged in successfully",
//             });

//     } catch (error) {
//         console.error("Login error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Login failure. Please try again.",
//         });
//     }
// };

//change password 

exports.changePassword = async (req,res) => {
   try{
     //fetch data from request body
    const {password , newPassword ,comfirmNewPassword} = req.body;
 
    //validation
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(
        password,
        user.password
    )

    if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect",
            });
    }

    if(newPassword !== comfirmNewPassword){
        return res.status(400).json({
            success:false,
            message:"password are not matching , plese try again"
        })
    }
    //update in db
    const hashedPassword = await bcrypt.hash(newPassword,10);

    
    await User.findByIdAndUpdate(
        req.user.id,
        {password:newPassword}
    );

    //sent mail
    await mailSender(
        user.email,
        "Password Changed",
        `<h2>Your password has been updated succesfullly</h2>`
    )

    //return response
    return res.status(200).json({
        success:true,
        message:"your password are updated successfully"
    })
   }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"problem in change password fuction" , error,
        })
   }
};