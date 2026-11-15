const userSchema = require('../models/userSchema');
const {validationResult} = require('express-validator');
const {sendVerificationEmail} = require('../utils/emailService');
const crypto = require('crypto');


exports.register = async(req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) 
        return res.status(400).json({succes: false, errors: errors.array()});

    try{

        const{name, email, password} = req.body;

        const userExists = await userSchema.findOne({email});
        if(userExists) return res.status(400).json({success: false, message: 
            "User already exists"})

            const user = await userSchema.create({name, email, password});
            const verificationToken = user.getEmailVerificationToken();

            user.save();

            const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
            
            try{
                await sendVerificationEmail(user, verificationUrl);
                res.status(201).json({success: true, message: "Check your email"})
            }catch(error){
                user.verificationToken=undefined;
                user.emailVerificationExpire=undefined;
                await user.save({validateBeforeSave: false})
                return res.status(500).json({success: false, message: "email could not be sent" });
            }  
    } catch(error) {
        console.error("Something went wrong");
        next(error)
    }
};

// Verify email 
exports.verifyEmail = async (req, res, next)=>{
   try{
     const {token} = req.params;

    //hash the token from the url
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");;
    
    console.log("Token from URL:", token);
    console.log("Generated Hash", hashedToken);

    // search using hashed version of token
    const user = await userSchema.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpire: { $gt: Date.now() },
    });

    if(!user) return res.status(400).json({
        success: false,
        message: "invalid Link: Token expired or already used",
    })

    // clear token and verify user
    user.isEmailVerified= true;
    user.emailVerificationToken=undefined;
    user.emailVerificationExpire=undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Email verified successfully"
    });
   }catch(error){
        next(next);
   }
};