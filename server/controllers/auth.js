import bcrypt from 'bcrypt'
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: 0,
            impressions: 0
        })
        delete newUser.password;

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        res.status(201).json({ token, user: newUser })

    } catch (error) {

    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email }).populate({
            path: 'friends',
            select: '_id firstName lastName picturePath occupation'
        })
        if (!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'password mismatch' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}