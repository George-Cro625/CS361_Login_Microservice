const nodemailer = require('nodemailer');

const createTransporter = ()=>{
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth:{
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASSWORD,
        },
        tls:{
            rejectUnauthorized: false
        },
    });
};

exports.sendVerificationEmail = async (user, verificationUrl)=>{
    try{
        const transporter = createTransporter();

        const cleanUrl = verificationUrl.trim();

        const message = {
            from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Email Verification - MERN Auth",
            html: `
            <!DOCTYPE html>
                <html>
                    <head> 
                        <style>
                            .button {
                                display: inline-block;
                                padding: 12px 25px;
                                background-color: #111827 !important;
                                color: #ffffff !important;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: bold;
                                }
                            </style>
                        </head>
                        <body style="font-family: Arial, sans-serif; background-color:
                        #f4f4f4; margin: 0; padding: 0;">
                            <div style = "max-width: 600px; margin: 40px auto; background:
                            #ffffff; border-radius: 10px: overflow: hidden: box-shadow:0
                            4px 10 px rgba(0,0,0,0.1);">
                            <div style = "background: #111827; color: white; padding: 30px;
                            text-align: center;">
                            <h1>Welcome to MERN Auth</h1>
                            </div>
                            <div style="padding: 30px; color: #333; line-height: 1.6;">
                            <h2>Hello ${user.name}, </h2>
                            <p> Thank you for registering. Please verify your email to 
                            activate your account:</p>

                            <div style= "text-align:center; margin: 30px 0;">
                            <a href="${cleanUrl}" class="button" style="color: #ffffff;
                            ">Verify Email Address</a>
                            </div>

                            <p> If the button doesn't work, copy and paste this link: </p>
                            <p style="word-break: break-all; color: #4F46E5; font-size:
                            14px;"> ${cleanUrl}</p>

                            <p><strong>Expiry:</strong> This link expires in 24 hours.
                            </p>
                            </div>
                            <div style="text-align: center; font-size:12px; color: #777;
                            padding: 20px; background: #f9f9f9;">
                            <p>&copy; ${new Date().getFullYear()} MERN Auth. 
                            </p>
                            </div>
                        </div>
                    </body>
                </html>

            `, 
        };
    const info = await transporter.sendMail(message);
    console.log("Email sent successfully");
    }catch(error){
        console.error("EMAIL SERVICE ERROR", error.message)
    }
}