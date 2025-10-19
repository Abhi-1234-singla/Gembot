// 3 controllers we have to made - 
// 1.for login || 2.for OTP || 3.to fetch id

import jwtPkg from 'jsonwebtoken';
import { User } from "../models/User.js"
import sendMail from "../middlewares/sendMail.js";


export const loginUser = async(req, res) => {
    try{
        const {email} = req.body

        let user = await User.findOne({email})

        if(!user){
            user = await User.create({
                email,
            });
        }

        const otp = Math.floor(Math.random() * 1000000);

        const verifyToken = JsonWebTokenError.sign({user, otp}, process.env.Activation_sec,
            {
                exporesIn: "5m",
            });

            await sendMail(email, "GemBot", otp);

            req.json({
                message: "otp send to your mail",
                verifyToken,
            })
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}