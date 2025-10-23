// 3 controllers we have to made - 
// 1.for login || 2.for OTP || 3.to fetch id

import jwt from 'jsonwebtoken';
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

        const verifyToken = jwt.sign({user, otp}, process.env.Activation_sec,
            {
                expiresIn: "5m",
            });

            await sendMail(email, "GemBot", otp);

            res.json({
                message: "otp send to your mail",
                verifyToken,
            })
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }  
}

export const verifyUser = async(req, res) => {
  try {
    const { otp, verifyToken } = req.body;

    // Verify token
    const verify = jwt.verify(verifyToken, process.env.Activation_sec);

    if (!verify) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // Compare OTP properly
    if (verify.otp.toString() !== otp.toString()) {
      return res.status(400).json({
        message: "Wrong OTP",
      });
    }

    // If OTP matches, generate login token
    const token = jwt.sign(
      { _id: verify.user._id },
      process.env.Jwt_sec,
      { expiresIn: "5d" }
    );

    return res.json({
      message: "Logged in successfully ✅",
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const myProfile = async(req, res) => {
    try{
        const user = await User.findById(req.user._id)

        res.json(user);
    } catch(error){
        return res.status(500).json({
      message: error.message,
    });
    }
}