import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"

export const signup = async (req, res) => {
    try {
        const { name, email, password, role, specialization, workingHours } = req.body
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const userData = role === "doctor" ? {
            name,
            email,
            password: hashedPassword,
            role,
            specialization,
            workingHours
        }
            :
            {
                name,
                email,
                password: hashedPassword,
                role,
            }

        const user = new User(userData)
        await user.save()

        const token = generateTokenAndSetCookie(res, user._id)

        return res.status(201).json({
            message: "User Created Successfully",
            token,
            user: {
                ...user._doc,
                password: undefined
            }
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Please Register First" })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const token = generateTokenAndSetCookie(res, user._id)
        return res.status(200).json({
            message: "User Logged In Successfully",
            token,
            user: {
                ...user._doc,
                password: undefined
            }
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            path: "/"
        })
        return res.status(200).json({ message: "User Logged Out Successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        return res.status(200).json({
            message: "User is authenticated",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}



