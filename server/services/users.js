import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import User from "../models/users.js"


export const signin = async(req, res) => {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if (!existingUser) 
            return res.status(404).json({messege: "User doesn't exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) 
            return res.status(404).json({messege: "Invalid credentials"})
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn:"1s"})
        return res.status(200).json({cred: existingUser, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({messege: "Something went wrong"})
    }
}


export const signup = async(req, res) => {
    const {email, password, firstName, lastName, confirmPassword} = req.body
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) 
            return res.status(400).json({messege: "User already exist"})

        if (password !== confirmPassword)
            return res.status(400).json({messege: "Password don't match"})

        const hashedPassword = await bcrypt.hash(password, 12)
        const createdUser = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})
        const token = jwt.sign({email: createdUser.email, id: createdUser._id}, 'test', {expiresIn:"1h"})
        return res.status(200).json({cred: createdUser, token})

    } catch (error) {
        console.log(error)
        res.status(500).json({messege: "Something went wrong"})
    }
}


