const mongoose = require(`mongoose`);
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, "Please add a name"],
            trim: true,
            maxlength: [50, "Name cannot be more than 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true, // Prevent duplicate registrations
            lowercase: true,
            trim: true, 
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },
        password: {
            type: String, 
            required: [true, "Please add a passwrod"],
            minlength: [6, "Password must be a t least 6 characters"],
            select: false, // password should not be returned in querries
        },
        role: {
            type: String, 
            enum: ["user", "admin"],
            default: "user",
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: String,
        emailVerificationExpire: Date,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        refreshToken: String,
    },
    {
        timestamps: true, // documents creation date and update dates
    },
);

userSchema.pre("save", async function(){
    if(!this.isModified("password")) {
        return
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch(error) {
        throw error;
    }
});

// generate email verification token
userSchema.methods.getEmailVerificationToken = function(){
    const verificationToken = crypto.randomBytes(20).toString("hex");
    this.emailVerificationToken = crypto.createHash("sha256").update
    (verificationToken).digest('hex')

    // set expiration 24 horus
    this.emailVerificationExpire = Date.now() +24 * 60 * 60 * 1000
    return verificationToken;
};

module.exports = mongoose.model("User", userSchema);