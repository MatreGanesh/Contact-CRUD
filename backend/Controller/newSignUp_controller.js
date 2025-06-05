const UserModel = require('../Model/SignUpModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';

const signUp = async (req, res) => {
    try {
        const { name, email, password, } = req.body;

        const userExist = await UserModel.find({ email });

        if (userExist.length > 0) {
            return res.status(409).json({ message: 'User already exists, You can login !!!', success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const secretPass = await bcrypt.hash(password, salt);

        // Create a new user object with the provided data and hashed passwords
        const newUserLogin = new UserModel({
            name,
            email,
            password: secretPass,
        });

        await newUserLogin.save();

        return res.status(201).json({ message: 'Account Created Successfully!', success: true });

    } catch (error) {
        console.error("Error in creating user:", error);
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}


const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Use findOne instead of find to return a single document
        const user = await UserModel.findOne({ email });

        const errorMsg = "'Email and Password' must be a valid!";

        // Check if user exists
        if (!user) {
            return res.status(409).json({ message: errorMsg, success: false });
        }

        // Compare the hashed password with the provided password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(409).json({ message: errorMsg, success: false });
        }

        // Generate JWT token if login is successful
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            jwtSecret,  // Make sure your environment variable is named correctly
            { expiresIn: '24h' }
        );

        // Send successful response
        return res.status(200).json({
            message: 'Logged In!',
            success: true,
            jwtToken,
            email: user.email,  // Send email and name in the response
            name: user.name
        });

    } catch (error) {
        console.error("Error during sign-in:", error); // Log the error for debugging
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

module.exports = { signUp, signIn };