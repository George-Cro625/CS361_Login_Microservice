const userSchema = require('../models/userSchema');
exports.register = async(req, res, next) => {
    try{

        const{name, email, password} = req.body;

        const userExists = await userSchema.findOne({email});
        if(userExists) return res.status(400).json({success: false, message: 
            "User already exists"})

            const user = await userSchema.create({name, email, password});
            res.status(201).json({
                success: true,
                data: user,
            });
    }catch(error){
        console.error("Something went wrong");
    }
};